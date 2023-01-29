import { expect, jest } from "@storybook/jest";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import {
  fireEvent,
  getByText,
  waitFor,
  within,
} from "@storybook/testing-library";
import { getByTestId } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { wait } from "@testing-library/user-event/dist/utils";
import { RecoilRoot } from "recoil";
import {
  CREATE_ACCOUNT_MUTATION,
  ID_VALIDATION_QUERY,
} from "../../templates/CreateAccount/CreateAccountTemp";
import {
  CALL_NAVER_API_MUTATION,
  VALIDATION_QUERY,
} from "../../templates/PhoneAuth/PhoneAuthTemp";
import SignUpPage from "./SignUpPage";

export default {
  title: "DesignSystem/Pages/SignUp",
  component: SignUpPage,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof SignUpPage>;

const Template: ComponentStory<typeof SignUpPage> = (args) => (
  <RecoilRoot>
    <SignUpPage />
  </RecoilRoot>
);
export const Primary = Template.bind({});
Primary.parameters = {
  apolloClient: {
    mocks: [
      {
        request: {
          query: VALIDATION_QUERY,
          variables: {
            phone: "01012341234",
          },
        },
        result: {
          data: {
            validationPhone: {
              id: 10,
              phone: "01012341234",
            },
          },
        },
      },
      {
        request: {
          query: ID_VALIDATION_QUERY,
          variables: {
            email: "bb@naver.com",
          },
        },
        result: {
          data: {
            validationEmail: {
              id: 3,
              email: "bb@naver.com",
            },
          },
        },
      },
      {
        request: {
          query: CALL_NAVER_API_MUTATION,
          variables: {
            phone: "01043214321",
          },
        },
        result: {
          data: {
            callNaverSMS: {
              authNumber: "123123",
              error: null,
              ok: true,
            },
          },
        },
      },
      {
        request: {
          query: CREATE_ACCOUNT_MUTATION,
          variables: {
            korName: "홍길동",
            username: "aa@naver.com",
            password: "qwerQWER1@",
            birthYear: "91",
            birthDate: "0513",
            gender: "male",
            phone: "01043214321",
          },
        },
        result: {
          data: {
            createAccount: {
              error: null,
              ok: true,
            },
          },
        },
      },
    ],
  },
};

Primary.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const nextButton = canvas.getByRole("button", { name: /다음/ });
  // 1.이름 렌더링
  await canvas.findByPlaceholderText("이름");
  userEvent.type(canvas.getByTestId("test-name-input"), "김성호");
  fireEvent.click(nextButton);

  // 2.주민등록번호 렌더링
  await canvas.findByText("주민등록번호 앞 7자리");
  userEvent.type(canvas.getByTestId("test-birth-input"), "910513");
  userEvent.type(canvas.getByTestId("test-gender-input"), "1");
  fireEvent.click(nextButton);

  // 3. 핸드폰 번호 인풋 렌더링
  await canvas.findByPlaceholderText("핸드폰 번호");
  userEvent.click(canvas.getByRole("checkbox")); //체크박스 동의
  userEvent.type(canvas.getByTestId("test-phone-input"), "01012341234");
  expect(canvas.getByDisplayValue("01012341234")).toBeInTheDocument();

  const authButton = await canvas.findByRole("button", {
    name: /인증번호받기/,
  });

  // 4. 핸드폰 번호 중복 체크
  setTimeout(async () => {
    fireEvent.click(authButton);
    canvas.findByText(/해당 핸드폰 번호로 가입된 아이디가 존재합니다/);

    //5. Auth Modal창이 잘 열리는지 체크
    setTimeout(async () => {
      userEvent.clear(canvas.getByTestId("test-phone-input"));
      userEvent.type(canvas.getByTestId("test-phone-input"), "01043214321");
      fireEvent.click(authButton);
      await canvas.findByText(/인증번호/);

      // 6. AuthNumber 벨리데이션
      setTimeout(async () => {
        userEvent.type(canvas.getByTestId("test-auth-input"), "123123");
        const confirmButton = await canvas.findByRole("button", {
          name: /확인/,
        });
        fireEvent.click(confirmButton);

        // 7. 이메일 플레이스 홀더 체크
        await canvas.findByPlaceholderText("이메일");
        userEvent.type(canvas.getByTestId("test-email-input"), "bb@naver.com");
        const nextEmailButton = canvas.getByRole("button", { name: /다음/ });

        // 8. 이메일 중복 체크
        setTimeout(async () => {
          fireEvent.click(nextEmailButton);
          await canvas.findByText(/해당 이메일로 가입된 아이디가 존재합니다/);
          userEvent.clear(canvas.getByTestId("test-email-input"));
          userEvent.type(
            canvas.getByTestId("test-email-input"),
            "aa@naver.com"
          );
          fireEvent.click(nextEmailButton);
          // 9. 비밀번호 플레이스 홀더 체크
          await canvas.findByPlaceholderText("비밀번호");
          userEvent.type(
            canvas.getByTestId("test-password-input"),
            "qwerQWER1@"
          );
          fireEvent.click(nextEmailButton);

          // 10. 비밀번호 확인 플레이스 홀더 체크
          await canvas.findByPlaceholderText("비밀번호 확인");
          userEvent.type(
            canvas.getByTestId("test-password-confirm-input"),
            "qwerQWER1@"
          );
          // 11. 회원가입 렌더링 체크
          const nextRegisterButton = canvas.getByRole("button", {
            name: /회원가입/,
          });
          expect(nextRegisterButton).toBeInTheDocument();
        }, 500);
      }, 500);
    }, 500);
  }, 500);
};
