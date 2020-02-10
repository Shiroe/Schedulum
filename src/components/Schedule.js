import React, { Component } from "react";
import { connect } from "react-redux";
import { db, myFirebase } from "../firebase/firebase";
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

    const { date, title, description, place, users, user } = this.props;

    this.state = {
      title: title,
      place: place,
      attendees: [], //users.find(u => u.id === user.id),
      description: description,
      date: date ? moment(date) : null
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
    const { title, description, place, date, attendees } = this.state;
    const { user } = this.props;
    // console.log(title, description, place, date.toLocaleString(), attendees);
    const startDate = moment("10/01/2020", "DD/MM/YYYY");
    const endDate = moment().endOf("month");
    console.log(
      "asd: ",
      user.uid,
      " sd:",
      startDate.format("DD/MM/YYYY"),
      " ed:",
      endDate.format("DD/MM/YYYY")
    );
    const params = {
      title,
      description,
      place,
      date: new Date(date),
      attendees
    };

    if (title && description && place && date) {
      db.collection("events")
        .add({
          title,
          description,
          place,
          date: new Date(date),
          attendees
        })
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    }

    console.log("After query");
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
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError
  };
}
export default withStyles(styles)(connect(mapStateToProps)(Schedule));
