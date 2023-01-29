import React, { ReactNode } from "react";
import styled from "styled-components";
import { lightTheme } from "../../../styles";

interface StyledDivProps {
  margin: string;
}

const StyledDiv = styled.div<StyledDivProps>`
  width: 100%;
  margin: ${(props) => props.margin};
  height: 1px;
  background-color: ${(props) => props.theme.borderColor};
`;

interface SeperatorProps {
  margin?: string;
}

export const Seperator = ({
  margin = "10px 0px",
  ...props
}: SeperatorProps) => {
  return <StyledDiv margin={margin} {...props}></StyledDiv>;
};
