import styled from "styled-components";

export const StyledForm = styled.form`
  width: 100%;
`;
export const StyledLabel = styled.label`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #616161;
  font-weight: 600;
`;
export const StyledInputGroup = styled.div`
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
export const StyledInput = styled.input`
  padding: 0.8rem 1rem;
  font: inherit;
  border: none;
  border-radius: 3px;
  border: 1px solid #e0e0e0;
  color: #616161;
  font-size: 1.4rem;
  &::placeholder {
    font-size: 1.4rem;
    color: #bdbdbd;
  }
`;
