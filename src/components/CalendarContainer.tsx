import React, { useState } from "react";
import moment from "moment";
import styled from "styled-components";
import Picker, { StyledPickerWrapper, StyledPickerGroup } from "./Picker";
import Calendar from "./Calendar";

const StyledCalendarContainer = styled.div`
  padding: 5rem;
`;
const H3 = styled.h3`
  font-size: 1.5rem;
  text-transform: capitalize;
  font-weight: bold;
  color: #212121;
`;

const ID = () => {
  return (
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};

interface CalendarContainerProps {
  onClick: (day: number) => void;
}

const CalendarContainer: React.FC<CalendarContainerProps> = ({ onClick }) => {
  const [date, setDate] = useState(moment());
  const updateDate = (type: moment.unitOfTime.All, index: number) => {
    setDate(moment(date).set(type, index));
  };

  return (
    <StyledCalendarContainer>
      <StyledPickerWrapper>
        <H3>task calendar</H3>
        <StyledPickerGroup>
          <Picker date={date} type="month" setDate={updateDate} key={ID()} />
          <Picker date={date} type="year" setDate={updateDate} key={ID()} />
        </StyledPickerGroup>
      </StyledPickerWrapper>
      <Calendar date={date} onClick={onClick} />
    </StyledCalendarContainer>
  );
};

export default CalendarContainer;
