import { useEffect, useRef, useState } from "react";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import "../../styles/style.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useInventarie } from "../../hooks/useInventarie";
import { InventarioDay } from "./InventarioDay";

export const Inventarios = () => {
  const daysContainer = useRef(null);
  const nextBtn = useRef(null);
  const prevBtn = useRef(null);
  //const month = useRef(null);
  const todayBtn = useRef(null);
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  /*   const date = new Date();
  let currentMonth = date.getMonth();
  let currentYear = date.getFullYear();
  const [markedMonth, setMonth] = useState(currentMonth);
  const [markedYear, setYear] = useState(currentYear);
  const [markedToday, setToday] = useState();
  const [markedDay, setDay] = useState([]);
  const [days, setDays] = useState([]);
  const [cont, setcont] = useState(0);

  const addClickEvent = () => {
    const days = document.querySelectorAll(".day");
    days.forEach((day) => {
      if (!day.classList.contains("prev") && !day.classList.contains("next")) {
        day.addEventListener("click", () => {
          //console.log(markedDay)
          //setDay([...markedDay ,day.textContent]);

          day.classList.toggle("today");
          days.forEach((other) => {
            if (other !== day) {
              other.classList.remove("day.today");
            }
          });
          const dayNumber = parseInt(day.textContent);
          setToday(dayNumber);
          setDay((prevState) => {
            // Comprueba si el día ya está en el arreglo
            if (prevState.includes(dayNumber)) {
              setcont((cont) => cont + 1);
              // Si está, lo quita del arreglo usando el método filter
              return prevState.filter((d) => d !== dayNumber);
            } else {
              // Si no está, lo agrega al arreglo usando el operador spread
              return [...prevState, dayNumber];
            }
          });
        });
      }
    });
  };

  const renderCalendar = () => {
    date.setDate(1);
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const lastDayIndex = lastDay.getDay();
    const lastDayDate = lastDay.getDate();
    const prevLastDay = new Date(currentYear, currentMonth, 0);
    const prevLastDayDate = prevLastDay.getDate();
    const nextDays = 7 - lastDayIndex - 1;
    month.current.innerHTML = `${months[currentMonth]} ${currentYear}`;
    let days = "";
    for (let x = firstDay.getDay(); x > 0; x--) {
      days += `<div class="day prev">${prevLastDayDate - x + 1}</div>`;
    }
    for (let i = 1; i <= lastDayDate; i++) {
      if (
        i === new Date().getDate() &&
        currentMonth === new Date().getMonth() &&
        currentYear === new Date().getFullYear()
      ) {
        days += `<div class="day today">${i}</div>`;
      } else {
        days += `<div class="day ">${i}</div>`;
      }
    }
    for (let j = 1; j <= nextDays; j++) {
      days += `<div class="day next">${j}</div>`;
    }
    hideTodayBtn();
    daysContainer.current.innerHTML = days;

    if (document.querySelector(".day.today")?.textContent) {
      setDay([
        ...markedDay,
        parseInt(document.querySelector(".day.today")?.textContent),
      ]);
      setToday(parseInt(document.querySelector(".day.today")?.textContent));
      //setcont(cont + 1);
    } else {
      setToday();
      setDay([]);
      setDays([]);
      //setcont(cont + 1);
    }

    addClickEvent();
  }


  useEffect(() => {
    renderCalendar();
    nextBtn.current.addEventListener("click", () => {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      setMonth(currentMonth);
      setYear(currentYear);
      renderCalendar(); 
    });
    prevBtn.current.addEventListener("click", () => {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      setMonth(currentMonth);
      setYear(currentYear);
      renderCalendar();
    });
    todayBtn.current.addEventListener("click", () => {
      currentMonth = date.getMonth();
      currentYear = date.getFullYear();
      setMonth(currentMonth);
      setYear(currentYear);
      renderCalendar();
    });
  }, [currentMonth, currentYear]);

  useEffect(() => {
    renderCalendar();
    nextBtn.current.addEventListener("click", () => {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      setMonth(currentMonth);
      setYear(currentYear);
      renderCalendar(); 
    });
  }, [])
  

  function hideTodayBtn() {
    if (
      currentMonth === new Date().getMonth() &&
      currentYear === new Date().getFullYear()
    ) {
      todayBtn.current.style.display = "none";
    } else {
      todayBtn.current.style.display = "flex";
    }
  }

  const inventarie = useInventarie(markedYear, markedMonth, markedToday);

  useEffect(() => {
    if (markedToday) {
      if (markedDay.length > days.length) {
        setDays([
          ...days,
          { d: markedToday, inventarie: inventarie.data?.products },
        ]);
      } else {
        if (markedDay.length === days.length) {
          const d = days;
          d[days.length - 1] = {
            d: markedToday,
            inventarie: inventarie.data?.products,
          };
          setDays(d);
        } else {
          setDays(days.filter((obj) => markedDay.some((num) => num === obj.d)));
        }
      }
    }
  }, [cont, inventarie.data]); */

  //console.log(markedMonth)

  const [value, setValue] = useState(dayjs());
  //const [day, setDay] = useState(value.date());
  const [month, setMonth] = useState(value.month());
  const [year, setYear] = useState(value.year());
  const [markedDay, setMmarkedDay] = useState([value.date()]);

  //console.log(day,month,year);

  const handleOnChangeDay = (newValue) => {
    setValue(newValue);
    markedDay.find((d) => d === newValue.date())
      ? setMmarkedDay(markedDay.filter((d) => d !== newValue.date()))
      : setMmarkedDay([...markedDay, newValue.date()]);
  };

  console.log(markedDay);

  return (
    <Container sx={{ my: 5 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          justifyContent: "space-around",
        }}
      >
        {/*         <Box sx={{ display: "flex", justifyContent: "center" }}>
          <div className="calendar">
            <div className="header">
              <div className="month" ref={month}></div>
              <div className="btns">
                <div className="btn today-btn" ref={todayBtn}>
                  <EventAvailableOutlinedIcon />
                </div>
                <div className="btn prev-btn" ref={prevBtn}>
                  <ArrowBackIosNewOutlinedIcon />
                </div>
                <div className="btn next-btn" ref={nextBtn}>
                  <ArrowForwardIosOutlinedIcon />
                </div>
              </div>
            </div>
            <div className="weekdays">
              <div className="day">Dom</div>
              <div className="day">Lun</div>
              <div className="day">Mar</div>
              <div className="day">Mie</div>
              <div className="day">Jue</div>
              <div className="day">Vie</div>
              <div className="day">Sab</div>
            </div>
            <div className="days " ref={daysContainer}></div>
          </div>
        </Box>  */}

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={value}
            onChange={(newValue) => handleOnChangeDay(newValue)}
            showDaysOutsideCurrentMonth
            fixedWeekNumber={6}
            slotProps={{
              day: (day) => ({
                className: markedDay.find((d) => d === day.day.date())
                  ? "selected"
                  : "",
                sx: {
                  /*  fontSize: '2rem', */
                  "&.selected": {
                    backgroundColor: "#2fca3c !important",
                  },
                  "&.Mui-selected": {
                    backgroundColor: "transparent",
                  },
                  "&.Mui-selected:focus": {
                    backgroundColor: "transparent",
                  },
                },
              }),
            }}
          />
        </LocalizationProvider>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "row", lg: "column" },
            justifyContent: "center",
            my: 2,
          }}
        >
          <Button
            size="large"
            variant="outlined"
            color="success"
            sx={{ mx: 0.5, my: { lg: 8 } }}
          >
            Mostrar Ventas del Año
          </Button>
          <Button
            size="large"
            variant="outlined"
            color="success"
            sx={{ mx: 0.5, my: { lg: 8 } }}
          >
            Mostrar Ventas del Mes
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: { lg: 2 } }}>
        {/* {days.map((inv, i) => {
          const total = inv.inventarie?.reduce(
            (acum, item) => acum + item.precio * item.cantidad,
            0
          );
          return (
            <Box key={i}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{p:0}}
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      size="large"
                      variant="outlined"
                      color="success"
                      sx={{
                        width: "100%",
                        maxWidth: "780px",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <Typography>Dia {inv.d}</Typography>
                      <Typography textTransform="none">
                        Importe de Venta: {total ? total : " -------"}
                      </Typography>
                    </Button>
                  </Box>
                </AccordionSummary>
                <AccordionDetails sx={{p:0}}>
                  <InventarioDay inventario={inv.inventarie} />
                </AccordionDetails>
              </Accordion>
              {/*           <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
            <Button onClick={() => handleClick(inv.inventarie)} size="large" variant="outlined" color="success" sx={{width:'100%', maxWidth:'780px', mb: 2, justifyContent: 'space-evenly'}}>
            <Typography>Dia {inv.d}</Typography> 
            <Typography textTransform='none'>Importe de Venta: { total ? total :' -------' }</Typography>  
          </Button>
          </Box>
          <InventarioDay inventario={inv.inventarie} /> 
            </Box>
          );
        })} */}
      </Box>
    </Container>
  );
};
