import {
  Box,
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
export const Producto = ({ i, name }) => {

  return (
    <Card elevation={3} sx={{ maxWidth: 400, minHeight: 254 }} >
      <CardActionArea sx={{ minHeight:204, "&:hover": { transition:"all .5s ease-in" , backgroundColor: '#f7ffef' },border:'1px solid red' }}>
        <Box  overflow={"hidden"} sx={{height: { xs:"24vh", sm:'auto'}, border:'1px solid black'}}>
          <CardMedia
            component="img"
            sx={{
              transition: "1s",
              "&:hover": {
                transform: "scale(1.12)",
              },
              objectFit:'cover',
              objectPosition: '50% 50%'
            }}
            width="100%"
            height="auto"
            image={`../../../public/producto${i.toString()}.png`}
            alt="green iguana"
          />
        </Box>

        <CardContent sx={{ p:'7px 5px 0 5px', }}>
          <Typography textAlign={"center"} gutterBottom fontSize={'1rem'} lineHeight={'1.2'} m={0} fontWeight='400'>
          {name}
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
