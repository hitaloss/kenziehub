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
import { Redirect, useHistory } from "react-router-dom";
import axios from "axios";

function Login({ isLogged, setIsLogged }) {
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
        localStorage.clear();
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("name", res.data.user.name);
        localStorage.setItem("course_module", res.data.user.course_module);
        localStorage.setItem("user_id", res.data.user.id);
        toast.success("Login bem sucedido!");
        setIsLogged(true);
        history.push("/dashboard");
      })
      .catch((err) => toast.error("Email ou senha inválidos"));
    return response;
  };
  if (isLogged) return <Redirect to="/dashboard" />;

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
              helperText={errors.email?.message}
              error={errors.email !== undefined ? true : false}
              sx={{
                backgroundColor: "secondary.main",
                borderRadius: "5px",
                width: "80%",
                input: {
                  color: "#FFFFFF",
                  "&:hover": { color: "#FFFFFF" },
                  "&::placeholder": { color: "#FFFFFF" },
                },
                label: {
                  color: "#FFFFFF !important",
                },
              }}
              {...register("email")}
            />
            <TextField
              label="Senha"
              placeholder="Digite aqui sua senha"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              color="white"
              error={errors.password !== undefined ? true : false}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      color="white"
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
                  "&:hover": { color: "#FFFFFF" },
                  "&::placeholder": { color: "#FFFFFF" },
                },
                label: {
                  color: "#FFFFFF !important",
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
              onClick={() => setTimeout(() => history.push("/register"), 500)}
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
