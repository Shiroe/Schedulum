import React from "react";
import { connect } from "react-redux";

import moment from "moment";
import { withStyles } from "@material-ui/styles";

import {
  GridList,
  GridListTile,
  GridListTileBar,
  ListSubheader,
  IconButton,
  Paper,
  Typography
} from "@material-ui/core";

import InfoIcon from "@material-ui/icons/Info";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: "#ccc"
  },
  gridList: {
    width: "100%",
    height: "auto"
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  },
  tile: {
    padding: "5px !important",
    border: "1px solid #eee",
    backgroundColor: "#fff"
  },
  header: {
    height: "100px",
    display: "flex",
    justifyContent: "space-between"
  }
});

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

function weekDays(month, year) {
  const endDate = moment()
    .date(0)
    .month(month)
    .year(year);

  return Array(endDate.date())
    .fill(0)
    .map((_, i) =>
      moment()
        .date(i + 1)
        .month(month)
        .year(year)
    )
    .map(day => ({ day, week: day.week() }))
    .filter(
      ({ week }, i, arr) => arr.findIndex(info => info.week === week) === i
    )
    .map(({ day, week }) => ({
      week,
      days: Array(7)
        .fill(0)
        .map((_, i) =>
          moment(day)
            .week(week)
            .startOf("week")
            .add(i, "day")
        )
    }));
}

class Calendar extends React.Component {
  constructor() {
    super();

    window.moment = moment;
  }
  calendar() {
    const weeks = weekDays(moment().month(), moment().year());
    const days = [
      ...weeks[0].days,
      ...weeks[1].days,
      ...weeks[2].days,
      ...weeks[3].days,
      ...weeks[4].days
    ];
    console.log(days);
    return days;
  }

  render() {
    const { classes } = this.props;
    const days = this.calendar();

    return (
      <React.Fragment>
        <div className={classes.header}>
          <Typography>January</Typography>
        </div>
        <GridList cellHeight={180} cols={7} className={classes.gridList}>
          {days.map(d => (
            <Paper
              key={d.dayOfYear()}
              className={classes.tile}
              component="div"
              elevation={2}
            >
              <Typography>{d.format("D")}</Typography>
              <Typography>{d.format("dddd")}</Typography>
              {/* <GridListTileBar title={d.format("dddd")} /> */}
            </Paper>
          ))}
        </GridList>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError
  };
}
export default withStyles(styles)(connect(mapStateToProps)(Calendar));
