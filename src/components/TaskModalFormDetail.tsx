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
import TaskModal from "./TaskModal";
import { ITask } from "../types";
import useForm from "../hooks/useForm";

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
          ></StyledSelect>
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

interface TaskFormProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: (task: ITask) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ isVisible, onClose, onSave }) => {
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
      >
        <FormDetail task={values} onInputChange={handleInputChange} />
      </TaskModal>
    </>
  );
};

export default TaskForm;
