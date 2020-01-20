import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";

import Calendar from "./Calendar/index";

const styles = () => ({
  "@global": {
    body: {
      backgroundColor: "#fff"
    }
  },
  paper: {
    marginTop: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "88vh"
  }
});

class Home extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xl">
        <Paper className={classes.paper} elevation={4}>
          <Calendar />
        </Paper>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError
  };
}
export default withStyles(styles)(connect(mapStateToProps)(Home));
