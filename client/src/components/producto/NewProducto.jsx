import { Box, Button, Card, CardContent, Container, Grid, TextField, Typography } from "@mui/material";



export const NewProducto = () => {
  return (
    <Container maxWidth={"md"}>
      <Grid
        sx={{
          mt: 5,
          boxShadow: "0 0 10px rgba(0,0,0,0.5)",
        }}
      >
        <Grid>
          <Card
            sx={{
              backgroundColor: "#fafff4",
              p: { xs: "1rem", md: "1rem 7rem" },
            }}
          >
            <Typography variant="h6" textAlign={"center"} color={"black"}>
              Agregar Nuevo Producto
            </Typography>
            <CardContent>
              <form /* onSubmit={handleSubmiteee} */>
                <Box display={"flex"} flexDirection={"column"} gap={4}>
                  <TextField
                    type="email"
                    name="email"
                    variant="standard"
                    label="Email..."
                    color="success"
                    /* value={email}
                    onChange={handleregisterForm}
                    error={erroremail ?true :false}
                    helperText={ erroremail }  */
                  />
                </Box>
                <Button
                  sx={{ marginTop: 4 }}
                  variant="contained"
                  type="submit"
                >
                  {/* {loading ? (
                    <CircularProgress color="inherit" size={24} />
                  ) : (
                    "Enviar"
                  )} */} aaaa
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
