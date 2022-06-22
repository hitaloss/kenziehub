import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Skeleton,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Redirect, useHistory } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import Item from "../components/Item";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useEffect } from "react";

function Dashboard({ isLogged, setIsLogged }) {
  const [open, setOpen] = useState(false);
  const [techs, setTechs] = useState([]);
  const history = useHistory();

  const token = localStorage.getItem("token");

  const baseUrl = "https://kenziehub.herokuapp.com";

  const techData = yup.object().shape({
    title: yup
      .string()
      .required("Valor obrigatório")
      .max(30, "Tente algo mais resumido"),
    status: yup.string().matches(/^((?!default).)*$/s, "Selecione um status"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(techData) });

  const postTechnology = (data) =>
    axios
      .post(`${baseUrl}/users/techs`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        getTechnology();
        toast.success("Tecnologia cadastrada", {
          autoClose: 2000,
        });
      })
      .catch(
        (err) =>
          err.response.data.message ===
            "User Already have this technology created you can only update it" &&
          toast.error("Tecnologia já cadastrada", {
            autoClose: 2000,
          })
      );

  const getTechnology = () =>
    axios
      .get(`${baseUrl}/users/${localStorage.getItem("user_id")}`)
      .then((res) => {
        setTechs([...res.data.techs]);
      });

  const deleteTechnology = (techId) =>
    axios
      .delete(`${baseUrl}/users/techs/${techId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        getTechnology();
        toast.info("Tecnologia deletada", {
          autoClose: 2000,
        });
      });

  useEffect(() => {
    getTechnology();
  }, []);

  if (isLogged === false) return <Redirect to="/" />;
  return (
    <>
      <Stack>
        <AppBar
          elevation={0}
          position="relative"
          sx={{
            backgroundColor: "background.default",
            padding: {
              xs: ".3rem 1rem",
              sm: "0 5rem",
              md: "0 10rem",
              lg: "0 15rem",
            },
          }}
        >
          <Toolbar>
            <Typography flexGrow={1} variant="h6" color="primary.light">
              Kenzie Hub
            </Typography>
            <Stack>
              <Button
                onClick={() => {
                  localStorage.clear();
                  toast.info("Até logo!", {
                    autoClose: 2000,
                  });
                  setTimeout(() => {
                    setIsLogged(false);
                    history.push("/");
                  }, 3000);
                }}
                size="small"
                sx={{
                  color: "secondary.contrastText",
                  backgroundColor: "background.paper",
                  "&:hover": { backgroundColor: "background.paper" },
                }}
              >
                Sair
              </Button>
            </Stack>
          </Toolbar>
        </AppBar>
        <Divider
          flexItem
          sx={{
            borderColor: "background.paper",
            borderBottomWidth: 3,
          }}
        />
        <Stack
          alignItems="center"
          direction="row"
          flexWrap="wrap"
          sx={{
            padding: {
              xs: "1rem 2rem",
              sm: "2rem 6.5rem",
              md: "2rem 11.5rem",
              lg: "2rem 16.5rem",
            },
          }}
        >
          <Typography
            flexGrow={1}
            sx={{
              textTransform: "capitalize",
            }}
            variant="h6"
            color="secondary.contrastText"
          >
            Olá, {localStorage.getItem("name")}
          </Typography>
          <Typography color="secondary.light" variant="caption">
            {localStorage.getItem("course_module")}
          </Typography>
        </Stack>
        <Divider
          flexItem
          sx={{
            borderColor: "background.paper",
            borderBottomWidth: 3,
          }}
        />
        <Stack
          spacing={4}
          sx={{
            padding: {
              xs: "1rem 2rem",
              sm: "2rem 6.5rem",
              md: "2rem 11.5rem",
              lg: "2rem 16.5rem",
            },
          }}
        >
          <Stack direction="row" alignItems="center">
            <Typography flexGrow={1} color="secondary.contrastText">
              Tecnologias
            </Typography>
            <IconButton
              onClick={() => setOpen(true)}
              sx={{
                color: "white.main",
                bgcolor: "background.paper",
                borderRadius: "30%",
                "&:hover": { bgcolor: "background.paper" },
              }}
              size="small"
            >
              <AddIcon />
            </IconButton>
          </Stack>
          <Paper
            sx={{
              backgroundColor: "secondary",
              padding: {
                xs: "1rem",
                sm: "2rem",
                md: "2rem",
              },
            }}
          >
            <Dialog
              component="form"
              onSubmit={handleSubmit(postTechnology)}
              open={open}
              onClose={() => setOpen(false)}
            >
              <DialogTitle
                variant="h6"
                sx={{
                  color: "secondary.contrastText",
                  bgcolor: "secondary.main",
                  textAlign: "center",
                  fontSize: {
                    xs: "1rem",
                    sm: "1.25rem",
                  },
                }}
              >
                Cadastrar Tecnologia
              </DialogTitle>
              <DialogContent>
                <Stack spacing={2} alignItems="center" padding={4}>
                  <TextField
                    label="Nome"
                    placeholder="Typescript"
                    variant="outlined"
                    color="white"
                    helperText={errors.title?.message}
                    error={errors.title !== undefined ? true : false}
                    sx={{
                      backgroundColor: "secondary.main",
                      borderRadius: "5px",
                      width: "100%",
                      input: {
                        color: "#FFFFFF !important",
                        "&hover:": { color: "#FFFFFF !important" },
                        "&::placeholder": { color: "#FFFFFF !important" },
                      },
                      label: {
                        color: "#FFFFFF !important",
                      },
                    }}
                    {...register("title")}
                  />
                  <Select
                    defaultValue="default"
                    variant="outlined"
                    color="white"
                    error={errors.status !== undefined ? true : false}
                    sx={{
                      backgroundColor: "secondary.main",
                      borderRadius: "5px",
                      width: "100%",
                      color: "#FFFFFF !important",
                    }}
                    {...register("status")}
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
                      Selecionar status
                    </MenuItem>
                    <MenuItem
                      sx={{
                        fontSize: "13px",
                        color: "#FFFFFF",
                      }}
                      value="Iniciante"
                    >
                      Iniciante
                    </MenuItem>
                    <MenuItem
                      sx={{
                        fontSize: "13px",
                        color: "#FFFFFF",
                      }}
                      value="Intermediário"
                    >
                      Intermediário
                    </MenuItem>
                    <MenuItem
                      sx={{
                        fontSize: "13px",
                        color: "#FFFFFF",
                      }}
                      value="Avançado"
                    >
                      Avançado
                    </MenuItem>
                  </Select>
                </Stack>
              </DialogContent>
              <DialogActions
                sx={{
                  margin: "auto",
                }}
              >
                <Button
                  onClick={() => {
                    setOpen(false);
                  }}
                  type="submit"
                  size="small"
                  sx={{
                    color: "white.main",
                    bgcolor: "primary.light",
                    marginBottom: "1.5rem",
                    p: {
                      xs: ".7rem 1.4rem",
                    },
                    "&:hover": { bgcolor: "primary.light" },
                  }}
                >
                  Cadastrar Tecnologia
                </Button>
              </DialogActions>
            </Dialog>
            {techs.length > 0 ? (
              techs.map((element) => (
                <Item
                  technology={element.title}
                  level={element.status}
                  techs={techs}
                  id={element.id}
                  deleteTechnology={deleteTechnology}
                  key={element.id}
                />
              ))
            ) : (
              <Stack spacing={3}>
                <Skeleton variant="rectangular" height="50px" />
                <Skeleton variant="rectangular" height="50px" />
                <Skeleton variant="rectangular" height="50px" />
              </Stack>
            )}
          </Paper>
        </Stack>
      </Stack>
    </>
  );
}

export default Dashboard;
