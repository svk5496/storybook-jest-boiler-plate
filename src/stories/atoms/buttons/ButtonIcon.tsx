import React, { ReactNode } from "react";
import styled from "styled-components";
import { lightTheme } from "../../../styles";

interface IStyledButtonProps {
  padding: string;
  width: string | undefined;
  backgroundColor: string;
  iconColor: string;
  hoverBackgroundColor: string;
  borderWidth: string;
  borderColor: string;
  borderStyle: string;
  hoverBorderColor: string;
  hoverIconColor: string;
}

const StyledButton = styled.button<IStyledButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.backgroundColor};
  width: ${(props) => props.width};
  padding: ${(props) => props.padding};
  border-radius: 5px;
  border-width: ${(props) => props.borderWidth};
  border-color: ${(props) => props.borderColor};
  border-style: none;
  :hover {
    background-color: ${(props) => props.hoverBackgroundColor};
    border-color: ${(props) => props.hoverBorderColor};
    transition: 0.3s ease-in-out;
    cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  }

  &.active {
    background-color: ${(props) => props.hoverBackgroundColor};
    border-color: ${(props) => props.hoverBorderColor};
    transition: 0.3s ease-in-out;
    color: ${(props) => props.hoverIconColor};
  }
  svg {
    color: ${(props) => props.iconColor};
    :hover {
      color: ${(props) => props.hoverIconColor};
      transition: 0.3s ease-in-out;
    }
  }
`;

interface ButtonProps {
  icon: ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "primary" | "danger" | "ghost";
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const ButtonIcon = ({
  icon,
  size = "md",
  variant = "default",
  onClick,
  ...props
}: ButtonProps) => {
  let padding = "0px";
  let width = undefined;
  let backgroundColor = "inherit";
  let iconColor = "";
  let borderWidth = "1px";
  let borderColor = "";
  let borderStyle = "soild";
  let hoverBackgroundColor = lightTheme.bgGray;
  let hoverBorderColor = "inherit";
  let hoverIconColor = "inherit";

  // about size
  switch (size) {
    case "sm":
      padding = "4px";
      break;
    case "md":
      padding = "6px";
      break;
    case "lg":
      padding = "10px";
      break;
  }

  // about style
  switch (variant) {
    case "default":
      backgroundColor = lightTheme.white;
      iconColor = lightTheme.fontColor;
      borderStyle = "soild";
      borderWidth = "1px";
      borderColor = lightTheme.borderColor;
      hoverBackgroundColor = lightTheme.bgGray;
      hoverBorderColor = lightTheme.gray;
      hoverIconColor = lightTheme.fontColorDark;
      break;
    case "primary":
      backgroundColor = lightTheme.white;
      iconColor = lightTheme.blue;
      borderStyle = "soild";
      borderWidth = "1px";
      borderColor = lightTheme.blue;
      hoverBackgroundColor = lightTheme.blueLight;
      hoverBorderColor = "inherit";
      hoverIconColor = lightTheme.blue;
      break;
    case "danger":
      backgroundColor = lightTheme.white;
      iconColor = lightTheme.danger;
      borderStyle = "soild";
      borderWidth = "1px";
      borderColor = lightTheme.danger;
      hoverBackgroundColor = lightTheme.danger;
      hoverBorderColor = lightTheme.danger;
      hoverIconColor = lightTheme.white;
      break;
    case "ghost":
      backgroundColor = lightTheme.white;
      iconColor = lightTheme.fontColor;
      borderStyle = "soild";
      borderWidth = "1px";
      borderColor = lightTheme.white;
      hoverBackgroundColor = lightTheme.white;
      hoverBorderColor = lightTheme.white;
      hoverIconColor = lightTheme.primary;
      break;
  }

  return (
    <StyledButton
      type="button"
      backgroundColor={backgroundColor}
      width={width}
      padding={padding}
      iconColor={iconColor}
      hoverBackgroundColor={hoverBackgroundColor}
      borderWidth={borderWidth}
      borderColor={borderColor}
      borderStyle={borderStyle}
      hoverBorderColor={hoverBorderColor}
      hoverIconColor={hoverIconColor}
      onClick={onClick}
      {...props}
    >
      {icon}
    </StyledButton>
  );
};
