import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import AuthHeader from "./AuthHeader";
import { within } from "@storybook/testing-library";

export default {
  title: "DesignSystem/Molecules/Header/AuthHeader",
  component: AuthHeader,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof AuthHeader>;

const Template: ComponentStory<typeof AuthHeader> = (args) => (
  <AuthHeader {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  label: "회원가입",
};

Primary.play = async ({ canvasElement }) => {
  let canvas = within(canvasElement);
  canvas.findByText("회원가입");
};
