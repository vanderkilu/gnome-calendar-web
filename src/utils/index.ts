import moment from "moment";

export const ID = () => {
  return (
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};

let date: moment.Moment;

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
  return { days, dayDate };
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

export const generateDates = () => {
  Array.from(Array(10).keys()).map(index => {
    //set the date to reflect next month
    // generate all days for the month
    moment(date).set("month", index);
    const { days, dayDate } = generateMonthDays(date);
    return {
      month: monthString(index),
      days,
      dayDate
    };
  });
};
