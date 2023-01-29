import { ComponentStory, ComponentMeta } from "@storybook/react";
import { RecoilRoot } from "recoil";
import CreateAccountTemp from "./CreateAccountTemp";

export default {
  title: "DesignSystem/Templates/SignUp/CreateAccountTemp",
  component: CreateAccountTemp,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof CreateAccountTemp>;

const Template: ComponentStory<typeof CreateAccountTemp> = (args) => (
  <RecoilRoot>
    <CreateAccountTemp />
  </RecoilRoot>
);

export const Primary = Template.bind({});
Primary.args = {};
