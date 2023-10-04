import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
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
import ZapatoIcon from "../icons/ZapatoIcon";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export const NavBar = () => {
  const navigate = useNavigate();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
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
        sx={{ display: { md: "none" } }} 
        onClick={ () => {navigate('/login'), handleMobileMenuClose()}}>
        <IconButton size="large" aria-label="Inventario" color="inherit">
          <PersonOutlineOutlinedIcon />
        </IconButton>
        <p>Login / Registro</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="Inventario" color="inherit">
          <PeopleAltOutlinedIcon />
        </IconButton>
        <p>Usuarios</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="venta" color="inherit">
          <Badge badgeContent={1} color="success">
            <CalculateOutlinedIcon />
          </Badge>
        </IconButton>
        <p>Venta</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="Inventario" color="inherit">
          <InventoryOutlinedIcon />
        </IconButton>
        <p>Inventario diario</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="Inventario" color="inherit">
          <Inventory2OutlinedIcon />
        </IconButton>
        <p>Inventario</p>
      </MenuItem>
      <MenuItem sx={{ display: { md: "none" } }}>
        <IconButton size="large" aria-label="Inventario" color="inherit">
          <FastfoodOutlinedIcon />
        </IconButton>
        <p>Cafeteria</p>
      </MenuItem>
      <MenuItem sx={{ display: { md: "none" } }}>
        <IconButton size="large" aria-label="Inventario" color="inherit">
          <HandymanOutlinedIcon />
        </IconButton>
        <p>Utiles</p>
      </MenuItem>
      <MenuItem sx={{ display: { md: "none" } }}>
        <IconButton size="large" aria-label="Inventario" color="inherit">
          <ZapatoIcon />
        </IconButton>
        <p>Calzado</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box
      sx={{
        flexGrow: 1,
        "& .css-1aschtf:hover": { backgroundColor: "rgb(200 255 177 / 25%)" },
        '& .css-1oqqzyl-MuiContainer-root': { padding: 0 }
      }}
    >
      <AppBar position="static" color="primary" enableColorOnDark>
        <Container>
          <Toolbar sx={{ px: 0 }}>
            <IconButton
              onClick={ () => navigate('/')}
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
            <Search sx={{ m: 0 }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
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
                onClick={ () => navigate('/login')}
                size="large"
                aria-label="Inventario"
                color="inherit"
                sx={{ mx: 2 }}
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
            </Box>
            <IconButton
                size="large"
                aria-label="Inventario"
                color="inherit"
                sx={{ display: { md: "none" }, }}
              >
                <Badge badgeContent={1} color="success">
                  <ShoppingCartOutlinedIcon />
                </Badge>
              </IconButton>
            <Box>
              {/* validar que esto no se muestre a clientes */}
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
