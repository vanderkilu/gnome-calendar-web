import React, { useState } from "react";
import Picker, {
  StyledPickerWrapper,
  StyledPickerGroup
} from "../components/Picker";
import CalendarCell from "../components/CalendarCell";
import CalendarHeader from "../components/CalendarHeader";
import useCalendar from "../hooks/useCalendar";
import { useEvents } from "../contexts/event";
import { ID } from "../utils";
import { IPosition, IEvent, ITask } from "../types";
import FormDetail from "../components/TaskModalFormDetail";
import { Form } from "../components/TaskModalForm";
import TaskModal from "../components/TaskModal";
import useForm from "../hooks/useForm";

import styled from "styled-components";
import moment from "moment";

const StyledCalendarContainer = styled.div`
  padding: 5rem;
`;
const H3 = styled.h3`
  font-size: 1.5rem;
  text-transform: capitalize;
  font-weight: bold;
  color: #212121;
`;

const HomePage: React.FC<{}> = () => {
  const [date, setDate] = useState(moment());
  const {
    state: { events },
    dispatch
  } = useEvents();
  const { formattedDays, todayDate } = useCalendar(date, events);
  const [selectedDate, setSelectedDate] = useState("");
  const [isFormVisible, toggleFormVisible] = useState(false);
  const [isFormDetailVisible, toggleFormDetailVisible] = useState(false);
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
      date: selectedDate,
      id: ID()
    };
    dispatch({ type: "ADD_EVENT", payload: { event } });
    toggleFormShow();
  };
  const handleOnEdit = () => {};

  const initialTask: ITask = {
    name: "",
    duration: ""
  };

  const { values, handleInputChange } = useForm(initialTask);

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
      <TaskModal
        isOpen={isFormVisible}
        onClose={toggleFormShow}
        onSave={() => handleOnSave(values)}
        position={pos}
      >
        <Form task={values} onInputChange={handleInputChange} />
      </TaskModal>
      <TaskModal
        isOpen={isFormDetailVisible}
        onClose={() => null}
        onSave={handleOnEdit}
      >
        <FormDetail task={values} onInputChange={handleInputChange} />
      </TaskModal>
    </>
  );
};

export default HomePage;
