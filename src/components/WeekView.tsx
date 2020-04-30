import React, { useRef } from "react";
import styled from "styled-components";
import { ICell, IPosition } from "../types";

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

const StyledWeekCellText = styled.p`
  position: absolute;
  right: 1rem;
  top: 0.2rem;
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
`;
const StyledSidebarContainer = styled.div``;

interface HeaderProps {
  weekDays: string[];
}

const times = Array(24)
  .fill(0)
  .map(index => (index < 10 ? `0${index}:00` : `${index}:00`));

interface WeekCellProps {
  eventItem: ICell;
  onClick: (date: string, position?: IPosition) => void;
  onCellEventClick: (id: string) => void;
}
type ChangeEventType = React.MouseEvent<HTMLDivElement, MouseEvent>;

const WeekCell: React.FC<WeekCellProps> = ({
  onClick,
  eventItem,
  onCellEventClick
}) => {
  const { day, dateStr, events } = eventItem;
  const event = events[0];
  const cellRef = useRef<HTMLDivElement>(null);
  const handleClick = (dateStr: string) => {
    const position = cellRef.current && cellRef.current.getBoundingClientRect();
    if (position) onClick(dateStr, position);
    else onClick(dateStr);
  };
  return (
    <>
      <StyledWeekCell onClick={(e: ChangeEventType) => handleClick(dateStr)}>
        {event && event.task && (
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

const WeekView: React.FC<HeaderProps> = ({ weekDays, children }) => {
  return (
    <>
      <StyledWeekContainer>
        {weekDays.map((weekName, i) => (
          <StyledHeaderElement>
            <StyledText>{weekName}</StyledText>
          </StyledHeaderElement>
        ))}
      </StyledWeekContainer>
      {/* <StyledSidebarContainer>
        {times.map(time => (
          <StyledText>{time}</StyledText>
        ))}
      </StyledSidebarContainer> */}
      <StyledWeekContainer>{children}</StyledWeekContainer>
    </>
  );
};

export default WeekView;
