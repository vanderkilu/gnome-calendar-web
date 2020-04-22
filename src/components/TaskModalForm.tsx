import React from "react";
import { IPosition, ITask } from "../types";
import {
  StyledForm,
  StyledInputGroup,
  StyledLabel,
  StyledInput
} from "./SharedStyles";

type ChangeEventType = React.ChangeEvent<HTMLInputElement>;

interface FormProps {
  task: ITask;
  onInputChange: (event: ChangeEventType) => void;
}

export const Form: React.FC<FormProps> = ({ task, onInputChange }) => {
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
          <StyledLabel>Duration</StyledLabel>
          <StyledInput
            placeholder="enter duration"
            name="duration"
            value={task.duration}
            onChange={(e: ChangeEventType) => onInputChange(e)}
          />
        </StyledInputGroup>
      </StyledForm>
    </>
  );
};
