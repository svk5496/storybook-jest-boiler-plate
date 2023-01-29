import styled from "styled-components";
import { ButtonIcon } from "../../atoms/buttons/ButtonIcon";
import { ReactNode } from "react";

const SSignUpHeader = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

interface AuthHeaderProps {
  label: string;
  leftIcon?: ReactNode;
  onClickLeft?: () => void;
  rightIcon?: ReactNode;
  onClickRight?: () => void;
}

function AuthHeader({
  label,
  leftIcon,
  onClickLeft,
  rightIcon,
  onClickRight,
}: AuthHeaderProps) {
  return (
    <SSignUpHeader>
      <div>
        {leftIcon !== undefined ? (
          <ButtonIcon icon={leftIcon} onClick={onClickLeft}></ButtonIcon>
        ) : null}
      </div>
      <span>{label}</span>
      <div>
        {rightIcon !== undefined ? (
          <ButtonIcon icon={rightIcon} onClick={onClickRight}></ButtonIcon>
        ) : null}
      </div>{" "}
    </SSignUpHeader>
  );
}
export default AuthHeader;
