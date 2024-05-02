import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  TextField,
} from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useInventarie } from "../../hooks/useInventarie";
import { AccordionDay } from "./AccordionDay";
import { AccordionMonth } from "./AccordionMonth";
import { AccordionYear } from "./AccordionYear";
import { Row } from "./InventarioDay";

export default function Inventarios () {
  let totalVentaSelect = 0,
    otrosGastos = 0,
    totalUti = 0,
    totalCaf = 0,
    totalPor = 0,
    ganancia = 0,
    gananciaUti = 0,
    gananciaCaf = 0,
    gananciaPor = 0,
    salarioCaf = 0,
    salarioUti = 0,
    gananciaPorc = 0,
    salarioXMayor = 0;

  dayjs.locale("es");
  const [total, setTotal] = useState(0);
  const [days, setDays] = useState([]);
  const [value, setValue] = useState(dayjs());
  const [day, setDay] = useState(value.date());
  const [month, setMonth] = useState(value.month());
  const [markedDay, setMmarkedDay] = useState([value.date()]);
  const inventarie = useInventarie(value.year(), month, day);
  const [showMonth, setShowMonth] = useState(true);
  const [showYear, setShowYear] = useState(true);
  const [totalMonth, setTotalMonth] = useState(0);
  const [dataByMonth, setDataByMonth] = useState({});

  function comparar(obj1, obj2) {
    // Calcular el valor de la fórmula para cada objeto
    let valor1 = (obj1.precio - obj1.costoProducto) * obj1.cantidad;
    let valor2 = (obj2.precio - obj2.costoProducto) * obj2.cantidad;
    // Comparar los valores
    if (valor1 > valor2) {
      // Si el primer objeto tiene un valor mayor, se sitúa antes que el segundo
      return -1;
    } else if (valor1 < valor2) {
      // Si el segundo objeto tiene un valor mayor, se sitúa antes que el primero
      return 1;
    } else {
      // Si los objetos tienen el mismo valor, se dejan sin cambios entre ellos
      return 0;
    }
  }

  const handleOnChangeMonth = (month) => {
    setShowMonth(true);
    setShowYear(true);
    setValue(month);
    setDays([]);
    setMmarkedDay([]);
  };

  const handleClickMonth = () => {
    setDay();
    setShowMonth(false);
    setDays([]);
    setMmarkedDay([]);
  };

  const handleClickYear = () => {
    setShowMonth(true);
    setShowYear(false);
    setMonth();
    setDay();
    setDays([]);
    setMmarkedDay([]);
  };

  const calcularTotal = (data) => {
    if (!showMonth || !showYear)
      return data.reduce((acum, inv) => {
        const total = inv.products.reduce(
          (acum, item) => acum + item.precio * item.cantidad,
          0
        );
        return acum + total;
      }, 0);
  };

  const handleDataByMonth = () => {
    if (!showYear) {
      const dataByMonth = inventarie.data.reduce((acc, inv) => {
        // Obtener el mes del inventario
        const month = new Date(Date.parse(inv.date)).getUTCMonth();
        // Si el mes no existe en el objeto, crear un arreglo vacío
        if (!acc[month]) {
          acc[month] = [];
        }
        // Agregar el inventario al arreglo correspondiente al mes
        acc[month].push(inv);
        // Devolver el objeto acumulado
        return acc;
      }, {});
      // Actualizar el estado con el nuevo objeto
      setDataByMonth(dataByMonth);
    }
  };

  useEffect(() => {
    setDay(value.date());
    setMonth(value.month());
  }, [value]);

  useEffect(() => {
    if (value) {
      if (markedDay.length > days.length) {
        setDays([
          ...days,
          {
            d: value.date(),
            gastos: inventarie.data?.gastos,
            inventarie: inventarie.data?.products,
            id: inventarie.data?._id,
          },
        ]);
      } else {
        if (markedDay.length === days.length) {
          const d = days;
          if (d[days.length - 1]?.d === value.date()) {
            d[days.length - 1] = {
              d: value.date(),
              gastos: inventarie.data?.gastos,
              inventarie: inventarie.data?.products,
              id: inventarie.data?._id,
            };
            setDays(d);
          }
        } else {
          setDays(days.filter((obj) => markedDay.find((num) => num === obj.d)));
        }
      }
    }

    if (inventarie.isSuccess) {
      setTotalMonth(calcularTotal(inventarie.data));
      handleDataByMonth();
    }
  }, [inventarie.data, markedDay]);

  let dataByMonthArray = Object.entries(dataByMonth);

  /*   useEffect(() => { 
    console.log(days)
    console.log(days.length)
    console.log(days[days.length-1])

    for (const arrInv of days) {
      console.log(arrInv)
      for (const inv of arrInv.inventarie ?arrInv.inventarie :[]) {
        console.log(inv)
        let index = copieInventario.findIndex(
          (objeto) => objeto?.name === inv.name
        );
        index !== -1
          ? (copieInventario[index].cantidad += inv.cantidad)
          : copieInventario = [...copieInventario, inventarie]
      }
    }
    console.log(copieInventario);
    copieInventario = copieInventario.sort(comparar).slice(0, 5);
    console.log(copieInventario); 
  }, [days]);  */

  const handleOnChangeDay = (newValue) => {
    setShowMonth(true);
    setShowYear(true);
    setValue(newValue);
    markedDay.find((d) => d === newValue.date())
      ? setMmarkedDay(markedDay.filter((d) => d !== newValue.date()))
      : setMmarkedDay([...markedDay, newValue.date()]);
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-around",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs} locale="es">
            <DateCalendar
              sx={{ maxHeight: "none", m: 0 }}
              value={value}
              onChange={(newValue) => handleOnChangeDay(newValue)}
              onMonthChange={(month) => handleOnChangeMonth(month)}
              onYearChange={(year) => handleOnChangeMonth(year)}
              slotProps={{
                day: (day) => ({
                  className: markedDay.find((d) => d === day.day.date())
                    ? "selected"
                    : "",
                  sx: {
                    fontSize: "1rem",
                    "&.selected": {
                      backgroundColor: "#2fca3c !important",
                      color: "white !important",
                      fontWeight: "600 !important",
                    },
                    "&.Mui-selected": {
                      backgroundColor: "transparent",
                    },
                    "&.Mui-selected:focus": {
                      backgroundColor: "transparent",
                      fontWeight: 400,
                    },
                  },
                }),
              }}
            />
          </LocalizationProvider>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "row", md: "column" },
            justifyContent: "center",
            my: 2,
          }}
        >
          <Button
            onClick={handleClickYear}
            size="large"
            variant="outlined"
            color="success"
            sx={{ mx: 0.5, my: { md: 5 } }}
          >
            Mostrar Ventas del Año
          </Button>
          <Button
            onClick={handleClickMonth}
            size="large"
            variant="outlined"
            color="success"
            sx={{ mx: 0.5, my: { md: 5 } }}
          >
            Mostrar Ventas del Mes
          </Button>
        </Box>
      </Box>

      <Box display={days.length === 0 && "none"}>
        {days.map((inv, i) => {
          const totalDay = inv.inventarie?.reduce(
            (acum, item) => acum + item.precio * item.cantidad,
            0
          );
          totalVentaSelect += totalDay ? totalDay : 0;

          if (inv.inventarie)
            for (const i of inv.inventarie) {
              i.categoria === "PORMAYOR" &&
              ((totalPor += i.precio * i.cantidad),
              (gananciaPor += (i.precio - i.costoProducto) * i.cantidad));
              i.categoria === "CAFETERIA" &&
                ((totalCaf += i.precio * i.cantidad),
                (gananciaCaf += (i.precio - i.costoProducto) * i.cantidad));
              (i.categoria === "UTILES" || i.categoria === "CALZADO") &&
                ((totalUti += i.precio * i.cantidad),
                (gananciaUti += (i.precio - i.costoProducto) * i.cantidad));
            }

          ganancia = gananciaCaf + gananciaUti + gananciaPor;
          gananciaPorc = ((ganancia * 100) / (totalCaf + totalUti + totalPor)).toFixed(1);

          salarioCaf =
            1000 + (totalCaf > 90000 ? (totalCaf - 90000) * 0.05 : 0);
          salarioUti = 600 + (totalUti > 10000 ? (totalUti - 10000) * 0.05 : 0);
          salarioXMayor = 1000 + totalPor * 0.01;
          otrosGastos += inv.gastos ? inv.gastos : 0;
        })}
        <Box
          pb={2}
          display="flex"
          justifyContent="space-between"
          borderBottom="1px dashed  gainsboro"
        >
          <Typography>
            Total de Venta: <b>{totalCaf + totalUti + totalPor}</b>
          </Typography>
          <Typography>
            Ganancia de Venta: <b>{ganancia}</b>
          </Typography>
          <Typography>
            % : <b>{isNaN(gananciaPorc) ? 0 : gananciaPorc}</b>
          </Typography>
        </Box>
        <Box py={2} borderBottom="1px dashed  gainsboro">
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table" size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Trabajador</TableCell>
                  <TableCell align="center">Básico</TableCell>
                  <TableCell></TableCell>
                  <TableCell align="center">Estímulo</TableCell>
                  <TableCell></TableCell>
                  <TableCell align="center">Salario</TableCell>
                  <TableCell align="center">% Ganancia</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                  <TableCell component="th" scope="row">
                    Cafeteria
                  </TableCell>
                  <TableCell align="center">1000</TableCell>
                  <TableCell align="center">+</TableCell>
                  <TableCell align="center">
                    {totalCaf > 90000 ? (totalCaf - 90000) * 0.05 : 0}
                  </TableCell>
                  <TableCell align="center">=</TableCell>
                  <TableCell align="center">{salarioCaf}</TableCell>
                  <TableCell align="center">
                    {((salarioCaf * 100) / ganancia).toFixed(1)} %
                  </TableCell>
                </TableRow>
                <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                  <TableCell component="th" scope="row">
                    Utileria
                  </TableCell>
                  <TableCell align="center">600</TableCell>
                  <TableCell align="center">+</TableCell>
                  <TableCell align="center">
                    {totalUti > 10000 ? (totalUti - 10000) * 0.05 : 0}
                  </TableCell>
                  <TableCell align="center">=</TableCell>
                  <TableCell align="center">{salarioUti}</TableCell>
                  <TableCell align="center">
                    {((salarioUti * 100) / ganancia).toFixed(1)} %
                  </TableCell>
                </TableRow>
                <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                  <TableCell component="th" scope="row">
                    X Mayor
                  </TableCell>
                  <TableCell align="center">1000</TableCell>
                  <TableCell align="center">+</TableCell>
                  <TableCell align="center">
                    {totalPor > 90000 ? (totalPor - 90000) * 0.05 : 0}
                  </TableCell>
                  <TableCell align="center">=</TableCell>
                  <TableCell align="center">{salarioXMayor}</TableCell>
                  <TableCell align="center">
                    {((salarioXMayor * 100) / ganancia).toFixed(1)} %
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Box mt={1} display="flex" alignItems={"center"}>
            <Typography mr={1}>Otros Gastos:</Typography>
            <Typography>{otrosGastos}</Typography>
            <Typography ml={2}>
              {" "}
              --- {((otrosGastos * 100) / ganancia ? ganancia : 0).toFixed(1)} %
            </Typography>
          </Box>
        </Box>
        <Box py={2} borderBottom="1px dashed  gainsboro">
          <Typography fontSize="1.2rem" color={"red"}>
            Ganancia Real :{" "}
            <b>
              {ganancia -
                salarioCaf -
                salarioUti -
                salarioXMayor -
                otrosGastos >
              0
                ? ganancia -
                  salarioCaf -
                  salarioUti -
                  salarioXMayor -
                  otrosGastos
                : 0}
            </b>{" "}
            ---{" "}
            {(
              ((ganancia -
                salarioCaf -
                salarioUti -
                salarioXMayor -
                otrosGastos) *
                100) /
              ganancia
            ).toFixed(1) > 0
              ? (
                  ((ganancia -
                    salarioCaf -
                    salarioUti -
                    salarioXMayor -
                    otrosGastos) *
                    100) /
                  ganancia
                ).toFixed(1)
              : 0}{" "}
            %
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mt: { md: 2 } }}>
        {days.map((inv, i) => {
          const totalDay = inv.inventarie?.reduce(
            (acum, item) => acum + item.precio * item.cantidad,
            0
          );
          return (
            <AccordionDay
              key={i}
              total={totalDay}
              inv={inv}
              gastos={inv.gastos}
              id={inv.id}
            />
          );
        })}
        <Box display={showMonth && "none"}>
          <Box>
            {!showMonth &&
              inventarie.isSuccess &&
              inventarie?.data?.map((inv, i) => {
                const totalDay = inv.products?.reduce(
                  (acum, item) => acum + item.precio * item.cantidad,
                  0
                );
                totalVentaSelect += totalDay ? totalDay : 0;

                if (inv.products)
                  for (const i of inv.products) {
                    i.categoria === "PORMAYOR" &&
                    ((totalPor += i.precio * i.cantidad),
                    (gananciaPor +=
                      (i.precio - i.costoProducto) * i.cantidad));
                    i.categoria === "CAFETERIA" &&
                      ((totalCaf += i.precio * i.cantidad),
                      (gananciaCaf +=
                        (i.precio - i.costoProducto) * i.cantidad));
                    (i.categoria === "UTILES" || i.categoria === "CALZADO") &&
                      ((totalUti += i.precio * i.cantidad),
                      (gananciaUti +=
                        (i.precio - i.costoProducto) * i.cantidad));
                  }

                ganancia = gananciaCaf + gananciaUti + gananciaPor;
                gananciaPorc = (
                  (ganancia * 100) /
                  (totalCaf + totalUti + gananciaPor)
                ).toFixed(1);

                salarioCaf =
                  1000 + (totalCaf > 90000 ? (totalCaf - 90000) * 0.05 : 0);
                salarioUti =
                  600 + (totalUti > 10000 ? (totalUti - 10000) * 0.05 : 0);
                salarioXMayor = 1000 + totalPor * 0.01;
                otrosGastos += inv.gastos ? inv.gastos : 0;
              })}
            <Box
              pb={2}
              display="flex"
              justifyContent="space-between"
              borderBottom="1px dashed  gainsboro"
            >
              <Typography>
                Total de Venta: <b>{totalCaf + totalUti + totalPor}</b>
              </Typography>
              <Typography>
                Ganancia de Venta: <b>{ganancia}</b>
              </Typography>
              <Typography>
                % : <b>{isNaN(gananciaPorc) ? 0 : gananciaPorc}</b>
              </Typography>
            </Box>
            <Box py={2} borderBottom="1px dashed  gainsboro">
              <TableContainer component={Paper}>
                <Table aria-label="collapsible table" size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Trabajador</TableCell>
                      <TableCell align="center">Básico</TableCell>
                      <TableCell></TableCell>
                      <TableCell align="center">Estímulo</TableCell>
                      <TableCell></TableCell>
                      <TableCell align="center">Salario</TableCell>
                      <TableCell align="center">% Ganancia</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                      <TableCell component="th" scope="row">
                        Cafeteria
                      </TableCell>
                      <TableCell align="center">1000</TableCell>
                      <TableCell align="center">+</TableCell>
                      <TableCell align="center">
                        {totalCaf > 90000 ? (totalCaf - 90000) * 0.05 : 0}
                      </TableCell>
                      <TableCell align="center">=</TableCell>
                      <TableCell align="center">{salarioCaf}</TableCell>
                      <TableCell align="center">
                        {((salarioCaf * 100) / ganancia).toFixed(1)} %
                      </TableCell>
                    </TableRow>
                    <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                      <TableCell component="th" scope="row">
                        Utileria
                      </TableCell>
                      <TableCell align="center">600</TableCell>
                      <TableCell align="center">+</TableCell>
                      <TableCell align="center">
                        {totalUti > 10000 ? (totalUti - 10000) * 0.05 : 0}
                      </TableCell>
                      <TableCell align="center">=</TableCell>
                      <TableCell align="center">{salarioUti}</TableCell>
                      <TableCell align="center">
                        {((salarioUti * 100) / ganancia).toFixed(1)} %
                      </TableCell>
                    </TableRow>
                    <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                      <TableCell component="th" scope="row">
                        X Mayor
                      </TableCell>
                      <TableCell align="center">1000</TableCell>
                      <TableCell align="center">+</TableCell>
                      <TableCell align="center">
                        {totalPor > 90000 ? (totalPor - 90000) * 0.05 : 0}
                      </TableCell>
                      <TableCell align="center">=</TableCell>
                      <TableCell align="center">{salarioXMayor}</TableCell>
                      <TableCell align="center">
                        {((salarioXMayor * 100) / ganancia).toFixed(1)} %
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Box mt={1} display="flex" alignItems={"center"}>
                <Typography mr={1}>Otros Gastos:</Typography>
                <Typography>{otrosGastos}</Typography>
                <Typography ml={2}>
                  {" "}
                  ---{" "}
                  {((otrosGastos * 100) / ganancia ? ganancia : 0).toFixed(1)} %
                </Typography>
              </Box>
            </Box>
            <Box py={2} borderBottom="1px dashed  gainsboro">
              <Typography fontSize="1.2rem" color={"red"}>
                Ganancia Real :{" "}
                <b>
                  {ganancia -
                    salarioCaf -
                    salarioUti -
                    salarioXMayor -
                    otrosGastos >
                  0
                    ? ganancia -
                      salarioCaf -
                      salarioUti -
                      salarioXMayor -
                      otrosGastos
                    : 0}
                </b>{" "}
                ---{" "}
                {(
                  ((ganancia -
                    salarioCaf -
                    salarioUti -
                    salarioXMayor -
                    otrosGastos) *
                    100) /
                  ganancia
                ).toFixed(1) > 0
                  ? (
                      ((ganancia -
                        salarioCaf -
                        salarioUti -
                        salarioXMayor -
                        otrosGastos) *
                        100) /
                      ganancia
                    ).toFixed(1)
                  : 0}{" "}
                %
              </Typography>
            </Box>
          </Box>

          <Typography textAlign="center" fontSize="1.4rem">
            Importe de venta del Mes <b>{totalMonth}</b>
          </Typography>
          {!showMonth &&
            inventarie.isSuccess &&
            inventarie.data.map((inv, i) => {
              const total = inv.products.reduce(
                (acum, item) => acum + item.precio * item.cantidad,
                0
              );
              return (
                <AccordionMonth
                  key={i}
                  total={total}
                  date={inv.date}
                  pro={inv.products}
                />
              );
            })}
        </Box>

        <Box display={showYear && "none"}>
          <Box>
            {!showYear &&
              inventarie.isSuccess &&
              inventarie?.data?.map((inv, i) => {
                const totalDay = inv.products?.reduce(
                  (acum, item) => acum + item.precio * item.cantidad,
                  0
                );
                totalVentaSelect += totalDay ? totalDay : 0;

                if (inv.products)
                  for (const i of inv.products) {
                    i.categoria === "PORMAYOR" &&
                    ((totalPor += i.precio * i.cantidad),
                    (gananciaCaf +=
                      (i.precio - i.costoProducto) * i.cantidad));
                    i.categoria === "CAFETERIA" &&
                      ((totalCaf += i.precio * i.cantidad),
                      (gananciaCaf +=
                        (i.precio - i.costoProducto) * i.cantidad));
                    (i.categoria === "UTILES" || i.categoria === "CALZADO") &&
                      ((totalUti += i.precio * i.cantidad),
                      (gananciaUti +=
                        (i.precio - i.costoProducto) * i.cantidad));
                  }

                ganancia = gananciaCaf + gananciaUti + gananciaPor;
                gananciaPorc = (
                  (ganancia * 100) /
                  (totalCaf + totalUti + totalPor)
                ).toFixed(1);

                salarioCaf =
                  1000 + (totalCaf > 90000 ? (totalCaf - 90000) * 0.05 : 0);
                salarioUti =
                  600 + (totalUti > 10000 ? (totalUti - 10000) * 0.05 : 0);
                salarioXMayor = 1000 + totalPor * 0.01;
                otrosGastos += inv.gastos ? inv.gastos : 0;
              })}
            <Box
              pb={2}
              display="flex"
              justifyContent="space-between"
              borderBottom="1px dashed  gainsboro"
            >
              <Typography>
                Total de Venta: <b>{totalCaf + totalUti + totalPor}</b>
              </Typography>
              <Typography>
                Ganancia de Venta: <b>{ganancia}</b>
              </Typography>
              <Typography>
                % : <b>{isNaN(gananciaPorc) ? 0 : gananciaPorc}</b>
              </Typography>
            </Box>
            <Box py={2} borderBottom="1px dashed  gainsboro">
              <TableContainer component={Paper}>
                <Table aria-label="collapsible table" size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Trabajador</TableCell>
                      <TableCell align="center">Básico</TableCell>
                      <TableCell></TableCell>
                      <TableCell align="center">Estímulo</TableCell>
                      <TableCell></TableCell>
                      <TableCell align="center">Salario</TableCell>
                      <TableCell align="center">% Ganancia</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                      <TableCell component="th" scope="row">
                        Cafeteria
                      </TableCell>
                      <TableCell align="center">1000</TableCell>
                      <TableCell align="center">+</TableCell>
                      <TableCell align="center">
                        {totalCaf > 90000 ? (totalCaf - 90000) * 0.05 : 0}
                      </TableCell>
                      <TableCell align="center">=</TableCell>
                      <TableCell align="center">{salarioCaf}</TableCell>
                      <TableCell align="center">
                        {((salarioCaf * 100) / ganancia).toFixed(1)} %
                      </TableCell>
                    </TableRow>
                    <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                      <TableCell component="th" scope="row">
                        Utileria
                      </TableCell>
                      <TableCell align="center">600</TableCell>
                      <TableCell align="center">+</TableCell>
                      <TableCell align="center">
                        {totalUti > 10000 ? (totalUti - 10000) * 0.05 : 0}
                      </TableCell>
                      <TableCell align="center">=</TableCell>
                      <TableCell align="center">{salarioUti}</TableCell>
                      <TableCell align="center">
                        {((salarioUti * 100) / ganancia).toFixed(1)} %
                      </TableCell>
                    </TableRow>
                    <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                      <TableCell component="th" scope="row">
                        X Mayor
                      </TableCell>
                      <TableCell align="center">1000</TableCell>
                      <TableCell align="center">+</TableCell>
                      <TableCell align="center">
                        {totalPor > 90000 ? (totalPor - 90000) * 0.05 : 0}
                      </TableCell>
                      <TableCell align="center">=</TableCell>
                      <TableCell align="center">{salarioCaf}</TableCell>
                      <TableCell align="center">
                        {((salarioXMayor * 100) / ganancia).toFixed(1)} %
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Box mt={1} display="flex" alignItems={"center"}>
                <Typography mr={1}>Otros Gastos:</Typography>
                <Typography>{otrosGastos}</Typography>
                <Typography ml={2}>
                  {" "}
                  ---{" "}
                  {((otrosGastos * 100) / ganancia ? ganancia : 0).toFixed(1)} %
                </Typography>
              </Box>
            </Box>
            <Box py={2} borderBottom="1px dashed  gainsboro">
              <Typography fontSize="1.2rem" color={"red"}>
                Ganancia Real :{" "}
                <b>
                  {ganancia -
                    salarioCaf -
                    salarioUti -
                    salarioXMayor -
                    otrosGastos >
                  0
                    ? ganancia -
                      salarioCaf -
                      salarioUti -
                      salarioXMayor -
                      otrosGastos
                    : 0}
                </b>{" "}
                ---{" "}
                {(
                  ((ganancia -
                    salarioCaf -
                    salarioUti -
                    salarioXMayor -
                    otrosGastos) *
                    100) /
                  ganancia
                ).toFixed(1) > 0
                  ? (
                      ((ganancia -
                        salarioCaf -
                        salarioUti -
                        salarioXMayor -
                        otrosGastos) *
                        100) /
                      ganancia
                    ).toFixed(1)
                  : 0}{" "}
                %
              </Typography>
            </Box>
          </Box>

          <Typography textAlign="center" fontSize="1.4rem">
            Importe de venta del Año <b>{totalMonth}</b>
          </Typography>
          {!showYear &&
            inventarie.isSuccess &&
            dataByMonthArray.map(([month, inventories], i) => {
              return <AccordionYear key={i} inv={inventories} month={month} />;
            })}
        </Box>
      </Box>
    </Container>
  );
};
