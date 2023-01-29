import styled from "styled-components";
import { useForm } from "react-hook-form";
import { gql, useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { useHistory } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { ButtonText } from "../../atoms/buttons/ButtonText";
import { useRecoilState } from "recoil";
import { Input } from "../../atoms/inputs/Input";
import {
  abirthDate,
  aEmail,
  aGender,
  aKorName,
  aPassword,
  aPasswordConfirm,
  aPhone,
  aSignUpStep,
} from "../../pages/SignUp/SignUp.Atom";
import AuthHeader from "../../molecules/headers/AuthHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { routes } from "../../../pages/routes";

const Base = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
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
    margin-bottom: 10px;
  }
`;

const HeaderBox = styled.div`
  width: 100%;
  margin-bottom: 30px;
`;

const SignUpForm = styled.form`
  width: 100%;
  display: flex;
  overflow-y: auto;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const CREATE_ACCOUNT_MUTATION = gql`
  mutation CreateAccount(
    $korName: String!
    $username: String!
    $password: String!
    $birthYear: String!
    $birthDate: String!
    $gender: String!
    $phone: String!
  ) {
    createAccount(
      korName: $korName
      username: $username
      password: $password
      birthYear: $birthYear
      birthDate: $birthDate
      gender: $gender
      phone: $phone
    ) {
      ok
      error
    }
  }
`;

export const ID_VALIDATION_QUERY = gql`
  query ValidationEmail($email: String) {
    validationEmail(email: $email) {
      id
      email
    }
  }
`;

interface IEmailAuthProps {
  korName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  birthDate: string;
  gender: string;
  phone: string;
  step: number;
  agreement: boolean;
  authModal: boolean;
  authNumber: string;
  isUser: boolean;
}

function CreateAccountTemp() {
  const history = useHistory();
  const [step, setStep] = useRecoilState(aSignUpStep);
  const [email, setEmail] = useRecoilState(aEmail);
  const [password, setPassword] = useRecoilState(aPassword);
  const [passwordConfirm, setPasswordConfirm] =
    useRecoilState(aPasswordConfirm);
  const [name, setName] = useRecoilState(aKorName);
  const [birthDate, setBirthDate] = useRecoilState(abirthDate);
  const [gender, setGender] = useRecoilState(aGender);
  const [phone, setPhone] = useRecoilState(aPhone);

  const { data } = useQuery(ID_VALIDATION_QUERY, {
    variables: {
      email,
    },
  });

  const onCompleted = (data: any) => {
    const { email, password } = getValues();
    const {
      createAccount: { ok },
    } = data;
    if (!ok) {
      return;
    }
    toast.success(`계정이 생성되었습니다 ! 로그인 해주세요!`, {
      autoClose: 2000,
      position: "top-right",
    });
    history.push(routes.login, {
      email,
      password,
    });
  };

  const { register, handleSubmit, getValues, formState } =
    useForm<IEmailAuthProps>({
      mode: "onChange",
    });

  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });

  const onSubmitValid = (data: IEmailAuthProps) => {
    setStep(step + 1);
    if (passwordConfirm !== "" && !formState.errors?.passwordConfirm?.message) {
      const year = birthDate.substring(0, 2);
      const date = birthDate.substring(2, 6);
      let genderEng = "";
      if (gender === "1" || "3") {
        genderEng = "male";
      } else {
        genderEng = "female";
      }
      if (loading) {
        return;
      }
      createAccount({
        variables: {
          korName: name,
          username: data.email,
          password: password,
          birthYear: year,
          birthDate: date,
          gender: genderEng,
          phone: phone,
        },
      });
    }
  };

  return (
    <Base>
      <AuthWindow>
        <ToastContainer></ToastContainer>

        <AuthHeader
          label="아이디 생성"
          leftIcon={<FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>}
          onClickLeft={() => history.push(routes.login)}
        ></AuthHeader>
        <HeaderBox>
          <h4>로그인에 사용할</h4>
          <h4>이메일, 비밀번호를 입력해주세요</h4>
        </HeaderBox>

        <SignUpForm onSubmit={handleSubmit(onSubmitValid)}>
          {step > 3 ? (
            <Input
              label="이메일"
              errorMessage={formState.errors?.email?.message}
              hasError={Boolean(formState.errors?.email?.message)}
            >
              <input
                {...register("email", {
                  required: "이메일을 입력해주세요",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
                    message: "이메일 형식이 아닙니다",
                  },
                  onChange(event) {
                    setEmail(event.target.value);
                  },
                  validate: (value) =>
                    value !== data?.validationEmail?.email ||
                    "해당 이메일로 가입된 아이디가 존재합니다",
                })}
                name="email"
                type="text"
                data-testid="test-email-input"
                placeholder="이메일"
              ></input>
            </Input>
          ) : null}

          {step > 4 ? (
            <Input
              label="비밀번호"
              errorMessage={formState.errors?.password?.message}
              hasError={Boolean(formState.errors?.password?.message)}
            >
              <input
                {...register("password", {
                  required: "비밀번호를 입력해주세요",
                  pattern: {
                    value: /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g,
                    message: "특수문자를 포함하셔야 합니다",
                  },
                  minLength: {
                    value: 8,
                    message: "비밀번호는 8자리 이상이여야 합니다",
                  },
                  onChange(event) {
                    setPassword(event.target.value);
                  },
                })}
                name="password"
                data-testid="test-password-input"
                type="password"
                placeholder="비밀번호"
              ></input>
            </Input>
          ) : null}

          {step > 5 ? (
            <>
              <Input
                label="비밀번호 확인"
                errorMessage={formState.errors?.passwordConfirm?.message}
                hasError={Boolean(formState.errors?.passwordConfirm?.message)}
              >
                <input
                  {...register("passwordConfirm", {
                    required: "문자를 입력해주세요",
                    validate: (value) =>
                      value === password || "비밀번호가 일치하지 않습니다",
                    onChange(event) {
                      setPasswordConfirm(event.target.value);
                    },
                  })}
                  name="passwordConfirm"
                  data-testid="test-password-confirm-input"
                  type="password"
                  placeholder="비밀번호 확인"
                ></input>
              </Input>

              <ButtonText variant="confirm" label="회원가입"></ButtonText>
            </>
          ) : (
            <ButtonText variant="confirm" label="다음"></ButtonText>
          )}
        </SignUpForm>
      </AuthWindow>
    </Base>
  );
}

export default CreateAccountTemp;
