import React from "react";
import { connect } from "react-redux";

import moment from "moment";
import { withStyles } from "@material-ui/styles";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@material-ui/core";

import Day from "./Day";

const styles = () => ({
  root: {
    width: "100%"
  },
  container: {
    maxHeight: "100%"
  },
  gridListHeader: {
    width: "100%",
    height: "130px"
  },
  gridList: {
    width: "100%",
    height: "auto",
    flexGrow: 1
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
  },
  item: {
    height: "150px",
    padding: 0
  }
});

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

const columns = [
  { id: "monday", label: "Monday", align: "center" },
  { id: "tuesday", label: "Tuesday", align: "center" },
  { id: "wednesday", label: "Wednesday", align: "center" },
  { id: "thursday", label: "Thursday", align: "center" },
  { id: "friday", label: "Friday", align: "center" },
  { id: "saturday", label: "Saturday", align: "center" },
  { id: "sunday", label: "Sunday", align: "center" }
];

const events = [
  {
    title: "Test event",
    place: "Room1",
    date: moment("2020-01-15"),
    description: "Test sample description",
    attendees: ["John S.", "Smith J."]
  },
  {
    title: "Test event",
    place: "Room1",
    date: moment(),
    description: "Test sample description",
    attendees: ["John S.", "Smith J."]
  },
  {
    title: "Test event",
    place: "Room1",
    date: moment(),
    description: "Test sample description",
    attendees: ["John S.", "Smith J."]
  },
  {
    title: "Test event",
    place: "Room1",
    date: moment(),
    description: "Test sample description",
    attendees: ["John S.", "Smith J."]
  },
  {
    title: "Test event",
    place: "Room1",
    date: moment(),
    description: "Test sample description",
    attendees: ["John S.", "Smith J."]
  }
];

class Calendar extends React.Component {
  constructor() {
    super();

    window.moment = moment;

    this.state = {
      page: 0,
      rowsPerPage: 5
    };

    this.handleChangePage = this.handleChangePage.bind(this);
  }

  handleChangePage(ev, page) {
    this.setState({ page });
  }

  calendar() {
    const weeks = weekDays(moment().month(), moment().year());
    return weeks;
  }

  render() {
    const { classes } = this.props;
    const { page, rowsPerPage } = this.state;
    const weeks = this.calendar();

    return (
      <React.Fragment>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {weeks
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(week => {
                  return (
                    <TableRow role="checkbox" tabIndex={-1} key={week.week}>
                      {week.days.map(day => {
                        return (
                          <TableCell
                            key={day.dayOfYear()}
                            align={day.align}
                            className={classes.item}
                          >
                            <Day
                              key={day.dayOfYear()}
                              date={day}
                              events={[]}
                              isCurrentMonth={day.month() === moment().month()}
                            />
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
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
