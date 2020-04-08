import React from "react";
import styled from "styled-components";
import TaskModal from "./TaskModal";

const StyledForm = styled.form`
  width: 100%;
`;
const StyledLabel = styled.label`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;
const StyledInputGroup = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const StyledInput = styled.input`
  padding: 1rem;
  font: inherit;
  border: none;
  border-radius: 6px;
  border: 1px solid #f3f4f9;
  width: 100%;
`;

const Form: React.FC<{}> = () => {
  return (
    <>
      <StyledForm>
        <StyledInputGroup>
          <StyledLabel>Name</StyledLabel>
          <StyledInput placeholder="enter today" />
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
