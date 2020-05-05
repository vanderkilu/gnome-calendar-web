import React from "react";
import styled, { css } from "styled-components";
import moment from "moment";
import { ICell } from "../types";

const Header = styled.div<{
  padding?: number;
  align?: string;
  adjust?: number;
}>`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background-color: #f3f4f9;
  justify-items: center;
  margin-top: 5rem;
  padding: ${props => props.padding || "2rem"};
  ${props =>
    props.align &&
    css`
      text-align: ${props.align};
    `}
  ${props =>
    props.adjust &&
    css`
      margin-left: ${props.adjust}rem;
    `}
`;
const StyledWeekContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;
const Day = styled.div`
  font-size: 1.5rem;
  color: #b8bac3;
`;
const StyledHeaderElement = styled.div`
  border: 1px solid #f3f4f9;
  border-top: none;
  border-bottom: none;
  height: 10rem;
`;
const StyledHeaderText = styled.h3`
  font-size: 1.7rem;
  text-transform: uppercase;
  color: #424242;
`;
const weekDays = moment.weekdaysShort();

export const CalendarHeaderDay: React.FC<{}> = () => {
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

interface HeaderWeekProps {
  events: ICell[];
}

export const CalendarHeaderWeek: React.FC<HeaderWeekProps> = ({ events }) => {
  return (
    <>
      <Header padding={0.2} align="center" adjust={10}>
        {weekDays.map((weekName, i) => (
          <StyledHeaderElement key={i}>
            <StyledHeaderText>{weekName}</StyledHeaderText>
            <StyledHeaderText>{events[i].day}</StyledHeaderText>
          </StyledHeaderElement>
        ))}
      </Header>
    </>
  );
};
