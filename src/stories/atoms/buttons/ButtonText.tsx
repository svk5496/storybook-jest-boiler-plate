import React, { ReactNode } from "react";
import styled from "styled-components";
import { lightTheme } from "../../../styles";

interface IStyledButtonProps {
  padding: string;
  width: string | undefined;
  fontSize: string;
  margin: string;
  backgroundColor: string;
  fontColor: string;
  hoverBackgroundColor: string;
  borderWidth: string;
  borderColor: string;
  borderStyle: string;
  hoverBorderColor: string;
  hoverFontColor: string;
}

const StyledButton = styled.button<IStyledButtonProps>`
  background-color: ${(props) => props.backgroundColor};
  width: ${(props) => props.width};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  opacity: ${(props) => (props.disabled ? "0.4" : "1")};
  font-size: ${(props) => props.fontSize};
  border-radius: 5px;
  color: ${(props) => props.fontColor};
  border-width: ${(props) => props.borderWidth};
  border-color: ${(props) => props.borderColor};
  border-style: solid;
  :hover {
    background-color: ${(props) => props.hoverBackgroundColor};
    border-color: ${(props) => props.hoverBorderColor};
    color: ${(props) => props.hoverFontColor};
    transition: 0.3s ease-in-out;
    cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  }

  &.active {
    background-color: ${(props) => props.hoverBackgroundColor};
    border-color: ${(props) => props.hoverBorderColor};
    transition: 0.3s ease-in-out;
    color: ${(props) => props.hoverFontColor};
  }
  svg {
    margin-right: 12px;
  }
`;

interface ButtonProps {
  fullWidth?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "tertiary"
    | "confirm"
    | "danger"
    | "ghost"
    | "ghostColor";
  fontWeight?: string;
  label: string;
  margin?: string;
  width?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  active?: boolean;
  disabled?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export const ButtonText = ({
  size = "md",
  variant = "default",
  fullWidth = false,
  fontWeight,
  margin = "0px 0px",
  label,
  active = false,
  disabled = false,
  onClick,
  width = undefined,
  ...props
}: ButtonProps) => {
  let padding = "0px";
  let fontSize = "14px";
  let backgroundColor = "white";
  let fontColor = "";
  let borderWidth = "1px";
  let borderColor = "";
  let borderStyle = "soild";
  let hoverBackgroundColor = "inherit";
  let hoverBorderColor = "inherit";
  let hoverFontColor = "inherit";

  // about size
  switch (size) {
    case "sm":
      padding = "10px 16px";
      fontSize = "14px";
      break;
    case "md":
      padding = "11px 20px";
      fontSize = "14px";
      break;
    case "lg":
      padding = "12px 24px";
      fontSize = "16px";
      break;
    case "xl":
      padding = "14px 30px";
      fontSize = "20px";
      break;
  }
  // about full width
  if (fullWidth) {
    width = "100%";
  }
  // about style
  switch (variant) {
    case "default":
      backgroundColor = lightTheme.white;
      fontColor = lightTheme.fontColor;
      borderStyle = "soild";
      borderWidth = "1px";
      borderColor = lightTheme.borderColor;
      hoverBackgroundColor = lightTheme.white;
      hoverBorderColor = lightTheme.gray;
      hoverFontColor = lightTheme.fontColorDark;
      break;
    case "primary":
      backgroundColor = lightTheme.primary;
      fontColor = lightTheme.white;
      borderStyle = "soild";
      borderWidth = "1px";
      borderColor = lightTheme.primary;
      hoverBackgroundColor = lightTheme.primaryDark;
      hoverBorderColor = lightTheme.primaryDark;
      hoverFontColor = lightTheme.white;
      break;
    case "secondary":
      backgroundColor = lightTheme.white;
      fontColor = lightTheme.primary;
      borderStyle = "soild";
      borderWidth = "1px";
      borderColor = lightTheme.primary;
      hoverBackgroundColor = lightTheme.primary;
      hoverBorderColor = lightTheme.primary;
      hoverFontColor = lightTheme.white;
      break;
    case "tertiary":
      backgroundColor = lightTheme.white;
      fontColor = lightTheme.fontColor;
      borderStyle = "soild";
      borderWidth = "1px";
      borderColor = lightTheme.white;
      hoverBackgroundColor = lightTheme.bgColorLight;
      hoverBorderColor = lightTheme.bgColorLight;
      hoverFontColor = lightTheme.fontColor;
      if (active) {
        backgroundColor = lightTheme.bgColorLight;
        fontColor = lightTheme.primary;
        borderStyle = "soild";
        borderWidth = "1px";
        borderColor = lightTheme.white;
        hoverBackgroundColor = lightTheme.bgColorLight;
        hoverBorderColor = lightTheme.bgColorLight;
        hoverFontColor = lightTheme.primary;
      }
      break;
    case "confirm":
      backgroundColor = lightTheme.blue;
      fontColor = lightTheme.white;
      borderStyle = "soild";
      borderWidth = "1px";
      borderColor = lightTheme.blue;
      hoverBackgroundColor = lightTheme.blueDark;
      hoverBorderColor = lightTheme.blueDark;
      hoverFontColor = lightTheme.white;
      break;
    case "danger":
      backgroundColor = lightTheme.white;
      fontColor = lightTheme.danger;
      borderStyle = "soild";
      borderWidth = "1px";
      borderColor = lightTheme.danger;
      hoverBackgroundColor = lightTheme.danger;
      hoverBorderColor = lightTheme.danger;
      hoverFontColor = lightTheme.white;
      break;
    case "ghost":
      backgroundColor = lightTheme.white;
      fontColor = lightTheme.fontColor;
      borderStyle = "soild";
      borderWidth = "1px";
      borderColor = lightTheme.white;
      hoverBackgroundColor = lightTheme.bgColor;
      hoverBorderColor = lightTheme.bgColor;
      hoverFontColor = lightTheme.fontColor;
      break;
    case "ghostColor":
      backgroundColor = lightTheme.white;
      fontColor = lightTheme.primary;
      borderStyle = "soild";
      borderWidth = "1px";
      borderColor = lightTheme.white;
      hoverBackgroundColor = lightTheme.bgColor;
      hoverBorderColor = lightTheme.bgColor;
      hoverFontColor = lightTheme.primaryDark;
      break;
  }

  return (
    <StyledButton
      data-testId="test-button-text"
      backgroundColor={backgroundColor}
      fontSize={fontSize}
      width={width}
      padding={padding}
      margin={margin}
      fontColor={fontColor}
      hoverBackgroundColor={hoverBackgroundColor}
      borderWidth={borderWidth}
      borderColor={borderColor}
      borderStyle={borderStyle}
      hoverBorderColor={hoverBorderColor}
      hoverFontColor={hoverFontColor}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {label}
    </StyledButton>
  );
};
