import React from "react";
import styled from "styled-components";
import TaskModal from "./TaskModal";

const StyledForm = styled.form`
  width: 100%;
`;
const StyledLabel = styled.label`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #616161;
  font-weight: 600;
`;
const StyledInputGroup = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const StyledInput = styled.input`
  padding: 1.5rem 1rem;
  font: inherit;
  border: none;
  border-radius: 3px;
  border: 1px solid #e0e0e0;
  width: 100%;
  &::placeholder {
    font-size: 1.4rem;
    color: #bdbdbd;
  }
`;

const Form: React.FC<{}> = () => {
  return (
    <>
      <StyledForm>
        <StyledInputGroup>
          <StyledLabel>Name</StyledLabel>
          <StyledInput placeholder="enter task name" />
        </StyledInputGroup>
        <StyledInputGroup>
          <StyledLabel>Duration</StyledLabel>
          <StyledInput placeholder="enter duration" />
        </StyledInputGroup>
        <StyledInputGroup>
          <StyledLabel>Start Time </StyledLabel>
          <StyledInput placeholder="enter start time" />
        </StyledInputGroup>
      </StyledForm>
    </>
  );
};

const TaskForm: React.FC<{}> = () => {
  return (
    <>
      <TaskModal>
        <Form />
      </TaskModal>
    </>
  );
};

export default TaskForm;
