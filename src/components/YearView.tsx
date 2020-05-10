import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { generateDates } from "../utils";
import { IEvent } from "../types";

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
const StyledYearEventContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 1px solid #e0e0e0;
  padding-left: 2rem;
`;
const StyledEventDate = styled.h3`
  font-size: 1.4rem;
  color: #424242;
`;
const StyledEventItem = styled.div`
  padding: 0.5rem;
  border-radius: 2px;
  background-color: #e8f5e9;
  color: #81c784;
  cursor: pointer;
  margin-right: 0.1rem;
  margin-bottom: 0.4rem;
`;

interface MonthProps {
  days: number[];
  month: string;
  currentDay: number;
  currentMonth: string;
  dayDate: (day: number) => string;
  onClick: (date: string) => void;
}

const MonthView: React.FC<MonthProps> = ({
  days,
  month,
  currentDay,
  currentMonth,
  dayDate,
  onClick
}) => {
  const handleOnClick = (day: number) => {
    const date = dayDate(day);
    onClick(date);
  };
  return (
    <>
      <StyledMonthContainer>
        <StyledMonthHeader>{month}</StyledMonthHeader>
        <StyledDayContainer>
          {days.map(day =>
            day === 0 ? (
              <StyledDay key={day}></StyledDay>
            ) : (
              <StyledDay key={day} onClick={() => handleOnClick(day)}>
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
  events: IEvent[];
  onCellEventClick: (id: string) => void;
}

const YearView: React.FC<YearProps> = ({ date, events, onCellEventClick }) => {
  const monthDates = generateDates(date);
  const [selectedDate, setSelectedDate] = useState("");
  const eventsForDate = events.filter(event => event.date === selectedDate);
  const formattedDate = moment(selectedDate).format("DD/MMM/YYYY");
  const handleOnClick = (date: string) => {
    setSelectedDate(date);
  };

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
                onClick={handleOnClick}
                key={month}
              />
            )
          )}
        </StyledYearContent>
        <StyledYearEventContainer>
          {selectedDate !== "" && (
            <StyledEventDate>{formattedDate}</StyledEventDate>
          )}
          {eventsForDate.map(event => (
            <StyledEventItem onClick={() => onCellEventClick(event.id)}>
              {event.task.name}
            </StyledEventItem>
          ))}
        </StyledYearEventContainer>
      </StyledYearContainer>
    </>
  );
};

export default YearView;
