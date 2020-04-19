import React, { useState, useReducer } from "react";
import styled from "styled-components";
import TaskModal from "./TaskModal";

const StyledForm = styled.form`
  width: 100%;
`;
const StyledLabel = styled.label`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #616161;
  font-weight: 600;
`;
const StyledInputGroup = styled.div`
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
const StyledInput = styled.input`
  padding: 0.8rem 1rem;
  font: inherit;
  border: none;
  border-radius: 3px;
  border: 1px solid #e0e0e0;
  color: #616161;
  font-size: 1.4rem;
  &::placeholder {
    font-size: 1.4rem;
    color: #bdbdbd;
  }
`;

export interface ITask {
  name?: string;
  duration?: string;
  startTime?: string;
}

type ChangeEventType = React.ChangeEvent<HTMLInputElement>;

interface FormProps {
  task: ITask;
  onInputChange: (event: ChangeEventType) => void;
}

const Form: React.FC<FormProps> = ({ task, onInputChange }) => {
  return (
    <>
      <StyledForm>
        <StyledInputGroup>
          <StyledLabel>Name</StyledLabel>
          <StyledInput
            placeholder="enter task name"
            name="task"
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

type Action =
  | { type: "NAME"; payload: string }
  | { type: "DURATION"; payload: string }
  | { type: "STARTTIME"; payload: string };

const setTaskReducer = (state: ITask, action: Action) => {
  switch (action.type) {
    case "NAME":
      return {
        ...state,
        name: action.payload
      };
    case "DURATION":
      return {
        ...state,
        duration: action.payload
      };
    case "STARTTIME":
      return {
        ...state,
        startTime: action.payload
      };
  }
};

interface IPosition {
  top: number;
  right: number;
  left: number;
  width: number;
  bottom: number;
}

interface TaskFormProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: (task: ITask) => void;
  position?: IPosition;
}

const TaskForm: React.FC<TaskFormProps> = ({
  isVisible,
  onClose,
  onSave,
  position
}) => {
  const [task, setTask] = useReducer(setTaskReducer, {
    name: "",
    duration: "",
    startTime: ""
  });
  const handleInputChange = (e: ChangeEventType) => {
    const { name, value } = e.target;
    const type =
      name === "task" ? "NAME" : name === "duration" ? "DURATION" : "STARTTIME";
    setTask({ type, payload: value });
  };
  return (
    <>
      <TaskModal
        isOpen={isVisible}
        onClose={onClose}
        onSave={() => onSave(task)}
        position={position}
      >
        <Form task={task} onInputChange={handleInputChange} />
      </TaskModal>
    </>
  );
};

export default TaskForm;
