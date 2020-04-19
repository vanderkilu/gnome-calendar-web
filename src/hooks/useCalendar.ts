import moment from "moment";
export interface ITask {
  name?: string;
  duration?: string;
  startTime?: string;
}

interface IEvent {
  task: ITask;
  date: string;
}

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
  const formattedDays = days.map(day => {
    const dateStr = dayDate(day);
    const event = events.find(event => event.date === dateStr);
    return {
      day: day,
      passed: day === 0,
      event,
      dateStr
    };
  });
  const todayDate = parseInt(date.format("D"));

  return { formattedDays, todayDate };
}
