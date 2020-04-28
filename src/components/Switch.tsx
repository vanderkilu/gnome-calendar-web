import React from "react";
import styled from "styled-components";

const StyledSwitch = styled.button`
  padding: 0.8rem 2rem;
  /* border: none; */
  border: 1px solid #b8bac3;
  border-radius: 5px;
  background-color: transparent;
  &:active {
    background-color: #c8e6c9;
  }
  &:not(:last-child) {
    margin-right: 0.1rem;
  }
`;

export const StyledGroupSwitch = styled.div`
  display: flex;
`;

interface SwitchProps {
  id: string;
  onClick: (id: string) => void;
}

const Switch: React.FC<SwitchProps> = ({ onClick, id }) => {
  return (
    <>
      <StyledSwitch onClick={() => onClick(id)}>{id}</StyledSwitch>
    </>
  );
};

export default Switch;
