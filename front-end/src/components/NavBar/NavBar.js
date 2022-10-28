import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Typography} from "@material-ui/core";
import useStyles from "./styles";

function NavBar() {
  const classes = useStyles();
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h2"
          align="center"
        >
          Welcome to LMS
        </Typography>
      </div>
    </AppBar>
  );
}

export default NavBar;
