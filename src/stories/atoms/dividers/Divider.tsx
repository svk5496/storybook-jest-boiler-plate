import React, { ReactNode } from "react";
import styled from "styled-components";
import { lightTheme } from "../../../styles";

const StyledDiv = styled.div`
  width: 100%;
  margin: 10px 0px;
  height: 1px;
  background-color: ${(props) => props.theme.borderColor};
`;

interface ButtonProps {}

export const Divider = ({ ...props }: ButtonProps) => {
  return <StyledDiv {...props}></StyledDiv>;
};
