import React from "react";
import styled from "styled-components";
import { ICell } from "../types";

const StyledHeaderElement = styled.div`
  border: 1px solid #b8bac3;
  border-top: none;
  border-bottom: none;
`;
const StyledText = styled.h3`
  font-size: 2rem;
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

const StyledWeekCellEvent = styled.div`
  padding: 0.5rem;
  border-radius: 2px;
  background-color: #e8f5e9;
  font-size: 1rem;
  color: #81c784;
  margin-bottom: 0.5rem;
  cursor: pointer;
`;
const StyledSidebarContainer = styled.div``;

interface HeaderProps {
  weekDays: string[];
  events: ICell[];
  onClick: () => void;
  onCellEventClick: (e: ChangeEventType, id: string) => void;
}

const times = Array(24)
  .fill(0)
  .map(index => (index < 10 ? `0${index}:00` : `${index}:00`));

interface WeekCellProps {
  eventItem: ICell;
  onClick: (day: number, dateStr: string) => void;
  onCellEventClick: (e: ChangeEventType, id: string) => void;
}
type ChangeEventType = React.MouseEvent<HTMLDivElement, MouseEvent>;

const WeekCell: React.FC<WeekCellProps> = ({
  onClick,
  eventItem,
  onCellEventClick
}) => {
  const { day, dateStr, events } = eventItem;
  const event = events[0];
  return (
    <>
      <StyledWeekCell onClick={(e: ChangeEventType) => onClick(day, dateStr)}>
        <StyledWeekCellEvent
          onClick={(e: ChangeEventType) => onCellEventClick(e, event.id)}
        >
          {event && event.task.name}
        </StyledWeekCellEvent>
      </StyledWeekCell>
    </>
  );
};

const WeekView: React.FC<HeaderProps> = ({
  weekDays,
  events,
  onClick,
  onCellEventClick
}) => {
  return (
    <>
      <StyledWeekContainer>
        {weekDays.map((weekName, i) => (
          <StyledHeaderElement>
            <StyledText>{weekName}</StyledText>
          </StyledHeaderElement>
        ))}
      </StyledWeekContainer>
      <StyledWeekContainer>
        {times.map(_ =>
          events.map(eventItem => (
            <WeekCell
              onClick={onClick}
              eventItem={eventItem}
              onCellEventClick={onCellEventClick}
            />
          ))
        )}
      </StyledWeekContainer>
    </>
  );
};

export default WeekView;
