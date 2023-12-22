import SearchIcon from "@mui/icons-material/Search";
import DensitySmallOutlinedIcon from "@mui/icons-material/DensitySmallOutlined";
import { useEffect, useState } from "react";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import {
  Button,
  Container,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useUsers } from "../../hooks/useUsers";
import { User } from "./User";
import { SkeletonUser } from "./SkeletonUser";

// eslint-disable-next-line no-unused-vars
const Search = styled("div")(({ theme }) => ({
  display: "flex",
  borderRadius: ".6rem",
  border: "1px solid #5bee3f",
  width: "auto",
  ".MuiInputBase-root": {
    width: "100%",
  },
  marginLeft: "1rem",
  "&:hover": {
    transition: "all .5s ease-in",
    backgroundColor: "rgb(200, 255, 177, 25%)",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 0.5),
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 0, 1, 0),
    paddingRight: `calc(.5em + ${theme.spacing(0)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

export const Usuarios = () => {
  const [filter, setFilter] = useState("");
  const [value, setValue] = useState("");

  const users = useUsers(value);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const skeletons = [...Array(8)].fill("");

  const threshold = 300;


  const onScroll = () => {
    let scrollPosition = window.scrollY;
    let pageHeight = document.body.offsetHeight;
    let windowHeight = window.innerHeight;
    let difference = pageHeight - scrollPosition - windowHeight;
    if (difference < threshold) {
      ( users.hasNextPage && !users.isFetching ) && ( users.fetchNextPage() ); 
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [users.hasNextPage, users.isFetching]); 

  return (
    <Container sx={{pt:2}}>
      <Grid container marginBottom="8px">
        <Grid
          item
          order={{ xs: 1 }}
          xs={10}
          sm={4}
          display="flex"
          justifyContent="center"
        >
          <Search>
            <SearchIconWrapper>
              <IconButton>
                <SearchIcon />
              </IconButton>
            </SearchIconWrapper>
            <StyledInputBase
              value={value}
              onChange={handleChange}
              placeholder="Buscar usuario…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Grid>
        <Grid
          item
          order={{ xs: 2, sm: 4 }}
          xs={2}
          sm={2}
          display="flex"
          justifyContent="center"
        >
          <IconButton
            onClick={() => setFilter("")}
            sx={{
              "&:hover": {
                transition: "all .5s ease-in",
                backgroundColor: "rgb(200, 255, 177, 25%)",
              },
            }}
          >
            <DensitySmallOutlinedIcon />
          </IconButton>
        </Grid>
        <Grid
          item
          order={{ xs: 3, sm: 2 }}
          xs={6}
          sm={3}
          display="flex"
          justifyContent="center"
        >
          <Button
            onClick={() => setFilter("activos")}
            size="large"
            aria-label="lista"
            color="inherit"
            sx={{
              "&:hover": {
                transition: "all .5s ease-in",
                backgroundColor: "rgb(200, 255, 177, 25%)",
              },
            }}
          >
            <PersonAddAltOutlinedIcon />
            <Typography
              sx={{
                ml: "15px",
                fontSize: "1rem",
              }}
            >
              Activos
            </Typography>
          </Button>
        </Grid>
        <Grid
          item
          order={{ xs: 4, sm: 3 }}
          xs={6}
          sm={3}
          display="flex"
          justifyContent="center"
        >
          <Button
            onClick={() => setFilter("vetados")}
            size="large"
            aria-label="lista"
            color="inherit"
            sx={{
              "&:hover": {
                transition: "all .5s ease-in",
                backgroundColor: "rgb(200, 255, 177, 25%)",
              },
            }}
          >
            <PersonRemoveOutlinedIcon />
            <Typography
              sx={{
                ml: "15px",
                fontSize: "1rem",
              }}
            >
              Vetados
            </Typography>
          </Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table" size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ p: 0 }}></TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Permisos</TableCell>
              <TableCell>Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.isSuccess &&
              users.data.pages
                .flat()
                .map((user, i) => (
                  <User key={i} user={user} filter={filter} users={users} />
                ))}
            {users.isFetching &&
              skeletons.map((skeleton, i) => <SkeletonUser key={i} />)}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
