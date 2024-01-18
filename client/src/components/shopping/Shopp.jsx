/* eslint-disable react/prop-types */
import {
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box } from "@mui/system";
import Image from "../Image";
import { useDispatch } from "react-redux";
import { shoppingChange, shoppingDecrement, shoppingDelete, shoppingIncrement } from "../../reducer/shoppingReducer";

export const Shopp = ({ product }) => {

  const dispatch = useDispatch();

  const handleChange = (event) => {
    const newValue = Number(event.target.value);
    ( !product.numero && !product.tipo && !product.color ) &&
    dispatch(shoppingChange({ _id: product._id, cant: newValue}))
  };

  const handleIncrement = () => {
    ( !product.numero && !product.tipo && !product.color ) &&
    dispatch(shoppingIncrement({ _id: product._id }))
  };

  const handleDecrement = () => {
    ( !product.numero && !product.tipo && !product.color ) &&
    dispatch(shoppingDecrement({ _id: product._id }))
  };

  const handleDelete = () => {
    dispatch( shoppingDelete({ _id: product._id ?product._id :product.uid }))
  };


  

  return (
    <>
      <Grid
        container
        sx={{
          py: 2,
          borderBottom: "1px solid rgba(0,0,0,0.105)",
        }}
      >
        <Grid
          item
          xs={4}
          sm={5.1}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <IconButton onClick={handleDelete} sx={{ display:{xs:'none',sm:'block'}, p: 0, mr: { sm: 2 } }}>
            <CloseIcon sx={{ fontSize: "1rem" }} />
          </IconButton>

          <Box pr={1} sx={{ maxWidth: { sm: "50%" } }}>
            <Image alt="icono" src={product.img} />
          </Box>

          <Typography
            width="100%"
            textAlign="center"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            {product.name}
          </Typography>
        </Grid>

        <Grid
          item
          sm={2.3}
          sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}
        >
          <Typography color="green" width="100%" textAlign="center">
            {product.precio }
          </Typography>
        </Grid>
        <Grid
          item
          sm={2.3}
          sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center", justifyContent:'center' }}
        >
          <TextField
            sx={{ pl: "3px", maxWidth: "90px" }}
            variant="standard"
            type="number"
            color="success"
            name="number"
            value={product.cant}
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
        <Grid
          item
          sm={2.3}
          sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}
        >
          <Typography color="green" width="100%" textAlign="center">
            {product.precio * product.cant}
          </Typography>
        </Grid>

        <Grid
          item
          xs={8}
          sx={{
            width: "100%",
            display: { xs: "flex", sm: "none" },
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography textAlign="center">{product.name}</Typography>
            <IconButton onClick={handleDelete} sx={{ p: 0 }}>
              <CloseIcon sx={{ fontSize: "1rem" }} />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px dashed rgba(0,0,0,0.105)",
            }}
          >
            <Typography>Precio</Typography>
            <Typography color="green">{product.precio}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px dashed rgba(0,0,0,0.105)",
              my: 1,
            }}
          >
            <Typography>Cantidad</Typography>
            <TextField
              sx={{ pl: "3px", maxWidth: "90px" }}
              variant="standard"
              type="number"
              color="success"
              name="number"
              value={product.cant}
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
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>SubTotal</Typography>
            <Typography color="green">{product.precio * product.cant}</Typography>
          </Box>
        </Grid>
      </Grid>

    </>
  );
};
