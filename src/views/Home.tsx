import React, { useState } from "react";
import TaskModalForm, { ITask } from "../components/TaskModalForm";
import Picker, {
  StyledPickerWrapper,
  StyledPickerGroup
} from "../components/Picker";
import CalendarCell from "../components/CalendarCell";
import CalendarHeader from "../components/CalendarHeader";
import useCalendar from "../hooks/useCalendar";

import styled from "styled-components";
import moment from "moment";

const ID = () => {
  return (
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};

const StyledCalendarContainer = styled.div`
  padding: 5rem;
`;
const H3 = styled.h3`
  font-size: 1.5rem;
  text-transform: capitalize;
  font-weight: bold;
  color: #212121;
`;

interface IEvent {
  task: ITask;
  date: string;
}

interface IPosition {
  top: number;
  right: number;
  left: number;
  width: number;
  bottom: number;
}

const HomePage: React.FC<{}> = () => {
  const [date, setDate] = useState(moment());
  const [events, setEvents] = useState<IEvent[]>([]);
  const { formattedDays, todayDate } = useCalendar(date, events);
  const [selectedDate, setSelectedDate] = useState("");
  const [isFormVisible, toggleFormVisible] = useState(false);
  const [pos, setPos] = useState<IPosition>();

  const updateDate = (type: moment.unitOfTime.All, index: number) => {
    setDate(moment(date).set(type, index));
  };
  const toggleFormShow = () => toggleFormVisible(visible => !visible);
  const handleOnClick = (date: string, position?: IPosition) => {
    setPos(position);
    toggleFormShow();
    setSelectedDate(date);
  };
  const handleOnSave = (task: ITask) => {
    const event: IEvent = {
      task: task,
      date: selectedDate
    };
    console.log(event);
    setEvents([...events, event]);
    toggleFormShow();
  };

  return (
    <>
      <StyledCalendarContainer>
        <StyledPickerWrapper>
          <H3>task calendar</H3>
          <StyledPickerGroup>
            <Picker date={date} type="month" setDate={updateDate} key={ID()} />
            <Picker date={date} type="year" setDate={updateDate} key={ID()} />
          </StyledPickerGroup>
        </StyledPickerWrapper>
        <CalendarHeader />
        <CalendarCell
          days={formattedDays}
          today={todayDate}
          onClick={handleOnClick}
        />
      </StyledCalendarContainer>
      <TaskModalForm
        isVisible={isFormVisible}
        onClose={toggleFormShow}
        onSave={handleOnSave}
        position={pos}
      />
    </>
  );
};

export default HomePage;
