import React from "react";
import styled from "styled-components";
import closeIcon from "../assets/close.svg";
import Button from "./Button";

const StyledContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 50;
`;

const StyledModal = styled.div`
  position: absolute;
  width: 40rem;
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
  padding: 1rem;
  font-size: 1.7rem;
`;

const StyledIcon = styled.img`
  padding: 0.8rem;
  background-color: #fccdec;
  border-radius: 5px;
  width: 1.2rem;
`;

const StyledContent = styled.div`
  padding: 0 2rem;
  margin: 1rem 0;
`;

const StyledFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({
  children,
  isOpen,
  onClose,
  onSave
}) => {
  return (
    <>
      {isOpen && (
        <StyledContainer>
          <StyledModal>
            <StyledHeader>
              <StyledIcon alt="close icon" src={closeIcon} onClick={onClose} />
            </StyledHeader>
            <StyledContent>{children}</StyledContent>
            <StyledFooter>
              <Button text="save" onClick={onSave} />
            </StyledFooter>
          </StyledModal>
        </StyledContainer>
      )}
    </>
  );
};

export default TaskModal;
