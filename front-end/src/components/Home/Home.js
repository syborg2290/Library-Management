import React from "react";
import {
  Grow,
  Grid,
} from "@material-ui/core";
import useStyles from "./styles";


function Home() {
  const classes = useStyles();
  return (
    <Grow in>
      <Grid
        container
        justify="space-between"
        alignItems="stretch"
        spacing={3}
        className={classes.gridContainer}
      >
        <Grid item xs={12} sm={6} md={9}>
         <h1>Book data here</h1>
        </Grid>
      </Grid>
    </Grow>
  );
}

export default Home;
