/* eslint-disable react/prop-types */
import { Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from "@mui/icons-material/Remove";
import { Box } from "@mui/system";
import { useState } from "react";
import Image from "../Image";

export const Shopp = ({ product }) => {
  console.log(product);

  const handleChange = (event) => {
    const newValue = Number(event.target.value);
    setNumber(newValue);
  };

  const [number, setNumber] = useState(1);
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

  return (
    <Grid container spacing={1} sx={{py:3, borderBottom:'1px solid rgba(0,0,0,0.105)'}}>

      <Grid item xs={5}>
        <Image alt="icono" src={product.img} />
      </Grid>

      <Grid item xs={7} sx={{flexDirection:'column', alignItems:'center'}}>
        <Box sx={{display:'flex', justifyContent:'space-between', mb:1.1}}>
        <Typography textAlign='center'>{product.name}</Typography>
        <IconButton sx={{p:0}}>
          <CloseIcon sx={{fontSize:'1rem'}}/>
        </IconButton>
        </Box>
        <Box sx={{display:'flex', justifyContent:'space-between', borderBottom:'1px dashed rgba(0,0,0,0.105)'}}>
          <Typography>Precio</Typography>
          <Typography color='green'>{product.precio}</Typography>
        </Box>
        <Box sx={{display:'flex', justifyContent:'space-between', borderBottom:'1px dashed rgba(0,0,0,0.105)', my:1.1}}>
          <Typography>Cantidad</Typography>
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
        </Box>
        <Box sx={{display:'flex', justifyContent:'space-between', }}>
          <Typography>SubTotal</Typography>
          <Typography color='green'>{product.precio}</Typography>
        </Box>
      </Grid>

    </Grid>
  );
};
