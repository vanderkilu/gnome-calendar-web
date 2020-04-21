import React, { useState } from "react";
import TaskModal from "./TaskModal";
import { IPosition, ITask } from "../types";
import {
  StyledForm,
  StyledInputGroup,
  StyledLabel,
  StyledInput
} from "./SharedStyles";
import useForm from "../hooks/useForm";

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
  const initialTask: ITask = {
    name: "",
    duration: ""
  };

  const { values, handleInputChange } = useForm(initialTask);

  return (
    <>
      <TaskModal
        isOpen={isVisible}
        onClose={onClose}
        onSave={() => onSave(values)}
        position={position}
      >
        <Form task={values} onInputChange={handleInputChange} />
      </TaskModal>
    </>
  );
};

export default TaskForm;
