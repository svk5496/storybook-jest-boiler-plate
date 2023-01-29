import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Input } from "./Input";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

export default {
  title: "DesignSystem/Atoms/Input",
  component: Input,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: "이메일",
  errorMessage: "에러 메세지",
  fullWidth: false,
  children: (
    <input data-testId="test-email-input" type="text" placeholder="이메일" />
  ),
};

Primary.play = async ({ canvasElement }) => {
  let canvas = within(canvasElement);
  canvas.findByPlaceholderText("이메일");

  const Input = await canvas.findByTestId("test-email-input");
  await expect(Input).toHaveValue("");
  await userEvent.type(
    canvas.getByTestId("test-email-input"),
    "otter0513@naver.com"
  );
  await expect(Input).toHaveValue("otter0513@naver.com");
};
