import React, { Component } from "react";
import { connect } from "react-redux";
import { db } from "../firebase/firebase";
import { withStyles } from "@material-ui/styles";

import moment from "moment";
import { weekDays } from "../utils/dateUtils";

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
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidUpdate() {
    this.getEvents();
  }

  getEvents() {
    console.log("Called!");
    const { user } = this.props;
    const weeks = weekDays(moment().month(), moment().year());
    const startDate = weeks[0].days[0];

    // Since we always display 35 days (5 rows with 7 days each to cover the
    // maximum days of a month which is 31 in sets of 7) we know the last day
    // resides always in 5th row (number 4 index on the array of weeks) and
    // the 7th column (number 6 index on the array of days) => weeks[4].days[6]
    const endDate = weeks[4].days[6];

    db.collection("events")
      .where("creatorId", "==", user.uid)
      .orderBy("date")
      .startAt(new Date(startDate))
      .endAt(new Date(endDate))
      .get()
      .then(snap => {
        if (snap) {
          console.log(snap.docs.map(d => d.data()));
        } else {
          console.log("No docs!");
        }
        // dispatch(receiveEvents(snap ? snap.docs.map(d => d.data()) : []))
      })
      .catch(error => console.log(error));
  }

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
    user: state.auth.user,
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError
  };
}
export default withStyles(styles)(connect(mapStateToProps)(Home));
