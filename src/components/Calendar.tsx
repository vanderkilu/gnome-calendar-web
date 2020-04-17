import React, { useRef } from "react";
import styled from "styled-components";
import moment from "moment";

const Header = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background-color: #f3f4f9;
  justify-items: center;
  padding: 2rem;
`;
const Day = styled.div`
  font-size: 1.5rem;
  color: #b8bac3;
`;
const CellContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;
const StyledCell = styled.div<{ isToday: boolean }>`
  height: 10rem;
  position: relative;
  background-color: ${props => (props.isToday ? "#e8f5e9" : "transparent")};
  border: 1px solid #f3f4f9;
`;
const CellText = styled.p`
  position: absolute;
  right: 1rem;
  top: 1rem;
  font-size: 1.7rem;
  color: "#b8bac3";
`;

const CalendarHeader: React.FC<{}> = () => {
  const weekDays = moment.weekdaysShort();
  return (
    <>
      <Header>
        {weekDays.map(day => (
          <Day key={day}>{day}</Day>
        ))}
      </Header>
    </>
  );
};

export interface ITask {
  name?: string;
  duration?: string;
  startTime?: string;
}

interface IEvent {
  task: ITask;
  date: string;
}

interface ICell {
  day: number;
  passed: boolean;
  dateStr: string;
  event: IEvent | undefined;
}

interface CalendarCellProps {
  days: Array<ICell>;
  today: number;
  onClick: (dayStr: string, position?: IPosition) => void;
}

const ID = () => {
  return (
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};

interface IPosition {
  top: number;
  right: number;
  left: number;
  width: number;
  bottom: number;
}

interface CellProps {
  eventItem: ICell;
  onClick: (passed: boolean, dateStr: string, position?: IPosition) => void;
  today: number;
}

const Cell: React.FC<CellProps> = ({ eventItem, today, onClick }) => {
  const { day, passed, dateStr, event } = eventItem;
  const cellRef = useRef<HTMLDivElement>(null);

  const handleClick = (passed: boolean, dateStr: string) => {
    const position = cellRef.current && cellRef.current.getBoundingClientRect();
    if (position) {
      onClick(passed, dateStr, position);
    } else {
      onClick(passed, dateStr);
    }
  };

  return (
    <StyledCell
      ref={cellRef}
      key={ID()}
      isToday={day === today}
      onClick={() => handleClick(passed, dateStr)}
    >
      {!passed && <CellText>{day}</CellText>}
      {!passed && <CellText>{event && event.task && event.task.name}</CellText>}
    </StyledCell>
  );
};

const CalendarCell: React.FC<CalendarCellProps> = ({
  days,
  today,
  onClick
}) => {
  const handleClick = (
    passed: boolean,
    dateStr: string,
    position?: IPosition
  ) => {
    if (passed) return null;
    onClick(dateStr, position);
  };

  return (
    <>
      <CellContainer>
        {days.map(eventItem => (
          <Cell
            eventItem={eventItem}
            today={today}
            onClick={handleClick}
            key={ID()}
          />
        ))}
      </CellContainer>
    </>
  );
};

interface CalendarProps {
  onClick: (date: string, position?: IPosition) => void;
  date: moment.Moment;
  events: IEvent[];
}

const Calendar: React.FC<CalendarProps> = ({ date, onClick, events }) => {
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
  const handleClick = (dayStr: string, position?: IPosition) => {
    onClick(dayStr, position);
  };

  return (
    <>
      <CalendarHeader />
      <CalendarCell
        days={formattedDays}
        today={todayDate}
        onClick={handleClick}
      />
    </>
  );
};

export default Calendar;
