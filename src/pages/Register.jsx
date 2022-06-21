import {
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
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

function Register({ isLogged, setIsLogged }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  isLogged && <Redirect to="/dashboard" />;

  const handleClickShowPasswordConfirm = () =>
    setShowPasswordConfirm(!showPasswordConfirm);
  const handleMouseDownPasswordConfirm = () =>
    setShowPasswordConfirm(!showPasswordConfirm);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const baseUrl = "https://kenziehub.herokuapp.com";
  const history = useHistory();

  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Campo obrigatório")
      .min(3, "Seu nome deve possuir no mínimo 3 caracteres")
      .max(60, "Seu nome deve possuir no máximo 60 caracteres")
      .matches(/^[a-zA-Z\s]*$/, "Seu nome deve haver apenas letras"),
    email: yup
      .string()
      .required("Campo obrigatório")
      .max(40, "Email inválido")
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Email inválido"
      ),
    password: yup
      .string()
      .required("Campo obrigatório")
      .min(6, "Mínimo de 6 caracteres"),
    passwordConfirm: yup
      .string()
      .required("Campo obrigatório")
      .oneOf([yup.ref("password"), null], "As senhas não coincidem"),
    bio: yup.string().max(120, "Máximo de 120 caracteres").required(),
    contact: yup.string().max(50, "Tente um contato menor"),
    course_module: yup
      .string()
      .matches(/^((?!default).)*$/s, "Selecione um módulo"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmitData = (data) => {
    delete data.passwordConfirm;
    const response = axios
      .post(`${baseUrl}/users`, data)
      .then(() => {
        toast.success("Cadastro bem sucedido! Redirecionando para o login...");
        setTimeout(() => history.push("/"), 3000);
      })
      .catch((err) => {
        err.response.data.message === "Email already exists"
          ? toast.error("Email já existente")
          : toast.error("Dados inválidos, verifique os campos");
      });
    return response;
  };

  const handleToast = (message) => {
    toast.error(message);
    toast.clearWaitingQueue();
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
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            width: {
              xs: "70%",
            },
            maxWidth: "270px",
          }}
          alignItems="center"
        >
          <Typography variant="h6" component="div" color="primary.main">
            Kenzie Hub
          </Typography>
          <Button
            size="small"
            sx={{
              padding: ".8rem 1.8rem",
              color: "secondary.contrastText",
              bgcolor: "background.paper",
              "&:hover": { backgroundColor: "background.paper" },
            }}
            onClick={() => setTimeout(() => history.push("/"), 500)}
          >
            Voltar
          </Button>
        </Stack>
        <Paper
          sx={{
            backgroundColor: "background.paper",
            justifyContent: "center",
            alignItems: "center",
            direction: "column",
            borderRadius: "5px",
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
            <Typography color="secondary.contrastText" variant="body2">
              Crie sua conta
            </Typography>

            <Typography color="secondary.light" variant="caption">
              Rápido e grátis, vamos nessa
            </Typography>

            <TextField
              label="Nome"
              placeholder="Digite aqui seu nome"
              variant="outlined"
              color="white"
              helperText={errors.name?.message}
              error={errors.name !== undefined ? true : false}
              sx={{
                backgroundColor: "secondary.main",
                borderRadius: "5px",
                width: "80%",
                input: {
                  color: "#FFFFFF !important",
                  "&hover:": { color: "#FFFFFF !important" },
                  "&::placeholder": { color: "#FFFFFF !important" },
                },
                label: {
                  color: "#FFFFFF !important",
                },
              }}
              {...register("name")}
            />

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
                  "&hover:": { color: "#FFFFFF" },
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
                  "&hover:": { color: "#FFFFFF" },
                  "&::placeholder": { color: "#FFFFFF" },
                },
                label: {
                  color: "#FFFFFF !important",
                },
              }}
              {...register("password")}
            />

            <TextField
              label="Confirmar Senha"
              placeholder="Confirme sua senha"
              variant="outlined"
              type={showPasswordConfirm ? "text" : "password"}
              error={errors.passwordConfirm !== undefined ? true : false}
              color="white"
              helperText={errors.passwordConfirm?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      color="white"
                      onClick={handleClickShowPasswordConfirm}
                      onMouseDown={handleMouseDownPasswordConfirm}
                    >
                      {showPasswordConfirm ? (
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
                  "&hover:": { color: "#FFFFFF" },
                  "&::placeholder": { color: "#FFFFFF" },
                },
                label: {
                  color: "#FFFFFF !important",
                },
              }}
              {...register("passwordConfirm")}
            />

            <TextField
              label="Bio"
              placeholder="Fale sobre você"
              variant="outlined"
              error={errors.bio !== undefined ? true : false}
              color="white"
              sx={{
                backgroundColor: "secondary.main",
                borderRadius: "5px",
                width: "80%",
                input: {
                  color: "#FFFFFF",
                  "&hover:": { color: "#FFFFFF" },
                  "&::placeholder": { color: "#FFFFFF" },
                },
                label: {
                  color: "#FFFFFF !important",
                },
              }}
              {...register("bio")}
            />

            <TextField
              label="Contato"
              placeholder="Opção de contato"
              variant="outlined"
              color="white"
              sx={{
                backgroundColor: "secondary.main",
                borderRadius: "5px",
                width: "80%",
                input: {
                  color: "#FFFFFF",
                  "&hover:": { color: "#FFFFFF" },
                  "&::placeholder": { color: "#FFFFFF" },
                },
                label: {
                  color: "#FFFFFF !important",
                },
              }}
              {...register("contact")}
            />

            <Select
              defaultValue="default"
              variant="outlined"
              color="white"
              error={errors.course_module !== undefined ? true : false}
              sx={{
                backgroundColor: "secondary.main",
                borderRadius: "5px",
                width: "80%",
                color: "#FFFFFF !important",
              }}
              {...register("course_module")}
            >
              <MenuItem
                sx={{
                  fontSize: "13px",
                  color: "#FFFFFF",
                }}
                value="default"
                selected
                disabled
              >
                Selecione o módulo
              </MenuItem>
              <MenuItem
                sx={{
                  fontSize: "13px",
                  color: "#FFFFFF",
                }}
                value="Primeiro módulo (Introdução ao Frontend)"
              >
                Primeiro módulo (Introdução ao Frontend)
              </MenuItem>
              <MenuItem
                sx={{
                  fontSize: "13px",
                  color: "#FFFFFF",
                }}
                value="Segundo módulo (Frontend Avançado)"
              >
                Segundo módulo (Frontend Avançado)
              </MenuItem>
              <MenuItem
                sx={{
                  fontSize: "13px",
                  color: "#FFFFFF",
                }}
                value="Terceiro módulo (Introdução ao Backend)"
              >
                Terceiro módulo (Introdução ao Backend)
              </MenuItem>
              <MenuItem
                sx={{
                  fontSize: "13px",
                  color: "#FFFFFF",
                }}
                value="Quarto módulo (Backend Avançado)"
              >
                Quarto módulo (Backend Avançado)
              </MenuItem>
            </Select>
            {errors.course_module?.message &&
              handleToast(errors.course_module.message)}
            <Button
              type="submit"
              color="primary"
              sx={{
                padding: ".6rem",
                width: "80%",
                color: "secondary.contrastText",
                backgroundColor: "primary.dark",
                "&:hover": { backgroundColor: "primary.main" },
              }}
            >
              Enviar
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </>
  );
}

export default Register;
