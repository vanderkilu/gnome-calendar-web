import React from "react";
import { ITask } from "../types";
import {
  StyledForm,
  StyledInputGroup,
  StyledLabel,
  StyledInput
} from "./SharedStyles";

type ChangeEventType = React.ChangeEvent<HTMLInputElement>;
type KeyboardEvent = React.KeyboardEvent<HTMLInputElement>;

interface FormProps {
  task: ITask;
  onInputChange: (event: ChangeEventType) => void;
  onEnter: (event: KeyboardEvent) => void;
}

export const Form: React.FC<FormProps> = ({ task, onInputChange, onEnter }) => {
  return (
    <>
      <StyledForm>
        <StyledInputGroup>
          <StyledLabel>Name</StyledLabel>
          <StyledInput
            autoFocus
            placeholder="enter task name"
            name="name"
            value={task.name}
            onKeyPress={(e: KeyboardEvent) => e.key === "Enter" && onEnter(e)}
            onChange={(e: ChangeEventType) => onInputChange(e)}
          />
        </StyledInputGroup>
        <StyledInputGroup>
          <StyledLabel>Duration</StyledLabel>
          <StyledInput
            placeholder="enter duration"
            name="duration"
            value={task.duration}
            onKeyPress={(e: KeyboardEvent) => e.key === "Enter" && onEnter(e)}
            onChange={(e: ChangeEventType) => onInputChange(e)}
          />
        </StyledInputGroup>
      </StyledForm>
    </>
  );
};
