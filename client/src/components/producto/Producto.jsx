import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';

// eslint-disable-next-line react/prop-types
export const Producto = ({ i }) => {
  return (
    <Card elevation={3} sx={{ maxWidth: 400 }}>
      <CardActionArea sx={{ "&:hover": { transition:"all .5s ease-in" , backgroundColor: '#f7ffef' } }}>
        <Box overflow={"hidden"}>
          <CardMedia
            sx={{
              height: { xs:"25vh", sm:'auto'},
              transition: "1s",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
            component="img"
            width="100%"
            height="auto"
            image={`../../../public/producto${i.toString()}.png`}
            alt="green iguana"
          />
        </Box>

        <CardContent sx={{ p:'5px 5px 0 5px', }}>
          <Typography textAlign={"center"} gutterBottom fontSize={'.9rem'} lineHeight={'1.2'} m={0} fontWeight='400'>
          adaptador wifi febsmart n600
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ p:0, px: 1}}>
      <IconButton aria-label="Inventario" color="success">
      <Typography textAlign={"center"} gutterBottom fontSize={'.9rem'} lineHeight={'1.2'} m={0} fontWeight='400'>
          200 cup
          </Typography>
          <AddShoppingCartOutlinedIcon sx={{ fontSize: 35 }}/>
        </IconButton>
      </CardActions>
    </Card>
  );
};
