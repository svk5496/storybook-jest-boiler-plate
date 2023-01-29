import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { ButtonIcon } from "./ButtonIcon";
import { lightTheme } from "../../../styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "DesignSystem/Atoms/ButtonIcon",
  component: ButtonIcon,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ButtonIcon>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ButtonIcon> = (args) => (
  <ButtonIcon {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  icon: <FontAwesomeIcon icon={faGithub} size="3x"></FontAwesomeIcon>,
  variant: "primary",
};

Primary.play = async ({ canvasElement }) => {
  let canvas = within(canvasElement);
  let primaryButton = await canvas.getByRole("button");
  await expect(primaryButton).toHaveStyle(
    `background-color: ${lightTheme.white}`
  );
};

export const Default = Template.bind({});
Default.args = {
  icon: <FontAwesomeIcon icon={faGithub} size="3x"></FontAwesomeIcon>,
  variant: "default",
};

export const Large = Template.bind({});
Large.args = {
  variant: "primary",
  size: "lg",
  icon: <FontAwesomeIcon icon={faGithub} size="4x"></FontAwesomeIcon>,
};

export const Medium = Template.bind({});
Medium.args = {
  variant: "primary",
  size: "md",
  icon: <FontAwesomeIcon icon={faGithub} size="3x"></FontAwesomeIcon>,
};

export const Small = Template.bind({});
Small.args = {
  variant: "primary",
  size: "sm",
  icon: <FontAwesomeIcon icon={faGithub} size="2x"></FontAwesomeIcon>,
};
