export const calendarStyles = () => ({
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

export const calendarDayStyles = () => ({
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
