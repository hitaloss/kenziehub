import { Divider, Grid, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function Item({ technology, level, deleteTechnology, id }) {
  return (
    <>
      <Divider
        flexItem
        sx={{
          borderColor: "background.paper",
          borderBottomWidth: 7,
        }}
      />
      <Grid
        item
        display="flex"
        alignItems="center"
        sx={{
          bgcolor: "secondary.dark",
          color: "secondary.contrastText",
          borderRadius: "7px",
          padding: {
            xs: ".5rem",
            sm: "1rem",
            md: "1rem",
          },
        }}
      >
        <Typography
          sx={{
            fontSize: {
              xs: ".7rem",
              sm: "1rem",
            },
          }}
          flexGrow={1}
        >
          {technology}
        </Typography>
        <Typography
          sx={{
            fontSize: {
              xs: "0.45rem",
              sm: "0.75rem",
            },
          }}
          variant="caption"
          color="secondary.light"
        >
          {level}
        </Typography>
        <IconButton onClick={() => deleteTechnology(id)} color="white">
          <DeleteIcon
            sx={{
              fontSize: {
                xs: "1.2rem",
                sm: "1.7rem",
              },
            }}
          />
        </IconButton>
      </Grid>
      <Divider
        flexItem
        sx={{
          borderColor: "background.paper",
          borderBottomWidth: 7,
        }}
      />
    </>
  );
}

export default Item;
