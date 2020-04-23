import React from "react";
import styled, { css } from "styled-components";

const StyledButton = styled.button<{
  color: string | undefined;
  size: number | undefined;
  btnType?: string;
}>`
  padding: 0.8rem 1.5rem;
  width: ${props => props.size || "6rem"};
  background: linear-gradient(to right, #fd9da1, #fcd0dd);
  color: ${props => props.color || "#ffffffff"};
  font-size: 1.2rem;
  border: none;
  border-radius: 6px;
  ${props =>
    props.btnType === "normal" &&
    css`
      background: linear-gradient(to right, #bdbdbd, #e0e0e0);
    `}
  ${props =>
    props.disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: all;
    `}
`;

interface ButtonProps {
  text: string;
  color?: string | undefined;
  size?: number;
  onClick: () => void;
  btnType?: string;
  isDisabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
}

const Button: React.FC<ButtonProps> = ({
  text,
  color,
  size,
  onClick,
  btnType,
  type,
  isDisabled = false
}) => {
  return (
    <>
      <StyledButton
        color={color}
        size={size}
        onClick={onClick}
        btnType={btnType}
        disabled={isDisabled}
        type={type}
      >
        {text}
      </StyledButton>
    </>
  );
};

export default Button;
