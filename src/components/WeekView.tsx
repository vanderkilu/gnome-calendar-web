import React from "react";
import styled from "styled-components";
import Cell from "./CalendarCell";

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
  border: 1px solid #b8bac3;
  height: 10rem;
  font-size: 1.5rem;
`;
const StyledSidebarContainer = styled.div``;

interface HeaderProps {
  weekDays: string[];
  days: number[];
}

const times = Array(24)
  .fill(0)
  .map(index => (index < 10 ? `0${index}:00` : `${index}:00`));

console.log("times", times);

const WeekView: React.FC<HeaderProps> = ({ weekDays, days }) => {
  return (
    <>
      <StyledWeekContainer>
        {weekDays.map((weekName, i) => (
          <StyledHeaderElement>
            <StyledText>{weekName}</StyledText>
            <StyledText>{days[i]}</StyledText>
          </StyledHeaderElement>
        ))}
      </StyledWeekContainer>
      <StyledWeekContainer>
        {times.map(_ => weekDays.map(_ => <StyledWeekCell>12</StyledWeekCell>))}
      </StyledWeekContainer>
    </>
  );
};

export default WeekView;
