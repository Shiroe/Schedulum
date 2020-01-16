import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import Schedule from "./components/Schedule";
import Login from "./components/Login";
import Nav from "./components/Nav";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

function App(props) {
  const { isAuthenticated, isVerifying } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Nav />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Home}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
            title="Calendar"
          />
          <ProtectedRoute
            exact
            path="/schedule"
            component={Schedule}
            isAuthenticated={isAuthenticated}
            isVerifying={isVerifying}
            title="Day Schedule"
          />
          <Route path="/login" component={Login} title="Login" />
        </Switch>
      </main>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying
  };
}

export default connect(mapStateToProps)(App);
