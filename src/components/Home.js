import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";

const styles = () => ({
  "@global": {
    body: {
      backgroundColor: "#fff"
    }
  },
  paper: {
    marginTop: 20,
    display: "flex",
    padding: 20,
    flexDirection: "column",
    alignItems: "center",
    height: "90vh"
  }
});

class Home extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xl">
        <Paper className={classes.paper} elevation={3}></Paper>
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
