import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import LoginPage, { LOGIN_MUTATION } from "./LoginPage";
import { userEvent, within } from "@storybook/testing-library";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "DesignSystem/Pages/Login",
  component: LoginPage,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof LoginPage>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof LoginPage> = (args) => <LoginPage />;
export const Primary = Template.bind({});
Primary.parameters = {
  apolloClient: {
    mocks: [
      {
        request: {
          query: LOGIN_MUTATION,
          variables: {
            email: "otter0513@naver.com",
            password: "qwerQWER1@",
          },
        },
        result: {
          data: {
            login: {
              ok: true,
              token: "wefwf12wrwqfwq",
              error: null,
            },
          },
        },
      },
    ],
  },
};

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.type(
    canvas.getByTestId("test-email-input"),
    "otter0513@naver.com"
  );
  await userEvent.type(canvas.getByTestId("test-password-input"), "qwerQWER1@");

  setTimeout(() => {
    userEvent.click(canvas.getByTestId("test-login-button"));
  }, 1000);
};
