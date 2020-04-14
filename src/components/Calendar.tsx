import React, { useState } from "react";
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
const Cell = styled.div<{ isToday: boolean }>`
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

interface ICell {
  day: number;
  passed: boolean;
}

interface CalendarCellProps {
  days: Array<ICell>;
  today: number;
  onClick: (day: number) => void;
}

const ID = () => {
  return (
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};

const CalendarCell: React.FC<CalendarCellProps> = ({
  days,
  today,
  onClick
}) => {
  const handleClick = (passed: boolean) => {
    if (passed) return null;
    onClick(today);
  };
  return (
    <>
      <CellContainer>
        {days.map(({ day, passed }) => (
          <Cell
            key={ID()}
            isToday={day === today}
            onClick={() => handleClick(passed)}
          >
            {!passed && <CellText>{day}</CellText>}
          </Cell>
        ))}
      </CellContainer>
    </>
  );
};

interface CalendarProps {
  onClick: (day: number) => void;
  date: moment.Moment;
}

const Calendar: React.FC<CalendarProps> = ({ date, onClick }) => {
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
  const formattedDays = days.map(day => {
    return {
      day: day,
      passed: day === 0
    };
  });
  const todayDate = parseInt(date.format("D"));

  return (
    <>
      <CalendarHeader />
      <CalendarCell days={formattedDays} today={todayDate} onClick={onClick} />
    </>
  );
};

export default Calendar;
