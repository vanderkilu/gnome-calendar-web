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
  height: 5rem;
  background-color: "transparent";
  border: 1px solid #f3f4f9;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0.2rem;
  overflow: hidden;
`;

const StyledWeekCellText = styled.p`
  font-size: 1.2rem;
  color: "#b8bac3";
`;

const StyledWeekCellEvent = styled.div`
  padding: 0.5rem;
  border-radius: 2px;
  background-color: #e8f5e9;
  color: #81c784;
  cursor: pointer;
  height: 100%;
  margin-right: 0.1rem;
  flex: 1;
`;
const StyledSidebarContainer = styled.div``;
type DragEventType = React.DragEvent<HTMLDivElement>;

interface HeaderProps {
  weekDays: string[];
  events: ICell[];
  onCellEventClick: (id: string) => void;
  onClick: (date: string, weekRow: number, position?: IPosition) => void;
  onDragStart: (e: DragEventType, id: string) => void;
  onDrop: (e: DragEventType, dateStr: string, weekRow: number) => void;
  onDragOver: (e: DragEventType) => void;
}

const times = Array(24)
  .fill(0)
  .map(index => (index < 10 ? `0${index}:00` : `${index}:00`));

interface WeekCellProps {
  eventItem: ICell;
  onClick: (date: string, weekRow: number, position?: IPosition) => void;
  onCellEventClick: (id: string) => void;
  weekRow: number;
  onDragStart: (e: DragEventType, id: string) => void;
  onDrop: (e: DragEventType, dateStr: string, weekRow: number) => void;
  onDragOver: (e: DragEventType) => void;
}
type ChangeEventType = React.MouseEvent<HTMLDivElement, MouseEvent>;

const WeekCell: React.FC<WeekCellProps> = ({
  onClick,
  eventItem,
  onCellEventClick,
  weekRow,
  onDragOver,
  onDragStart,
  onDrop
}) => {
  const { dateStr, events } = eventItem;
  const cellRef = useRef<HTMLDivElement>(null);
  const handleClick = (dateStr: string) => {
    const position = cellRef.current && cellRef.current.getBoundingClientRect();
    if (position) onClick(dateStr, weekRow, position);
    else onClick(dateStr, weekRow);
  };
  const handleOnCellEventClick = (e: ChangeEventType, id: string) => {
    e.stopPropagation();
    onCellEventClick(id);
  };
  return (
    <>
      <StyledWeekCell
        onClick={() => handleClick(dateStr)}
        onDrop={(e: DragEventType) => onDrop(e, dateStr, weekRow)}
        onDragOver={(e: DragEventType) => onDragOver(e)}
        ref={cellRef}
      >
        {events.length > 0 &&
          events.map(
            event =>
              event.weekRow === weekRow && (
                <StyledWeekCellEvent
                  key={event.id}
                  draggable="true"
                  onDragStart={(e: DragEventType) => onDragStart(e, event.id)}
                  onClick={(e: ChangeEventType) =>
                    handleOnCellEventClick(e, event.id)
                  }
                >
                  <StyledWeekCellText>
                    {event.task && event.task.name}
                  </StyledWeekCellText>
                </StyledWeekCellEvent>
              )
          )}
      </StyledWeekCell>
    </>
  );
};

const WeekView: React.FC<HeaderProps> = ({
  weekDays,
  events,
  onCellEventClick,
  onClick,
  onDragOver,
  onDragStart,
  onDrop
}) => {
  return (
    <>
      <StyledWeekContainer>
        {weekDays.map((weekName, i) => (
          <StyledHeaderElement key={i}>
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
              onDragOver={onDragOver}
              onDragStart={onDragStart}
              onDrop={onDrop}
            />
          ))
        )}
      </StyledWeekContainer>
    </>
  );
};

export default WeekView;
