import styled from "styled-components";
import { SubmitHandler, useForm } from "react-hook-form";
import { ButtonText } from "../stories/atoms/buttons/ButtonText";
import { Input } from "../stories/atoms/inputs/Input";
import { useHistory } from "react-router";
import { routes } from "./routes";

const Base = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignUpWindow = styled.div`
  width: 100%;
  max-width: 400px;
  max-width: 500px;
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

interface ISignUpProps {
  korName: string;
  phone: string;
  email: string;
  password: string;
}

function SignUp() {
  const history = useHistory();
  const { register, handleSubmit, formState, setError } =
    useForm<ISignUpProps>();

  const onSubmitValid: SubmitHandler<ISignUpProps> = (data) => {
    const existId = sessionStorage.getItem("KEY_ID");
    if (existId) {
      setError("email", { message: "아이디가 존재합니다" });
    } else {
      sessionStorage.setItem("KEY_ID", data.email);
      sessionStorage.setItem("KEY_PASSWORD", data.password);
      history.push(routes.login);
    }
  };

  return (
    <Base>
      <SignUpWindow>
        <h3>회원가입</h3>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            label="이름"
            errorMessage={formState.errors?.korName?.message}
            hasError={Boolean(formState.errors?.korName?.message)}
          >
            <input
              {...register("korName", {
                required: "이름을 입력해주세요",
                pattern: {
                  value: /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/,
                  message: "한글만 입력 가능합니다",
                },
              })}
              name="korName"
              type="text"
              placeholder="이름"
            ></input>
          </Input>
          <Input
            label="전화번호"
            errorMessage={formState.errors?.phone?.message}
            hasError={Boolean(formState.errors?.phone?.message)}
          >
            <input
              {...register("phone", {
                required: "전화번호를 입력해주세요",
                pattern: {
                  value: /[0-9]/,
                  message: "-없이 숫자만 입력해주세요",
                },
                minLength: {
                  value: 10,
                  message: "전화번호를 제대로 입력해주세요",
                },
                maxLength: {
                  value: 11,
                  message:
                    "전화번호는 11자리가 최대입니다, -없이 숫자만 입력해주세요",
                },
              })}
              name="phone"
              type="phone"
              placeholder="전화번호"
            ></input>
          </Input>
          <Input
            label="아이디"
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
              name="email"
              type="text"
              placeholder="이메일"
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
              name="password"
              type="password"
              placeholder="비밀번호"
            ></input>
          </Input>

          <ButtonText
            label="회원가입"
            fullWidth={true}
            variant="primary"
          ></ButtonText>
        </form>
      </SignUpWindow>
    </Base>
  );
}

export default SignUp;
