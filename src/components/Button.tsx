import React from "react";
import styled from "styled-components";

const StyledButton = styled.button<{
  color: string | undefined;
  size: number | undefined;
}>`
  padding: 1.2rem 1.5rem;
  width: ${props => props.size || "10rem"};
  background: linear-gradient(to right, #fd9da1, #fcd0dd);
  color: ${props => props.color || "#ffffffff"};
  font-size: 1.5rem;
  border: none;
  border-radius: 6px;
`;

interface ButtonProps {
  text: string;
  color?: string | undefined;
  size?: number;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, color, size, onClick }) => {
  return (
    <>
      <StyledButton color={color} size={size} onClick={onClick}>
        {text}
      </StyledButton>
    </>
  );
};

export default Button;
