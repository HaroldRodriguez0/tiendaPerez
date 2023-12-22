import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import MoreIcon from "@mui/icons-material/MoreVert";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import FastfoodOutlinedIcon from "@mui/icons-material/FastfoodOutlined";
import PersonOffOutlinedIcon from '@mui/icons-material/PersonOffOutlined';
import ZapatoIcon from "../icons/ZapatoIcon";
import DisabledByDefaultOutlinedIcon from '@mui/icons-material/DisabledByDefaultOutlined';
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import { Button, Container, Typography, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authLogout } from "../../reducer/authReducer";
import { stockShow } from "../../reducer/stockReducer";

const noAmin = ['USER_ROLE', 'CAFETERIA_ROLE', 'TOOLS_ROLE' ];

// eslint-disable-next-line no-unused-vars
const Search = styled("div")(({ theme }) => ({
  display: "flex",
  borderRadius: '.6rem',
  width: "auto",
  ".MuiInputBase-root": {
    width: "100%",
  },
  "&:hover": {
    transition: "all .5s ease-in",
    backgroundColor: "rgb(200, 255, 177, 25%)",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1, 0, 1),
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 0, 1, 0),
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

export const NavBar = () => {
  const isMobile = useMediaQuery("(max-width:900px)");
  const dispatch = useDispatch();
  const { rol } = useSelector((state) => state.auth);
  const { name } = useSelector((state) => state.stock);
  const { name: cantProduts } = useSelector((state) => state.stock);
  const navigate = useNavigate();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [valueSearch, setValueSearch] = React.useState("");

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleChangeSearch = (event) => {
    setValueSearch(event.target.value);
  };

  const handleSearch = () => {
    setValueSearch('');
    navigate(`/product/${valueSearch}`)
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      sx={{
        "& .css-3dzjca-MuiPaper-root-MuiPopover-paper-MuiMenu-paper": {
          backgroundColor: "#fafff4",
        },
      }}
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        sx={{
          display: (rol || !isMobile) && "none",
        }}
        onClick={() => {
          navigate("/login"), handleMobileMenuClose();
        }}
      >
        <IconButton size="large" aria-label="Login" color="inherit">
          <PersonOutlineOutlinedIcon />
        </IconButton>
        <p>Login / Registro</p>
      </MenuItem>
      <MenuItem
        sx={{
          display: (!rol || !isMobile ) && "none",
        }}
        onClick={() => {
          dispatch(authLogout()), navigate("/login"), handleMobileMenuClose();
        }}
      >
        <IconButton size="large" aria-label="CerrarSesión" color="inherit">
          <PersonOffOutlinedIcon />
        </IconButton>
        <p>Cerrar Sesión</p>
      </MenuItem>
      <MenuItem sx={{ display:  ( noAmin.some(s => s.includes(rol)) )  && "none"  }} onClick={() =>{ navigate("/users"), handleMobileMenuClose()}}> 
        <IconButton size="large" aria-label="Usuarios" color="inherit">
          <PeopleAltOutlinedIcon />
        </IconButton>
        <p>Usuarios</p>
      </MenuItem>
      <MenuItem  sx={{ display: ( !rol || rol === 'USER_ROLE' ) && "none" }} onClick={() => name.length > 0 && dispatch(stockShow())}>
        <IconButton size="large" aria-label="venta" color="inherit">
          <Badge badgeContent={cantProduts ?cantProduts.length :0} color="success">
            <CalculateOutlinedIcon />
          </Badge>
        </IconButton>
        <p>Calcular</p>
      </MenuItem>
      <MenuItem sx={{ display: ( !rol || rol === 'USER_ROLE' ) && "none" }} onClick={() =>{ navigate("/inventario/diario"), handleMobileMenuClose()}}>
        <IconButton size="large" aria-label="Inventario" color="inherit">
          <InventoryOutlinedIcon />
        </IconButton>
        <p>Venta del día</p>
      </MenuItem>
      <MenuItem sx={{ display:  ( noAmin.some(s => s.includes(rol)) )  && "none"  }} onClick={() =>{ navigate("/inventario/todos"), handleMobileMenuClose()}}>
        <IconButton size="large" aria-label="Inventario" color="inherit">
          <Inventory2OutlinedIcon />
        </IconButton>
        <p>Ventas</p>
      </MenuItem>
      <MenuItem sx={{ display:  ( noAmin.some(s => s.includes(rol)) )  && "none"  }} onClick={() =>{ navigate("/product/agotado"), handleMobileMenuClose()}}>
        <IconButton size="large" aria-label="Inventario" color="inherit">
          <DisabledByDefaultOutlinedIcon />
        </IconButton>
        <p>Agotados</p>
      </MenuItem>
      <MenuItem sx={{ display: { md: "none" } }} onClick={() =>{ navigate("/product/cafeteria"), handleMobileMenuClose()}}>
        <IconButton size="large" aria-label="Cafeteria" color="inherit">
          <FastfoodOutlinedIcon />
        </IconButton>
        <p>Cafeteria</p>
      </MenuItem>
      <MenuItem sx={{ display: { md: "none" } }} onClick={() =>{ navigate("/product/utiles"), handleMobileMenuClose()}}>
        <IconButton size="large" aria-label="Utiles" color="inherit">
          <HandymanOutlinedIcon />
        </IconButton>
        <p>Utiles</p>
      </MenuItem>
      <MenuItem sx={{ display: { md: "none" } }} onClick={() =>{ navigate("/product/calzado"), handleMobileMenuClose() }}>
        <IconButton size="large" aria-label="Calzado" color="inherit">
          <ZapatoIcon />
        </IconButton>
        <p>Calzado</p>
      </MenuItem>
      <MenuItem sx={{ display:  ( noAmin.some(s => s.includes(rol)) )  && "none"  }} onClick={() =>{ navigate('/product/new'), handleMobileMenuClose() }}>
        <IconButton size="large" aria-label="NevoProducto" color="inherit">
          <PlaylistAddOutlinedIcon />
        </IconButton>
        <p>Nevo Producto</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box
      sx={{
        marginBottom: 8.5,
        flexGrow: 1,
        "& .css-1aschtf:hover": { backgroundColor: "rgb(200 255 177 / 25%)" },
        "& .css-1oqqzyl-MuiContainer-root": { padding: 0 },
      }}
    >
      <AppBar position="fixed" color="primary" enableColorOnDark>
        <Container>
          <Toolbar sx={{ px: 0 }}>
            <IconButton
              onClick={() => navigate("/")}
              size="large"
              color="inherit"
              aria-label="logo"
              sx={{ mx: 1, mr: 1, p: 0 }}
            >
              <Box
                component="img"
                sx={{
                  width: "65px",
                  height: "auto",
                }}
                src="../../../public/favicon.png"
                alt="logo"
              />
            </IconButton>
            <Search
          >
            <SearchIconWrapper>
              <IconButton onClick={handleSearch} sx={{px:0}}>
                <SearchIcon />
              </IconButton>
            </SearchIconWrapper>
            <StyledInputBase
              value={valueSearch} 
              onChange={handleChangeSearch} 
              placeholder="Buscar producto…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button
                size="large"
                aria-label="Inventario"
                color="inherit"
                sx={{ mx: 2 }}
              >
                <Badge badgeContent={1} color="success">
                  <ShoppingCartOutlinedIcon />
                </Badge>
                <Typography
                  sx={{
                    display: { xs: "none", lg: "block" },
                    ml: 1,
                    fontSize: "13px",
                  }}
                >
                  Compra
                </Typography>
              </Button>
              <Button 
                onClick={() => navigate("/product/cafeteria")}
                size="large"
                aria-label="Inventario"
                color="inherit"
                sx={{ mx: 2 }}
              >
                <FastfoodOutlinedIcon />
                <Typography
                  sx={{
                    display: { xs: "none", lg: "block" },
                    ml: 1,
                    fontSize: "13px",
                  }}
                >
                  Cafeteria
                </Typography>
              </Button>
              <Button
                onClick={() => navigate("/product/utiles")}
                size="large"
                aria-label="Inventario"
                color="inherit"
                sx={{ mx: 2 }}
              >
                <HandymanOutlinedIcon />
                <Typography
                  sx={{
                    display: { xs: "none", lg: "block" },
                    ml: 1,
                    fontSize: "13px",
                  }}
                >
                  Utiles
                </Typography>
              </Button>
              <Button
                onClick={() => navigate("/product/calzado")}
                size="large"
                aria-label="Inventario"
                color="inherit"
                sx={{ mx: 2 }}
              >
                <ZapatoIcon />
                <Typography
                  sx={{
                    display: { xs: "none", lg: "block" },
                    ml: 1,
                    fontSize: "13px",
                  }}
                >
                  Calzado
                </Typography>
              </Button>
              <Button
                onClick={() => navigate("/login")}
                size="large"
                aria-label="Inventario"
                color="inherit"
                sx={{
                  display: ( rol || isMobile ) && "none", mx: 2 }}
              >
                <PersonOutlineOutlinedIcon />
                <Typography
                  sx={{
                    display: { xs: "none", lg: "block" },
                    ml: 1,
                    fontSize: "13px",
                  }}
                >
                  Login
                </Typography>
              </Button>
              <Button
                onClick={() => {
                  dispatch(authLogout()), navigate("/login"), handleMobileMenuClose();
                }}
                size="large"
                aria-label="Inventario"
                color="inherit"
                sx={{ display: ( !rol || isMobile )  && "none", mx: 2 }}
              >
                <PersonOffOutlinedIcon />
                <Typography
                  sx={{
                    display: { xs: "none", lg: "block" },
                    ml: 1,
                    fontSize: "13px",
                  }}
                >
                  Cerrar
                </Typography>
              </Button>
            </Box>
            <IconButton
              size="large"
              aria-label="Inventario"
              color="inherit"
              sx={{ display: { md: "none" } }}
            >
              <Badge badgeContent={1} color="success">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>
            <Box sx={{ display: ( ( !rol || rol === 'USER_ROLE' ) && !isMobile )  && "none" }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
};
