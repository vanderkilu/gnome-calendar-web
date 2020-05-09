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
  text-align: center;
`;
const StyledDayContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-column-gap: 0;
`;
const StyledDay = styled.div`
  margin: 0rem;
  cursor: pointer;
`;
const StyledText = styled.p<{ isToday: boolean }>`
  font-size: 1.2rem;
  padding: 0.1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #424242;
  background-color: ${props => props.isToday && "#c8e6c9"};
`;
const StyledYearContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 20rem;
  margin-top: 5rem;
`;
const StyledYearContent = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 3rem;
`;

interface MonthProps {
  days: number[];
  month: string;
  currentDay: number;
  currentMonth: string;
  dayDate?: (day: number) => string;
}

const MonthView: React.FC<MonthProps> = ({
  days,
  month,
  currentDay,
  currentMonth
}) => {
  return (
    <>
      <StyledMonthContainer>
        <StyledMonthHeader>{month}</StyledMonthHeader>
        <StyledDayContainer>
          {days.map(day =>
            day === 0 ? (
              <StyledDay key={day}></StyledDay>
            ) : (
              <StyledDay key={day}>
                <StyledText
                  isToday={day === currentDay && month === currentMonth}
                >
                  {day}
                </StyledText>
              </StyledDay>
            )
          )}
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
          {monthDates.map(
            ({ month, days, dayDate, currentDay, currentMonth }) => (
              <MonthView
                days={days}
                month={month}
                dayDate={dayDate}
                currentDay={currentDay}
                currentMonth={currentMonth}
                key={month}
              />
            )
          )}
        </StyledYearContent>
      </StyledYearContainer>
    </>
  );
};

export default YearView;
