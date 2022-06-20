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
import { toast } from "react-toastify";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Login({ setIsLogged }) {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const baseUrl = "https://kenziehub.herokuapp.com";
  const history = useHistory();

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Campo obrigatório")
      .max(40, "Email inválido")
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Email inválido"
      ),
    password: yup.string().required("Campo obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmitData = (data) => {
    const response = axios
      .post(`${baseUrl}/sessions`, data)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("name", res.data.user.name);
        localStorage.setItem("course_module", res.data.user.course_module);
        toast.success("Login bem sucedido! Redirecionando...");
        setIsLogged(true);
        setTimeout(() => history.push("/dashboard"), 3000);
      })
      .catch((err) => toast.error("Email ou senha inválidos"));
    return response;
  };

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
          <Stack
            component="form"
            onSubmit={handleSubmit(onSubmitData)}
            spacing={3}
            alignItems="center"
          >
            <Typography color="#FFFFFF" variant="h6">
              Login
            </Typography>
            <TextField
              label="Email"
              placeholder="Digite aqui seu email"
              variant="outlined"
              color="white"
              helperText={errors.email?.message ? errors.email.message : ""}
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
              {...register("email")}
            />
            <TextField
              width="80%"
              label="Senha"
              placeholder="Digite aqui sua senha"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              color="white"
              helperText={
                errors.password?.message ? errors.password.message : ""
              }
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
                color: "white",
                input: {
                  color: "#FFFFFF",
                  "&hover:": "white",
                  "&::placeholder": "white",
                },
              }}
              {...register("password")}
            />
            <Button
              type="submit"
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
