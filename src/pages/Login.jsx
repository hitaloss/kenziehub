import {
  Button,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  return (
    <>
      <Stack
        marginY={7}
        spacing={3}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h6" component="div" color="primary.main">
          Kenzie Hub
        </Typography>
        <Paper
          sx={{
            backgroundColor: "background.paper",
            justifyContent: "center",
            alignItems: "center",
            direction: "column",
            borderRadius: "10px",
            padding: "2rem 1rem",
            width: {
              xs: 280,
              sm: 370,
              md: 400,
            },
          }}
        >
          <Stack spacing={3} alignItems="center">
            <Typography color="#FFFFFF" variant="h6">
              Login
            </Typography>
            <TextField
              label="Email"
              placeholder="Digite aqui seu email"
              variant="outlined"
              color="white"
              sx={{
                backgroundColor: "secondary.main",
                borderRadius: "5px",
                width: "80%",
                input: {
                  color: "#FFFFFF",
                  "&hover:": "white",
                  "&::placeholder": "white",
                },
              }}
            />
            <TextField
              width="80%"
              label="Senha"
              placeholder="Digite aqui sua senha"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              color="white"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                backgroundColor: "secondary.main",
                borderRadius: "5px",
                width: "80%",
                input: {
                  color: "#FFFFFF",
                  "&hover:": "white",
                  "&::placeholder": "white",
                },
              }}
            />
            <Button
              sx={{
                padding: ".6rem",
                width: "80%",
                color: "secondary.contrastText",
                backgroundColor: "primary.light",
                "&:hover": { backgroundColor: "primary.main" },
              }}
            >
              Enviar
            </Button>
            <Typography
              sx={{
                fontWeight: "600",
                fontSize: "12px",
              }}
              color="secondary.light"
            >
              Ainda não possui uma conta?
            </Typography>
            <Button
              sx={{
                padding: ".6rem",
                width: "80%",
                color: "secondary.contrastText",
                backgroundColor: "secondary.light",
                "&:hover": { backgroundColor: "secondary.light" },
              }}
            >
              Cadastre-se
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </>
  );
}

export default Login;
