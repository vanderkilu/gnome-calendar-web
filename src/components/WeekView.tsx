import React, { useRef } from "react";
import styled from "styled-components";
import { ICell, IPosition } from "../types";
import { ID } from "../utils";

const StyledHeaderElement = styled.div`
  border: 1px solid #f3f4f9;
  border-top: none;
  border-bottom: none;
`;
const StyledText = styled.h3`
  font-size: 1.5rem;
  color: #b8bac3;
`;
const StyledWeekContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;
const StyledWeekCell = styled.div`
  height: 10rem;
  position: relative;
  background-color: "transparent";
  border: 1px solid #f3f4f9;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  padding-top: 0.5rem;
`;

const StyledWeekCellText = styled.p`
  font-size: 1.7rem;
  color: "#b8bac3";
`;

const StyledWeekCellEvent = styled.div`
  padding: 0.5rem;
  border-radius: 2px;
  background-color: #e8f5e9;
  font-size: 1rem;
  color: #81c784;
  margin-bottom: 0.5rem;
  cursor: pointer;
  height: 100%;
  width: 100%;
`;
const StyledSidebarContainer = styled.div``;

interface HeaderProps {
  weekDays: string[];
  events: ICell[];
  onCellEventClick: (id: string) => void;
  onClick: (date: string, weekRow: number, position?: IPosition) => void;
}

const times = Array(24)
  .fill(0)
  .map(index => (index < 10 ? `0${index}:00` : `${index}:00`));

interface WeekCellProps {
  eventItem: ICell;
  onClick: (date: string, weekRow: number, position?: IPosition) => void;
  onCellEventClick: (id: string) => void;
  weekRow: number;
}
type ChangeEventType = React.MouseEvent<HTMLDivElement, MouseEvent>;

const WeekCell: React.FC<WeekCellProps> = ({
  onClick,
  eventItem,
  onCellEventClick,
  weekRow
}) => {
  const { day, dateStr, events } = eventItem;
  const event = events[0];
  const cellRef = useRef<HTMLDivElement>(null);
  const handleClick = (dateStr: string) => {
    const position = cellRef.current && cellRef.current.getBoundingClientRect();
    if (position) onClick(dateStr, weekRow, position);
    else onClick(dateStr, weekRow);
  };
  return (
    <>
      <StyledWeekCell
        onClick={(e: ChangeEventType) => handleClick(dateStr)}
        ref={cellRef}
      >
        {event && event.task && event.weekRow === weekRow && (
          <StyledWeekCellEvent
            onClick={(e: ChangeEventType) => onCellEventClick(event.id)}
          >
            <StyledWeekCellText>{event.task.name}</StyledWeekCellText>
          </StyledWeekCellEvent>
        )}
      </StyledWeekCell>
    </>
  );
};

const WeekView: React.FC<HeaderProps> = ({
  weekDays,
  events,
  onCellEventClick,
  onClick
}) => {
  return (
    <>
      <StyledWeekContainer>
        {weekDays.map((weekName, i) => (
          <StyledHeaderElement>
            <StyledText>{weekName}</StyledText>
            <StyledText>{events[i].day}</StyledText>
          </StyledHeaderElement>
        ))}
      </StyledWeekContainer>
      <StyledWeekContainer>
        {times.map((_, i) =>
          events.map(eventItem => (
            <WeekCell
              key={ID()}
              eventItem={eventItem}
              onCellEventClick={onCellEventClick}
              onClick={onClick}
              weekRow={i}
            />
          ))
        )}
      </StyledWeekContainer>
    </>
  );
};

export default WeekView;
