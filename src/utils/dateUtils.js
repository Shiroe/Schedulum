import moment from "moment";

export function weekDays(month, year) {
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
