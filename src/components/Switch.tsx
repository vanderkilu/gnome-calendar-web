import React from "react";
import styled from "styled-components";

const StyledSwitch = styled.button`
  padding: 0.8rem 2rem;
  border: 1px solid #b8bac3;
  border-radius: 5px;
  background-color: transparent;
  font: inherit;
  font-size: 1.2rem;
  text-transform: capitalize;
  &:nth-child(1) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  &:nth-child(3) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  &:nth-child(2) {
    border-right: none;
    border-left: none;
    border-radius: 0;
  }
  &:active,
  &:visited,
  &:focus {
    background-color: #c8e6c9;
    border: 1px solid #c8e6c9;
    outline: none;
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
