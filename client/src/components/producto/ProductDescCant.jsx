import {
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

// eslint-disable-next-line react/prop-types
export const ProductDescCant = ({obj, i, num, setNum}) => {

  const handleChange = (event) => {
    const newValue = Number(event.target.value);
    let nuevoNum = [...num];
    nuevoNum[i] = newValue; 
    setNum(nuevoNum);
  };

  const handleIncrement = () => {
    if (num[i] < 99) {
      let nuevoNum = [...num];
      nuevoNum[i] = num[i] + 1; 
      setNum(nuevoNum);
    }
  };

  const handleDecrement = () => {
    if (num[i] > 0) {
      let nuevoNum = [...num];
      nuevoNum[i] = num[i] - 1; 
      setNum(nuevoNum);
    }
  };

  return (
    <Grid item xs={10} sm={6}>
    <Box display="flex" justifyContent="space-evenly" marginBottom={.7}>
      <Typography
        paddingX={0.6}
        border={"solid 1px greenyellow"}
        borderRadius=".5rem"
        fontSize="1.1rem"
        display="flex"
        alignItems="center"
      >
        {obj}
      </Typography>
      <TextField
        sx={{ pl: "3px", maxWidth: "90px" }}
        variant="standard"
        type="number"
        color="success"
        name="number"
        value={num[i]}
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
    </Grid>
  );
};
