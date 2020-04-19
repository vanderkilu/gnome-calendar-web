import React, { useRef } from "react";
import styled from "styled-components";

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

export default CalendarCell;
