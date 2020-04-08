import React from "react";
import styled from "styled-components";
import closeIcon from "../assets/close.svg";
import Button from "./Button";

const StyledContainer = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.1);
`;

const StyledModal = styled.form`
  position: absolute;
  width: 50rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffffff;
  border-radius: 6px;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.05);
  min-height: 20rem;
  padding: 0.5rem 1rem;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 2rem;
  font-size: 1.7rem;
`;

const StyledIcon = styled.img`
  padding: 0.8rem;
  background-color: #fcd0dd;
  border-radius: 5px;
  width: 1.2rem;
`;

const StyledContent = styled.div`
  padding: 2rem;
  margin: 1rem 0;
`;

const StyledFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const TaskModal: React.FC<{}> = ({ children }) => {
  return (
    <>
      <StyledContainer>
        <StyledModal>
          <StyledHeader>
            <StyledIcon alt="close icon" src={closeIcon}></StyledIcon>
          </StyledHeader>
          <StyledContent>{children}</StyledContent>
          <StyledFooter>
            <Button text="save" />
          </StyledFooter>
        </StyledModal>
      </StyledContainer>
    </>
  );
};

export default TaskModal;
