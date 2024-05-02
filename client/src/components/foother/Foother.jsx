import {
  Button,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import {
  SgvFacebook,
  SgvInstagram,
  SgvTwitter,
  SgvYoutube,
} from "../../assets/svg";
import { useForm } from "../../hooks/useForm";
import { api } from "../../api/myApi";
import Swal from "sweetalert2";
import { useState } from "react";

export const Foother = () => {
  const moreTitle = useMediaQuery("(max-width:830px)");
  const [first, setFirst] = useState(false);
  const [contact, handleContact, contactReset] = useForm({
    email: "",
    comentario: "",
  });

  const { email, comentario } = contact;

  const handleSubmite = async (e) => {
    e.preventDefault();
    setFirst(true);
    await api.post("/auth/contact", contact)
    .then(() => {
      Swal.fire("", 'Mensaje enviado con éxito !', "success");
      return;
    })
    .catch(() => {
      Swal.fire("", 'Mensaje no Enviado', "error");
      return;
    });
    contactReset();
    setFirst(false);
  };

  return (
    <Box mt={{xs:3, lg:5}}>
      <Grid
        container
        sx={{
          background: "white",
          justifyContent: "center",
          alignItems: "center",
          pb: { xs: 2, sm: 0 },
        }}
      >
        <Grid item xs={7} sm={5} md={4} lg={3}>
          <img alt="icono" src="https://res.cloudinary.com/dcl924dfw/image/upload/v1714058411/contact_ty3qib.jpg" />
        </Grid>
        <Grid item xs={9} sm={7} md={8} lg={9} sx={{ px: { sm: 5 } }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: {
                xs: "2rem",
                sm: "2.2rem",
                md: "2.4rem",
                lg: "2.7rem",
                xl: "3rem",
              },
              textAlign: "center",
              color: "green",
            }}
          >
            Contacto
          </Typography>
          <Box mb={1}>
            <Typography sx={{ fontSize: { xs: "1.2rem", lg: "1.5rem" } }}>
              Número telefónico:{" "}
            </Typography>
            <a href="tel:5350889404" className="enlace">
              +53 50889404
            </a>
          </Box>
          <form onSubmit={handleSubmite}>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                flexDirection: { xs: "column" },
              }}
            >
              <TextField
                required
                type="email"
                name="email"
                variant="outlined"
                label="Email..."
                color="success"
                size={moreTitle ? "small" : "medium"}
                value={email}
                onChange={handleContact}
              />
              <TextField
                required
                name="comentario"
                variant="outlined"
                label="Comentario..."
                color="success"
                size={moreTitle ? "small" : "medium"}
                multiline
                rows={3}
                value={comentario}
                onChange={handleContact}
              />
            </Box>
            <Box>
              <Button
                disabled={first}
                type="submit"
                variant="outlined"
                color="success"
                sx={{ mt: 1 }}
              >
                Enviar
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "space-evenly", mt: 3 }}>
        <a>
          <SgvFacebook />
        </a>
        <a>
          <SgvInstagram />
        </a>
        <a>
          <SgvTwitter />
        </a>
        <a>
          <SgvYoutube />
        </a>
      </Box>
      <Typography mt={1} fontSize=".8rem" textAlign="center">
        &copy; 2023 Denis & Pérez la mejor calidad. <a className="contributors" href="http://www.freepik.com">contributors</a>
      </Typography>
    </Box>
  );
};
