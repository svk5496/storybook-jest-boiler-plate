import React, { ReactNode, ReactElement } from "react";
import styled from "styled-components";

interface IBaseBox {
  width: string;
}

interface IStyledInputProps {
  hasError?: boolean;
}

const BaseBox = styled.div<IBaseBox>`
  width: ${(props) => props.width};
  height: 76px;
  display: flex;
  flex-direction: column;
`;

const StyledLabel = styled.label`
  font-size: 16px;
  position: absolute;
  color: ${(props) => props.theme.gray};

  opacity: 0;
`;

const StyledBox = styled.div<IStyledInputProps>`
  border: 0.5px solid
    ${(props) =>
      props.hasError ? props.theme.danger : props.theme.borderColor};
  border-radius: 5px;
  height: 54px;
  display: flex;
  position: relative;
  padding: 2px 16px;
  align-items: center;
  &.active {
    border: 0.5px solid
      ${(props) => (props.hasError ? props.theme.danger : props.theme.gray)};
  }
  :focus {
    border: 0.5px solid ${(props) => props.theme.primary};
  }
  input {
    width: 90%;
    height: 30px;
    font-size: 16px;
    color: ${(props) => props.theme.fontColor};
    border-radius: 2px;
    border: 0px;
    position: absolute;
    &::placeholder {
      font-size: 16px;
    }
    :focus {
      outline: none;
    }
    &:not(:placeholder-shown) + ${StyledLabel} {
      font-size: 10px;
      color: ${(props) => props.theme.fontColorLight};
      transform: translateY(-14px);
      transition: 0.3s ease-in-out;
      animation-fill-mode: forwards;
      opacity: 1;
    }
    &:not(:placeholder-shown) {
      bottom: 4px;
    }
    -webkit-appearance: none;
  }
`;

const ErrorBox = styled.div`
  width: 100%;
  padding-top: 2px;
  height: 24px;
`;

const ErrorMessage = styled.small`
  font-size: 12px;
  padding: 0px 20px;
  color: ${(props) => props.theme.danger};
`;

interface InputProps {
  label: string;
  fullWidth?: boolean;
  width?: string;
  hasError?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  endIcon?: ReactNode;
  children: ReactElement;
}

export const Input = ({
  label,
  fullWidth = true,
  width = "400px",
  disabled = false,
  hasError = false,
  errorMessage,
  children,
  ...props
}: InputProps) => {
  // about full width
  if (fullWidth) {
    width = "100%";
  }

  return (
    <BaseBox width={width}>
      <StyledBox id="container" hasError={hasError} {...props}>
        {children}
        <StyledLabel>{label}</StyledLabel>
      </StyledBox>
      <ErrorBox>
        {hasError ? <ErrorMessage>{errorMessage}</ErrorMessage> : <></>}
      </ErrorBox>
    </BaseBox>
  );
};
