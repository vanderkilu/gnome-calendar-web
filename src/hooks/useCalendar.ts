import moment from "moment";
import { IEvent } from "../types";

export default function(date: moment.Moment, events: IEvent[]) {
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
  const formatDays = (days: number[]) =>
    days.map(day => {
      const dateStr = dayDate(day);
      const cellEvents = events.filter(event => event.date === dateStr);
      return {
        day: day,
        passed: day === 0,
        events: cellEvents,
        dateStr
      };
    });
  const rawDays = daysInMonth();

  const generateWeeks = () => {
    let weeks: number[][] = [];
    let tdays: number[] = [];
    rawDays.forEach((day, i) => {
      if ((i + 1) % 7 !== 0) tdays = [...tdays, day];
      else {
        tdays = [...tdays, day];
        weeks = [...weeks, tdays];
        tdays = [];
      }
    });
    return weeks;
  };

  const weeksEvents = generateWeeks();
  const formattedDays = formatDays(days);
  const formattedWeeks = weeksEvents.map(weekArr => formatDays(weekArr));

  const todayDate = parseInt(date.format("D"));

  return { formattedDays, todayDate, formattedWeeks };
}
