import { useEffect, useState } from "react";
import "../../styles/style.css";
import { Box, Button, Container, Typography } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useInventarie } from "../../hooks/useInventarie";
import { AccordionDay } from "./AccordionDay";
import { AccordionMonth } from "./AccordionMonth";
import { AccordionYear } from "./AccordionYear";

export const Inventarios = () => {
  dayjs.locale("es");
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

  const handleOnChangeDay = (newValue) => {
    setShowMonth(true);
    setShowYear(true);
    setValue(newValue);
    markedDay.find((d) => d === newValue.date())
      ? setMmarkedDay(markedDay.filter((d) => d !== newValue.date()))
      : setMmarkedDay([...markedDay, newValue.date()]);
  };

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

  const  handleDataByMonth = () => {
    if (!showYear){
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
          { d: value.date(), inventarie: inventarie.data?.products },
        ]);
      } else {
        if (markedDay.length === days.length) {
          const d = days;
          d[days.length - 1] = {
            d: value.date(),
            inventarie: inventarie.data?.products,
          };
          setDays(d);
        } else {
          setDays(days.filter((obj) => markedDay.some((num) => num === obj.d)));
        }
      }
    }

    if (inventarie.isSuccess) {
      setTotalMonth(calcularTotal(inventarie.data));
      handleDataByMonth();
    }

  }, [inventarie.data, markedDay]);

  let dataByMonthArray = Object.entries(dataByMonth);

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
      <Box sx={{ mt: { md: 2 } }}>
        {days.map((inv, i) => {
          const total = inv.inventarie?.reduce(
            (acum, item) => acum + item.precio * item.cantidad,
            0
          );
          return <AccordionDay key={i} total={total} inv={inv} />;
        })}

        <Box display={showMonth && "none"}>
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
