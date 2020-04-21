import React, { useLayoutEffect, useRef, useState } from "react";
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

const StyledModal = styled.div<{
  x: number | undefined;
  y: number | undefined;
}>`
  position: absolute;
  top: ${props => (props.y ? props.y + "px" : "50%")};
  left: ${props => (props.x ? props.x + "px" : "50%")};
  transform: translate(-50%, -50%);
  background-color: #ffffffff;
  border-radius: 6px;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.05);
  min-height: 20rem;
  padding: 0.5rem 1rem;
`;

const StyledToolTip = styled.div<{
  x: number | undefined;
  y: number | undefined;
}>`
  position: absolute;
  left: ${props => (props.x ? props.x - 40 + "px" : "50%")};
  top: ${props => (props.y ? props.y + "px" : "50%")};
  transform: rotate(45deg);
  width: 4rem;
  height: 4rem;
  background-color: #ffffff;
  z-index: 10;
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
  padding: 0 1rem;
  margin: 1rem 0;
`;

const StyledFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  position?: IPosition;
}

interface IPosition {
  top: number;
  right: number;
  left: number;
  width: number;
  bottom: number;
}

const TaskModal: React.FC<TaskModalProps> = ({
  children,
  isOpen,
  onClose,
  onSave,
  position
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [toolPos, setToolPos] = useState({ x: 0, y: 0 });

  const bottomOfset = 10;
  const toolBottomOffset = 50;

  useLayoutEffect(() => {
    if (position && modalRef.current && containerRef.current) {
      const modalHeight = modalRef.current.getBoundingClientRect().height;
      const modalWidth = modalRef.current.getBoundingClientRect().width;
      const containerWidth = containerRef.current.getBoundingClientRect().width;
      const containerHeight = containerRef.current.getBoundingClientRect()
        .height;
      let x = position.left + position.width / 2;
      let y = position.bottom + modalHeight / 2;
      const originalX = x;

      setToolPos({ x, y: position.bottom });
      if (x + modalWidth > containerWidth) {
        x = x - modalWidth / 2 + position.width / 2;
      }
      if (x - modalWidth / 2 <= 0) {
        x = position.right;
      }
      if (y + modalHeight / 2 > containerHeight) {
        y = position.bottom - modalHeight / 2 - bottomOfset;
        setToolPos({ x: originalX, y: position.bottom - toolBottomOffset });
      }
      if (y + modalHeight / 2 < 0) {
        y = position.bottom + modalHeight / 2;
        setToolPos({ x, y: position.bottom - toolBottomOffset });
      }
      setPos({ x, y });
    }
  }, [position]);
  return (
    <>
      {isOpen && (
        <StyledContainer ref={containerRef}>
          <StyledToolTip x={toolPos.x} y={toolPos.y} />
          <StyledModal ref={modalRef} x={pos.x} y={pos.y}>
            <StyledHeader>
              <StyledIcon alt="close icon" src={closeIcon} onClick={onClose} />
            </StyledHeader>
            <StyledContent>{children}</StyledContent>
            <StyledFooter>
              <Button text="Detail" onClick={onSave} btnType="normal" />
              <Button text="Save" onClick={onSave} />
            </StyledFooter>
          </StyledModal>
        </StyledContainer>
      )}
    </>
  );
};

export default TaskModal;
