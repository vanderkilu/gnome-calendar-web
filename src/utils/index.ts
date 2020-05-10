import moment from "moment";

export const ID = () => {
  return (
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};

const generateMonthDays = (date: moment.Moment) => {
  const firstDayOfMonth = (): number => {
    const day = moment(date)
      .startOf("month")
      .format("d");
    return parseInt(day);
  };
  const daysInMonth = (): number[] => {
    const daysCount = moment(date).daysInMonth();
    return Array.from(Array(daysCount), (_, i) => i + 1);
  };
  const dayStart = firstDayOfMonth();
  const days = [...Array<number>(dayStart).fill(0), ...daysInMonth()];
  const dayDate = (day: number) => {
    return moment(date)
      .set("date", day)
      .toString();
  };
  const currentDay = parseInt(date.format("D"));
  const currentMonth = moment().format("MMM");
  return { days, dayDate, currentDay, currentMonth };
};

const monthString = (index: number) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "November",
    "Decemeber"
  ];
  return months[index];
};

const yearRange = (start: string, end: string) => {
  let startDate = moment(start);
  const endDate = moment(end);
  let nextYears: string[] = [];
  while (startDate < endDate) {
    nextYears = [
      ...nextYears,
      moment(startDate)
        .format("YYYY")
        .toString()
    ];
    startDate = moment(startDate).add("year", 1);
  }
  return nextYears;
};

const nextTen = moment()
  .set("year", 2020) // 2020 represent current year
  .add("year", 12)
  .format("Y");

export const nextYears = yearRange("2020", nextTen);

export const generateDates = (date: moment.Moment) => {
  return Array.from(Array(11).keys()).map(index => {
    //set the date to reflect next month
    // generate all days for the month
    date = moment(date).set("month", index);
    const { days, dayDate, currentDay, currentMonth } = generateMonthDays(date);
    return {
      month: monthString(index),
      days,
      dayDate,
      currentDay,
      currentMonth
    };
  });
};
