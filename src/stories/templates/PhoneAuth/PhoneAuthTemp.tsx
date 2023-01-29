import styled from "styled-components";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { ButtonText } from "../../atoms/buttons/ButtonText";
import { Input } from "../../atoms/inputs/Input";
import { useRecoilState } from "recoil";
import {
  aAuthModal,
  aAuthNumber,
  abirthDate,
  aGender,
  aKorName,
  aPhone,
  aSignUpStep,
} from "../../pages/SignUp/SignUp.Atom";
import SignUpModalTemp from "../SignUpModal/SignUpModalTemp";
import SignUpAgreeTemp from "../SignUpAgree/SignUpAgreeTemp";
import AuthHeader from "../../molecules/headers/AuthHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { routes } from "../../../pages/routes";
import { useHistory } from "react-router-dom";

const Base = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  @media screen and (max-width: 600px) {
    justify-content: center;
  }
  @media screen and (min-width: 601px) {
    align-items: center;
    justify-content: center;
  }
`;

const AuthWindow = styled.div`
  width: 100%;
  max-width: 420px;
  min-height: 700px;
  padding: 10px 20px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  h4 {
    margin-bottom: 32px;
  }
`;

const AuthStyledInput = styled.div`
  border: 0.5px solid ${(props) => props.theme.borderColor};
  height: 54px;
  border-radius: 5px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  span {
    font-size: 16px;
  }
  label {
    font-size: 10px;
    padding-top: 10px;
    padding-left: 14px;
    color: grey;
  }
  //number 옆에 스피너 없애기
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const SignUpInput = styled.input`
  padding: 0px 14px;
  height: 30px;
  width: 100px;
`;

const SignUpForm = styled.form`
  width: 100%;
  display: flex;
  overflow-y: auto;
  flex-direction: column;
  margin-bottom: 20px;
`;

const SocialSecondInput = styled.input`
  width: 13px;
  padding-left: 20px;
`;

const SignUpInputBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
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

export const CALL_NAVER_API_MUTATION = gql`
  mutation callNaverSMS($phone: String!) {
    callNaverSMS(phone: $phone) {
      ok
      authNumber
      error
    }
  }
`;

export const VALIDATION_QUERY = gql`
  query ValidationPhone($phone: String) {
    validationPhone(phone: $phone) {
      id
      phone
    }
  }
`;

interface IPhoneAuthProps {
  korName: string;
  birthDate: string;
  gender: string;
  phone: string;
}

function PhoneAuthTemp() {
  const history = useHistory();
  const [signUpStep, setSignUpStep] = useRecoilState(aSignUpStep);
  const [name, setName] = useRecoilState(aKorName);
  const [birthDate, setBirthDate] = useRecoilState(abirthDate);
  const [gender, setGender] = useRecoilState(aGender);
  const [phone, setPhone] = useRecoilState(aPhone);
  const [authModal, setAuthModal] = useRecoilState(aAuthModal);
  const [authNumber, setAuthNumber] = useRecoilState(aAuthNumber);

  const onCompleted = (data: any) => {
    const {
      callNaverSMS: { ok, authNumber },
    } = data;
    if (!ok) {
      return;
    } else {
      setAuthModal(true);
      setAuthNumber(authNumber);
    }
  };

  const [callNaverSMS] = useMutation(CALL_NAVER_API_MUTATION, {
    onCompleted,
  });

  const { data } = useQuery(VALIDATION_QUERY, {
    variables: {
      phone: phone,
    },
  });

  const { register, handleSubmit, formState } = useForm<IPhoneAuthProps>();

  const onSubmitValid = (data: IPhoneAuthProps) => {
    if (phone === "") {
      setSignUpStep(signUpStep + 1);
    } else if (phone !== "" && data.phone === phone) {
      callNaverSMS({
        variables: {
          phone,
        },
      });
    }
  };

  return (
    <Base>
      {authModal ? <SignUpModalTemp></SignUpModalTemp> : null}

      <AuthWindow>
        <AuthHeader
          label="아이디 생성"
          leftIcon={<FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>}
          onClickLeft={() => history.push(routes.login)}
        ></AuthHeader>{" "}
        <h4>인증정보를 입력해주세요</h4>
        <SignUpForm onSubmit={handleSubmit(onSubmitValid)}>
          {signUpStep > 0 ? (
            <Input
              label="이름"
              errorMessage={formState.errors?.korName?.message}
              hasError={Boolean(formState.errors?.korName?.message)}
            >
              <input
                {...register("korName", {
                  required: "이름을 입력해주세요",
                  pattern: {
                    value: /^[가-힣]+$/,
                    message: "한글만 입력해주세요",
                  },
                  minLength: {
                    value: 2,
                    message: "2글자 이상 입력해주세요",
                  },
                  onChange(event) {
                    setName(event.target.value);
                  },
                })}
                type="text"
                placeholder="이름"
                data-testid="test-name-input"
              ></input>
            </Input>
          ) : null}

          {signUpStep > 1 ? (
            <>
              <AuthStyledInput>
                <label>주민등록번호 앞 7자리</label>
                <SignUpInputBox>
                  <SignUpInput
                    {...register("birthDate", {
                      required: "주민등록번호를 앞 6자리를 입력해주세요",
                      minLength: {
                        value: 6,
                        message: "주민등록번호 앞 6자리를 정확히 입력해주세요.",
                      },
                      maxLength: {
                        value: 6,
                        message: "주민등록번호 앞 6자리를 정확히 입력해주세요.",
                      },
                      pattern: {
                        value:
                          /([0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[1,2][0-9]|3[0,1]))/,
                        message: "주빈등록번호 앞 6자리를 정확히 입력해주세요",
                      },
                      onChange(event) {
                        setBirthDate(event.target.value);
                      },
                    })}
                    type="text"
                    data-testid="test-birth-input"
                    placeholder="●●●●●●"
                  />
                  <span>-</span>
                  <SocialSecondInput
                    {...register("gender", {
                      required: "주민등록번호 뒤 1자리를 정확히 입력해주세요.",

                      minLength: {
                        value: 1,
                        message: "주민등록번호 뒤 1자리를 정확히 입력해주세요.",
                      },
                      maxLength: {
                        value: 1,
                        message: "주민등록번호 뒤 1자리를 정확히 입력해주세요.",
                      },
                      pattern: {
                        value: /^[1-4]+$/,
                        message: "1~4만 입력 가능합니다",
                      },
                      onChange(event) {
                        setGender(event.target.value);
                      },
                    })}
                    type="text"
                    data-testid="test-gender-input"
                    placeholder="●"
                  />
                  <span>●●●●●●</span>
                </SignUpInputBox>
              </AuthStyledInput>
              <SignUpErrorBox>
                <span>{formState.errors?.birthDate?.message}</span>
                <span>{formState.errors?.gender?.message}</span>
              </SignUpErrorBox>
            </>
          ) : null}

          {signUpStep > 2 ? (
            <Input
              label="핸드폰 번호"
              errorMessage={formState.errors?.phone?.message}
              hasError={Boolean(formState.errors?.phone?.message)}
            >
              <input
                {...register("phone", {
                  required: "핸드폰 번호를 입력해주세요.",
                  minLength: {
                    value: 10,
                    message: "핸드폰 번호를 정확히 입력해주세요.",
                  },
                  maxLength: {
                    value: 11,
                    message: "핸드폰 번호를 정확히 입력해주세요.",
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "숫자만 입력해주세요",
                  },
                  onChange(event) {
                    setPhone(event.target.value);
                  },
                  validate: (value) =>
                    value !== data?.validationPhone?.phone ||
                    "해당 핸드폰 번호로 가입된 아이디가 존재합니다",
                })}
                type="text"
                data-testid="test-phone-input"
                placeholder="핸드폰 번호"
              ></input>
            </Input>
          ) : (
            <ButtonText
              margin="10px 0px"
              variant="confirm"
              label="다음"
            ></ButtonText>
          )}
          {signUpStep === 3 ? <SignUpAgreeTemp></SignUpAgreeTemp> : null}
        </SignUpForm>
      </AuthWindow>
    </Base>
  );
}

export default PhoneAuthTemp;
