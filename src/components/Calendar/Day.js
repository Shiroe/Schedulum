import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import moment from "moment";
import { withStyles } from "@material-ui/styles";

import { Typography, Card, CardContent } from "@material-ui/core";

const styles = () => ({
  card: {
    minWidth: 100,
    border: 0,
    "&:hover": {
      backgroundColor: "#eee",
      cursor: "pointer"
    },
    padding: 0
  },
  title: {
    fontSize: 18
  },
  pos: {
    marginBottom: 12
  }
});

function Day({ classes, date, events, isCurrentMonth }) {
  return (
    <React.Fragment>
      <Card className={classes.card} variant="outlined">
        <CardContent style={{ padding: 10, height: "110px" }}>
          <Typography
            variant="h5"
            component="h2"
            className={classes.title}
            color={isCurrentMonth ? "textPrimary" : "textSecondary"}
          >
            {date.format("D")}
          </Typography>
          <Typography
            variant="body2"
            component="p"
            color="textSecondary"
            style={{ marginTop: 10 }}
          >
            {events.map(ev => {
              return <Typography>{ev.title}</Typography>;
            })}
          </Typography>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}

Day.defaultTypes = {
  events: []
};

Day.propTypes = {
  isCurrentMonth: PropTypes.bool.isRequired,
  events: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      place: PropTypes.string,
      date: PropTypes.instanceOf(moment()),
      description: PropTypes.string,
      attendees: PropTypes.arrayOf(PropTypes.string)
    })
  )
};

function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError
  };
}
export default withStyles(styles)(connect(mapStateToProps)(Day));
