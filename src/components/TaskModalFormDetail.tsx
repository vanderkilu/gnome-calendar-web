import React from "react";
import {
  StyledForm,
  StyledInputGroup,
  StyledLabel,
  StyledInput,
  StyledSelect,
  StyledOption,
  StyledTextArea
} from "./SharedStyles";
import { ITask } from "../types";

type ChangeEventType =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>
  | React.ChangeEvent<HTMLTextAreaElement>;

interface FormProps {
  task: ITask;
  onInputChange: (event: ChangeEventType) => void;
}

const FormDetail: React.FC<FormProps> = ({ task, onInputChange }) => {
  return (
    <>
      <StyledForm>
        <StyledInputGroup>
          <StyledLabel>Name</StyledLabel>
          <StyledInput
            placeholder="enter task name"
            name="name"
            value={task.name}
            onChange={(e: ChangeEventType) => onInputChange(e)}
          />
        </StyledInputGroup>
        <StyledInputGroup>
          <StyledLabel>Time</StyledLabel>
        </StyledInputGroup>
        <StyledInputGroup>
          <StyledLabel>Repeat</StyledLabel>
          <StyledSelect
            name="repeat"
            value={task.repeat}
            onChange={(e: ChangeEventType) => onInputChange(e)}
          >
            <StyledOption value="no-repeat">No repeat</StyledOption>
            <StyledOption value="daily">Daily</StyledOption>
            <StyledOption value="monthly">Monthly</StyledOption>
            <StyledOption value="yearly">Yearly</StyledOption>
          </StyledSelect>
        </StyledInputGroup>
        <StyledInputGroup>
          <StyledLabel>Reminders</StyledLabel>
          <StyledSelect
            name="reminders"
            value={task.reminders}
            onChange={(e: ChangeEventType) => onInputChange(e)}
          >
            <StyledOption>Add reminders</StyledOption>
            <StyledOption value="5-min">5 minutes</StyledOption>
            <StyledOption value="10-min">10 minutes</StyledOption>
            <StyledOption value="30-min">30 minutes</StyledOption>
            <StyledOption value="1-hour">1 hour</StyledOption>
            <StyledOption value="1-hour">1 hour</StyledOption>
            <StyledOption value="1-day">1 day</StyledOption>
            <StyledOption value="2-days">2 days</StyledOption>
            <StyledOption value="3-days">3 days</StyledOption>
            <StyledOption value="1-week">1 week</StyledOption>
          </StyledSelect>
        </StyledInputGroup>
        <StyledInputGroup>
          <StyledLabel>Notes</StyledLabel>
          <StyledTextArea
            name="notes"
            value={task.notes}
            onChange={(e: ChangeEventType) => onInputChange(e)}
          ></StyledTextArea>
        </StyledInputGroup>
      </StyledForm>
    </>
  );
};

export default FormDetail;
