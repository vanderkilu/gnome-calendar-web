import React, { useState, useReducer } from "react";
import Picker, {
  StyledPickerWrapper,
  StyledPickerGroup
} from "../components/Picker";
import CalendarCell, { CellEvent, Cell } from "../components/CalendarCell";
import CalendarHeader from "../components/CalendarHeader";
import useCalendar from "../hooks/useCalendar";
import { useEvents } from "../contexts/event";
import { ID } from "../utils";
import { IPosition, IEvent } from "../types";
import FormDetail from "../components/TaskModalFormDetail";
import { Form } from "../components/TaskModalForm";
import TaskModal from "../components/TaskModal";
import { StyledFooter } from "../components/TaskModal";
import Button from "../components/Button";
import Switch, { StyledGroupSwitch } from "../components/Switch";
import WeekView from "../components/WeekView";

import styled from "styled-components";
import moment from "moment";

type ChangeEventType =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>
  | React.ChangeEvent<HTMLTextAreaElement>;

type DivEventType = React.MouseEvent<HTMLDivElement, MouseEvent>;
type DragEventType = React.DragEvent<HTMLDivElement>;

const StyledCalendarContainer = styled.div`
  padding: 5rem;
`;
const H3 = styled.h3`
  font-size: 1.5rem;
  text-transform: capitalize;
  font-weight: bold;
  color: #212121;
`;
const H2 = styled.h2`
  font-size: 1.7rem;
  text-transform: capitalize;
  font-weight: bold;
  color: #212121;
  text-align: center;
`;

type FormEvent = {
  event: IEvent;
  selectedDate: string;
  isBriefVisible: boolean;
  isDetailVisible: boolean;
  isOverflowVisible: boolean;
  weekRow: number;
};

type FormEventAction =
  | { type: "EVENT"; payload: { event: IEvent } }
  | { type: "SELECTED_DATE"; payload: string }
  | { type: "IS_BRIEF_VISIBLE"; payload: boolean }
  | { type: "IS_DETAIL_VISIBLE"; payload: boolean }
  | { type: "IS_OVERFLOW_VISIBLE"; payload: boolean }
  | { type: "FORM_UPDATE"; payload: { name: string; value: string } }
  | { type: "RESET_NAME" }
  | { type: "SET_WEEK_ROW"; payload: number };

const FormEventInitialState = {
  event: { task: { name: "" }, date: "", id: "" },
  selectedDate: "",
  isBriefVisible: false,
  isDetailVisible: false,
  isOverflowVisible: false,
  weekRow: 0
};

const FormEventReducer = (state: FormEvent, action: FormEventAction) => {
  switch (action.type) {
    case "EVENT":
      return {
        ...state,
        event: action.payload.event
      };
    case "SELECTED_DATE":
      return {
        ...state,
        selectedDate: action.payload
      };
    case "IS_BRIEF_VISIBLE":
      return {
        ...state,
        isBriefVisible: action.payload
      };
    case "IS_DETAIL_VISIBLE":
      return {
        ...state,
        isDetailVisible: action.payload
      };
    case "IS_OVERFLOW_VISIBLE":
      return {
        ...state,
        isOverflowVisible: action.payload
      };
    case "FORM_UPDATE":
      return {
        ...state,
        event: {
          ...state.event,
          task: {
            ...state.event.task,
            [action.payload.name]: action.payload.value
          }
        }
      };
    case "RESET_NAME":
      return {
        ...state,
        event: { ...state.event, ...{ task: { name: "" } } }
      };
    case "SET_WEEK_ROW":
      return {
        ...state,
        weekRow: action.payload
      };
    default:
      return state;
  }
};

const HomePage: React.FC<{}> = () => {
  const [date, setDate] = useState(moment());
  const { state, dispatch } = useEvents();

  const [formEvent, setFormEvent] = useReducer(
    FormEventReducer,
    FormEventInitialState
  );
  const [pos, setPos] = useState<IPosition>();
  const { formattedDays, todayDate, formattedWeeks } = useCalendar(
    date,
    state.events
  );

  const updateDate = (type: moment.unitOfTime.All, index: number) => {
    setDate(moment(date).set(type, index));
  };
  const handleOnClick = (date: string, position?: IPosition) => {
    setFormEvent({ type: "RESET_NAME" });
    setPos(position);
    setFormEvent({ type: "IS_BRIEF_VISIBLE", payload: true });
    setFormEvent({ type: "SELECTED_DATE", payload: date });
  };
  const handleWeekOnClick = (
    date: string,
    weekRow: number,
    position?: IPosition
  ) => {
    handleOnClick(date, position);
    setFormEvent({ type: "SET_WEEK_ROW", payload: weekRow });
  };
  const handleOnSave = () => {
    const task = formEvent.event.task;
    const event = {
      task,
      date: formEvent.selectedDate,
      id: ID(),
      weekRow: formEvent.weekRow
    };
    dispatch({ type: "ADD_EVENT", payload: { event } }); // add event to globale events
    setFormEvent({ type: "EVENT", payload: { event } }); //set the current event
    setFormEvent({ type: "IS_BRIEF_VISIBLE", payload: false });
    setFormEvent({ type: "RESET_NAME" });
  };
  const handleOnDetail = () => {
    setFormEvent({ type: "IS_BRIEF_VISIBLE", payload: false });
    setFormEvent({ type: "IS_OVERFLOW_VISIBLE", payload: false });
    setFormEvent({ type: "IS_DETAIL_VISIBLE", payload: true });
  };
  const handleOnEdit = () => {
    const event = formEvent.event;
    dispatch({ type: "UPDATE_EVENT", payload: { event } });
    setFormEvent({ type: "IS_DETAIL_VISIBLE", payload: false });
  };
  const handleOnDelete = () => {
    const { id } = formEvent.event;
    dispatch({ type: "DELETE_EVENT", payload: { id } });
    setFormEvent({ type: "IS_DETAIL_VISIBLE", payload: false });
  };
  const handleCellEventClick = (id: string) => {
    const currentEvent = state.events.find(event => event.id === id);
    if (currentEvent) {
      setFormEvent({ type: "EVENT", payload: { event: currentEvent } });
    }
    setFormEvent({ type: "IS_DETAIL_VISIBLE", payload: true });
  };
  const handleOnOverflow = (e: DivEventType, dateStr: string) => {
    e.stopPropagation();
    setFormEvent({ type: "SELECTED_DATE", payload: dateStr });
    setFormEvent({ type: "IS_OVERFLOW_VISIBLE", payload: true });
  };
  const handleOnOverflowClick = (id: string) => {
    handleCellEventClick(id);
    handleOnDetail();
  };

  const handleOnDragStart = (e: DragEventType, id: string) => {
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.dropEffect = "copy";
  };
  const handleOnDrop = (e: DragEventType, dateStr: string) => {
    const id = e.dataTransfer.getData("text/plain");
    dispatch({ type: "SWAP_EVENT", payload: { id, dateStr } });
  };
  const handleOnDragOver = (e: DragEventType) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const eventsForSelectedDate = state.events.filter(
    event => event.date === formEvent.selectedDate
  );
  const selectedDay = moment(formEvent.selectedDate).format("D");

  const updateForm = (e: ChangeEventType) => {
    const { name, value } = e.target;
    setFormEvent({ type: "FORM_UPDATE", payload: { name, value } });
  };

  const hasTask = formEvent.event.task.name !== "";
  const switchView = (id: string) => {};

  return (
    <>
      <StyledCalendarContainer>
        <StyledPickerWrapper>
          <H3>task calendar</H3>
          <StyledGroupSwitch>
            <Switch id="week" onClick={switchView} />
            <Switch id="month" onClick={switchView} />
            <Switch id="year" onClick={switchView} />
          </StyledGroupSwitch>
          <StyledPickerGroup>
            <Picker date={date} type="month" setDate={updateDate} key={ID()} />
            <Picker date={date} type="year" setDate={updateDate} key={ID()} />
          </StyledPickerGroup>
        </StyledPickerWrapper>
        <CalendarHeader />
        {false ? (
          <CalendarCell
            days={formattedDays}
            today={todayDate}
            onClick={handleOnClick}
            onCellEventClick={handleCellEventClick}
            onOverflowClick={handleOnOverflow}
            onDragStart={handleOnDragStart}
            onDrop={handleOnDrop}
            onDragOver={handleOnDragOver}
          />
        ) : (
          <WeekView
            weekDays={["m", "t", "w", "t", "f", "s", "s"]}
            events={formattedWeeks[0]}
            onCellEventClick={handleCellEventClick}
            onClick={handleWeekOnClick}
          />
        )}
      </StyledCalendarContainer>
      <TaskModal
        isOpen={formEvent.isBriefVisible}
        onClose={() =>
          setFormEvent({ type: "IS_BRIEF_VISIBLE", payload: false })
        }
        position={pos}
        footer={
          <StyledFooter>
            <Button text="Detail" onClick={handleOnDetail} btnType="normal" />
            <Button
              text="Save"
              onClick={handleOnSave}
              isDisabled={!hasTask}
              type="submit"
            />
          </StyledFooter>
        }
      >
        <Form
          task={formEvent.event.task}
          onInputChange={(e: ChangeEventType) => {
            updateForm(e);
          }}
          onEnter={handleOnSave}
        />
      </TaskModal>
      <TaskModal
        footer={
          <StyledFooter>
            <Button text="Delete" onClick={handleOnDelete} btnType="normal" />
            <Button text="Save" onClick={handleOnEdit} />
          </StyledFooter>
        }
        isOpen={formEvent.isDetailVisible}
        onClose={() =>
          setFormEvent({ type: "IS_DETAIL_VISIBLE", payload: false })
        }
      >
        <FormDetail
          task={formEvent.event.task}
          onInputChange={(e: ChangeEventType) => updateForm(e)}
        />
      </TaskModal>
      <TaskModal
        isOpen={formEvent.isOverflowVisible}
        onClose={() =>
          setFormEvent({ type: "IS_OVERFLOW_VISIBLE", payload: false })
        }
        position={pos}
        width={25}
        footer={<></>}
      >
        <H2>{selectedDay}</H2>
        {eventsForSelectedDate.map(event => (
          <CellEvent onClick={() => handleOnOverflowClick(event.id)} key={ID()}>
            {event.task.name}
          </CellEvent>
        ))}
      </TaskModal>
    </>
  );
};

export default HomePage;
