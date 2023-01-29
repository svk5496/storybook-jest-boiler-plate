import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { keyframes } from "styled-components";
import { ButtonText } from "../../atoms/buttons/ButtonText";
import {
  aAuthModal,
  aAuthNumber,
  aSignUpStep,
} from "../../pages/SignUp/SignUp.Atom";

const Base = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const SlideUp = keyframes`
  from{
    height:0%;
  }
  to {
    height:60%;
  }
`;

const ModalBase = styled.div`
  width: 90%;
  height: 60%;
  background-color: white;
  border-radius: 20px 20px 0px 0px;
  animation: ${SlideUp} linear 0.5s;
`;

const ModalHeader = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  padding: 20px 20px;
  span {
    font-size: 16px;
    font-weight: 600;
  }
`;

const ModalBody = styled.div`
  height: 100%;
  width: 100%;

  form {
    width: 100%;
    padding: 0px 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const TextBox = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 120px;
  span {
    font-size: 20px;
    font-weight: 500;
  }
`;

interface IInputProps {
  hasError?: boolean;
}

const StyledInput = styled.input<IInputProps>`
  width: 100%;
  border-radius: 2px;
  padding: 7px 20px;
  background-color: white;
  border: 0.5px solid
    ${(props) => (props.hasError ? "tomato" : props.theme.borderColor)};
  margin-top: 5px;
  box-sizing: border-box;
  &::placeholder {
    font-size: 12px;
  }
  &:focus {
    border-color: ${(props) => props.theme.primary};
  }
  -webkit-appearance: none;
`;

const AuthInputBox = styled.div`
  height: 100px;
  display: flex;
  flex-direction: column;
`;

const AuthInput = styled(StyledInput)`
  border: 0px;
  width: 140px;
  font-size: 30px;
  text-align: center;
`;

const SignUpErrorBox = styled.div`
  height: 36px;
  width: 100%;
  padding: 0px 20px;
  color: ${(props) => props.theme.danger};
  span {
    font-size: 12px;
  }
`;

interface IAuthNumberProps {
  authNumber: string;
}

function SignUpModalTemp() {
  const [authModal, setAuthModal] = useRecoilState(aAuthModal);
  const [authNumber, setAuthNumber] = useRecoilState(aAuthNumber);
  const [step, setStep] = useRecoilState(aSignUpStep);

  const handleBt = () => {
    setAuthModal(false);
  };

  const { register, handleSubmit, formState } = useForm<IAuthNumberProps>({
    mode: "onChange",
  });

  const onSubmitValid = () => {
    setAuthModal(false);
    setStep(step + 1);
  };

  return (
    <Base>
      <ModalBase>
        <ModalHeader>
          <div></div>
          <span>인증번호</span>
          <FontAwesomeIcon
            onClick={handleBt}
            cursor="pointer"
            icon={faX}
          ></FontAwesomeIcon>
        </ModalHeader>
        <ModalBody>
          <TextBox>
            <span>문자로 전송된 6자리</span>
            <br></br>
            <span>인증번호를 입력해주세요</span>
          </TextBox>
          <form onSubmit={handleSubmit(onSubmitValid)}>
            <AuthInputBox>
              <AuthInput
                {...register("authNumber", {
                  required: "문자를 입력해주세요",
                  validate: (value) =>
                    value === authNumber || "인증번호를 다시 확인해주세요",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "숫자만 입력해주세요",
                  },
                  maxLength: {
                    value: 6,
                    message: "",
                  },
                })}
                type="text"
                placeholder="●●●●●●"
                data-testid="test-auth-input"
              ></AuthInput>
              <SignUpErrorBox>
                <span>{formState.errors?.authNumber?.message!}</span>
              </SignUpErrorBox>
            </AuthInputBox>

            <ButtonText
              disabled={formState.errors?.authNumber !== undefined}
              variant="confirm"
              fullWidth={true}
              label="확인"
            ></ButtonText>
          </form>
        </ModalBody>
      </ModalBase>
    </Base>
  );
}
export default SignUpModalTemp;
