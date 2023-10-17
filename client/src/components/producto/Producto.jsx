import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import { useEffect, useRef, useState } from "react";
import { useElementHeight } from "../../hooks/useElementHeight";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
export const Producto = ({ i, name }) => {

  const { rol } = useSelector((state) => state.auth);
  const [number, setNumber] = useState(1);
  const noAdmin = ['USER_ROLE', 'CAFETERIA_ROLE', 'TOOLS_ROLE' ];
  const user = ['USER_ROLE', '' ];

  const handleChange = (event) => {
    const newValue = Number(event.target.value);
    setNumber(newValue);
  };

  const handleIncrement = () => {
    if (number < 99) {
      setNumber(number + 1);
    }
  };

  const handleDecrement = () => {
    if (number > 1) {
      setNumber(number - 1);
    }
  };
  const isMobile = useMediaQuery("(max-width:600px)");
  const [pb, setPb] = useState(false);
  const nameRef = useRef(null);
  // Obtenemos la altura del elemento usando el hook personalizado
  const nameHeight = useElementHeight(nameRef);

   useEffect(() => {
    nameHeight < 38 ? setPb(true) : setPb(false);
  }, [nameHeight]); 

  return (
    <Card elevation={3}>
      <Box sx={{display: rol !== 'ADMIN_ROLE' ?'none' :"flex", justifyContent: "flex-end", pr:1}}>
        <IconButton
          color="inherit"
          aria-label="Inventario"
          sx={{ p: 0 }}
        >
          <EditOutlinedIcon sx={{ fontSize: '1.3rem' }}/>
          <Typography sx={{ pl: 1, fontSize: '.9rem' }}>Editar</Typography>
        </IconButton>
      </Box>
      <CardActionArea
        sx={{
          "&:hover": {
            transition: "all .5s ease-in",
            backgroundColor: "#f7ffef",
          },
        }}
      >
        <Box overflow={"hidden"}>
          <CardMedia
            component="img"
            sx={{
              transition: "1s",
              "&:hover": {
                transform: "scale(1.12)",
              },
              objectFit: "cover",
              objectPosition: "50% 50%",
            }}
            width="100%"
            height="auto"
            image={`../../../public/producto${i.toString()}.png`}
            alt="green iguana"
          />
        </Box>

        <CardContent sx={{ p: "7px 5px 0 5px" }}>
          <Typography
            textAlign="center"
            lineHeight="1.2"
            fontWeight="400"
            ref={nameRef} 
            sx={{
              pb: { xs: pb && "1rem" },
              fontSize: { xs: "1rem", sm: "1.2rem" },
            }}
          >
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions
        sx={{ p: 0, px: 1, display: "flex", flexDirection: "column" }}
      >
        <IconButton
          aria-label="Carro"
          color="success"
          sx={{ width: "100%", justifyContent: "space-around" }}
        >
          <Typography
            textAlign={"center"}
            fontSize={".9rem"}
            lineHeight={"1.2"}
            fontWeight="400"
            sx={{ m: 0, fontSize: { xs: "1rem", sm: "1.1rem", md: "1.3rem" } }}
          >
            200 cup
          </Typography>
          <AddShoppingCartOutlinedIcon sx={{ fontSize: "1.8rem" }} />
        </IconButton>
        <Grid container paddingBottom=".6rem" sx={{ display:  ( user.includes(rol)) && "none" }}>
          <Grid item xs={7} sx={{ display: "flex", justifyContent: "center" }}>
            <TextField
              sx={{ pl: "3px", maxWidth: "90px" }}
              variant="standard"
              type="number"
              color="success"
              name="number"
              value={number}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleIncrement}
                      aria-label="increment"
                      sx={{ p: "3px" }}
                    >
                      <AddIcon sx={{ fontSize: "1rem" }} />
                    </IconButton>
                    <IconButton
                      onClick={handleDecrement}
                      aria-label="decrement"
                      sx={{ p: "3px" }}
                    >
                      <RemoveIcon sx={{ fontSize: ".9rem" }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={5} sx={{ display: "flex", justifyContent: "center" }}>
            <IconButton
              size="large"
              aria-label="Compra"
              color="success"
              sx={{ p: 0 }}
            >
              <AddTaskOutlinedIcon sx={{ fontSize: "1.8rem" }} />
            </IconButton>
          </Grid>
        </Grid>

        <Box width={"100%"} sx={{ display:  ( user.includes(rol)) && "none" }}>
          <Typography
            textAlign="center"
            fontWeight="400"
            sx={{ fontSize: { xs: ".9rem" }, mr: "5px" }}
          >
            {isMobile ? "Cant Tienda" : "Cantidad Tienda"} : <b>100</b>
          </Typography>
        </Box>
      </CardActions>
    </Card>
  );
};
