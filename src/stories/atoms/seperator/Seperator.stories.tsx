import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Seperator } from "./Seperator";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "DesignSystem/Atoms/Seperator",
  component: Seperator,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Seperator>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Seperator> = (args) => (
  <Seperator {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {};

// Primary.play = async ({ canvasElement }) => {
//   let canvas = within(canvasElement);
//   let primaryButton = await canvas.getByRole("button", { name: /Button/i });
//   await expect(primaryButton.innerText).toBe("Button"); // "버튼 안에 텍스트가 버튼인지 검사 "
//   await expect(primaryButton).toHaveStyle(
//     `background-color: ${lightTheme.primary}`
//   ); // "버튼 안에 텍스트가 버튼인지 검사 "
// };
