import styled from "styled-components";
import { SubmitHandler, useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { ButtonText } from "../../atoms/buttons/ButtonText";
import { Seperator } from "../../atoms/seperator/Seperator";
import { Input } from "../../atoms/inputs/Input";
import { routes } from "../../../pages/routes";
import { gql, useMutation } from "@apollo/client";

const Base = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginWindow = styled.div`
  width: 100%;
  max-width: 400px;
  min-height: 600px;
  padding: 40px 20px;
  height: 80%;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  h3 {
    margin-bottom: 20px;
  }
`;

const SignUpWindow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      error
    }
  }
`;

interface ILoginProps {
  email: string;
  password: string;
  result: string;
}

function LoginPage() {
  const history = useHistory();
  const { register, handleSubmit, setError, formState, getValues } =
    useForm<ILoginProps>();

  const onCompleted = (data: any) => {
    const {
      login: { ok, error, token },
    } = data;
    if (!ok) {
      setError("password", { message: error! });
    }
    if (token) {
      history.push(routes.home);
    }
  };

  const [login, { loading }] = useMutation(LOGIN_MUTATION, { onCompleted });

  const onSubmitValid: SubmitHandler<ILoginProps> = async (data) => {
    if (loading) {
      return;
    }
    // 밑에 있는 Input.name과 변수명이 같아야함.
    const { email, password } = getValues();
    login({
      variables: { email, password },
    });
  };

  const handleResgistClick = () => {
    history.push(routes.signUp);
  };
  return (
    <Base>
      <LoginWindow>
        <h3>로그인</h3>
        <form onSubmit={handleSubmit(onSubmitValid)}>
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
              })}
              type="text"
              placeholder="이메일"
              data-testid="test-email-input"
            ></input>
          </Input>
          <Input
            label="비밀번호"
            errorMessage={formState.errors?.password?.message}
            hasError={Boolean(formState.errors?.password?.message)}
          >
            <input
              {...register("password", {
                required: "비밀번호를 입력해주세요",
              })}
              type="password"
              placeholder="비밀번호"
              data-testid="test-password-input"
            ></input>
          </Input>

          <ButtonText
            label="로그인"
            fullWidth={true}
            variant="confirm"
            disabled={!formState.errors}
            data-testid="test-login-button"
          ></ButtonText>
        </form>
        <Seperator margin="20px 0px"></Seperator>
        <SignUpWindow>
          <ButtonText
            onClick={handleResgistClick}
            label="회원가입"
            fullWidth={true}
          ></ButtonText>
        </SignUpWindow>
      </LoginWindow>
    </Base>
  );
}

export default LoginPage;
