import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import moment from "moment";
import MomentUtils from "@date-io/moment";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";

import { withStyles } from "@material-ui/styles";

import Autocomplete from "@material-ui/lab/Autocomplete";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import InsertInvitationOutlinedIcon from "@material-ui/icons/InsertInvitationOutlined";

import { createEvent, updateEvent } from "../actions";

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
    marginBottom: 40,
    backgroundColor: "#f50057"
  },
  form: {
    marginTop: 1
  },
  autocomplete: {
    width: "100%",
    marginTop: 20
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
  constructor(props) {
    super(props);

    const { date, title, description, place } = this.props;

    this.state = {
      mode: "create",
      title: title,
      place: place,
      attendees: [], //TODO,
      description: description,
      date: date ? moment(date) : null // Should move date to redux
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.setSelectedDate = this.setSelectedDate.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAttendeesList = this.handleAttendeesList.bind(this);
  }

  setSelectedDate(date) {
    this.setState({ date });
  }

  handleInputChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleAttendeesList(attendees) {
    this.setState({ attendees });
  }

  async handleSubmit() {
    const { title, description, place, date, attendees, mode } = this.state;
    const { dispatch } = this.props;

    const params = {
      title,
      description,
      place,
      date: new Date(date),
      attendees
    };

    let response;
    if (mode === "create") {
      response = await dispatch(createEvent(params));
    } else {
      response = await dispatch(updateEvent(params));
    }

    console.log(response);
  }

  render() {
    const { classes, users } = this.props;
    const { date, title, description, attendees, place } = this.state;
    return (
      <Container component="main" maxWidth="sm">
        <Paper className={classes.paper} elevation={3}>
          <form className={classes.container} noValidate>
            <Avatar className={classes.avatar}>
              <InsertInvitationOutlinedIcon />
            </Avatar>
            <MuiPickersUtilsProvider utils={MomentUtils} locale="gr">
              <Grid container justify="space-around">
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="Date"
                  format="DD/MM/YYYY"
                  value={date}
                  onAccept={this.setSelectedDate}
                  onChange={() => {}}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                />
                <KeyboardTimePicker
                  margin="normal"
                  id="time-picker"
                  label="Time"
                  value={date}
                  onAccept={this.setSelectedDate}
                  onChange={() => {}}
                  KeyboardButtonProps={{
                    "aria-label": "change time"
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="title"
              label="Title"
              name="title"
              value={title}
              onChange={this.handleInputChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="description"
              label="Description"
              id="Description"
              value={description}
              onChange={this.handleInputChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="place"
              label="Place"
              id="place"
              value={place}
              onChange={this.handleInputChange}
            />
            <Autocomplete
              multiple
              id="tags-outlined"
              options={users}
              getOptionLabel={option => option.title}
              defaultValue={attendees}
              value={attendees}
              className={classes.autocomplete}
              onChange={(ev, val) => this.handleAttendeesList(val)}
              renderInput={params => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Attendees"
                  placeholder="users"
                  fullWidth
                />
              )}
            />
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
          </form>
        </Paper>
      </Container>
    );
  }
}

Schedule.defaultProps = {
  title: "",
  place: "",
  description: "",
  date: moment(),
  attendees: [],
  users: []
};

Schedule.propTypes = {
  isLoggingOut: PropTypes.bool.isRequired,
  logoutError: PropTypes.bool.isRequired,
  title: PropTypes.string,
  place: PropTypes.string,
  description: PropTypes.string,
  date: PropTypes.instanceOf(moment),
  attendees: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string
    })
  ),
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string
    })
  )
};

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    event: state.api.event,
    isCreating: state.api.isCreating,
    isUpdating: state.api.isUpdating,
    createError: state.api.createError,
    updateError: state.api.updateError,
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError
  };
}
export default withStyles(styles)(connect(mapStateToProps)(Schedule));
