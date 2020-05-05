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
const Day = styled.div`
  font-size: 1.2rem;
  color: #424242;
`;
const StyledHeaderElement = styled.div`
  border: 1px solid #f3f4f9;
  border-top: none;
  border-bottom: none;
  min-height: 5rem;
`;
const StyledHeaderText = styled.h3`
  font-size: 1.2rem;
  text-transform: uppercase;
  color: #424242;
`;
const weekDays = moment.weekdaysShort();

export const CalendarHeaderMonth: React.FC<{}> = () => {
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
