import React from "react";
import { AppBar, Toolbar, CssBaseline, makeStyles, Button } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  nav: {
    backgroundColor: "#4848a3",
    display: "flex",
  },
 logo: {
    color: "#fff",
    textDecoration: "none",
  },
  btn: {
    marginLeft: "auto",
  },
  link: {
    color: "white",
    fontSize: "auto",
    "&:hover": {
      backgroundColor: "transparent",
      color: "yellow",
    },
  },
}));

function Navbar() {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar className={classes.nav}>
        <a className={classes.logo} href='/'><h2>Area</h2></a>
          <div className={classes.btn}>
            <Button className={classes.link} href='/'>Home</Button>
            <Button className={classes.link} href='/routes'>Routes</Button>
            <Button className={classes.link} href="/about">About</Button>
            <Button className={classes.link} href="/login" onClick={() => localStorage.clear()}>Logout</Button>
          </div>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;