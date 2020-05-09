import React from "react";
import styled from "styled-components";
import moment from "moment";
import { generateDates } from "../utils";

const StyledMonthContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledMonthHeader = styled.h3`
  font-size: 1.5rem;
  color: #c8e6c9;
`;
const StyledDayContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-column-gap: 0;
`;
const StyledDay = styled.div`
  margin: 0rem;
`;
const StyledText = styled.p`
  font-size: 1.2rem;
  color: #424242;
`;
const StyledYearContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 20rem;
`;
const StyledYearContent = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 3rem;
`;

interface MonthProps {
  days: number[];
  month: string;
  dayDate?: (day: number) => string;
}

const MonthView: React.FC<MonthProps> = ({ days, month }) => {
  return (
    <>
      <StyledMonthContainer>
        <StyledMonthHeader>{month}</StyledMonthHeader>
        <StyledDayContainer>
          {days.map(day => (
            <StyledDay>
              <StyledText>{day}</StyledText>
            </StyledDay>
          ))}
        </StyledDayContainer>
      </StyledMonthContainer>
    </>
  );
};

interface YearProps {
  date: moment.Moment;
}

const YearView: React.FC<YearProps> = ({ date }) => {
  const monthDates = generateDates(date);
  return (
    <>
      <StyledYearContainer>
        <StyledYearContent>
          {monthDates.map(({ month, days, dayDate }) => (
            <MonthView days={days} month={month} dayDate={dayDate} />
          ))}
        </StyledYearContent>
      </StyledYearContainer>
    </>
  );
};

export default YearView;
