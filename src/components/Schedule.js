import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../actions";

import { withStyles } from "@material-ui/styles";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";

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
    alignItems: "center"
  },
  avatar: {
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#f50057"
  },
  form: {
    marginTop: 1
  },
  errorText: {
    color: "#f50057",
    marginBottom: 5,
    textAlign: "center"
  },
  submit: {
    marginTop: 40
  }
});

class Schedule extends Component {
  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  };
  render() {
    const { classes, loginError, isAuthenticated } = this.props;
    return (
      <Container component="main" maxWidth="sm">
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <AddOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            New Event
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="title"
            label="Title"
            name="title"
            onChange={this.handleEmailChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="description"
            label="Description"
            id="Description"
            onChange={this.handlePasswordChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="place"
            label="Place"
            id="place"
            onChange={this.handlePasswordChange}
          />
          {loginError && (
            <Typography component="p" className={classes.errorText}>
              Incorrect email or password.
            </Typography>
          )}
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={this.handleSubmit}
          >
            Create
          </Button>
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
export default withStyles(styles)(connect(mapStateToProps)(Schedule));
