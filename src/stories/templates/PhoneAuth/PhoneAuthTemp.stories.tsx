import { ComponentStory, ComponentMeta } from "@storybook/react";
import { RecoilRoot } from "recoil";
import PhoneAuthTemp from "./PhoneAuthTemp";

export default {
  title: "DesignSystem/Templates/SignUp/PhoneAuthTemp",
  component: PhoneAuthTemp,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof PhoneAuthTemp>;

const Template: ComponentStory<typeof PhoneAuthTemp> = (args) => (
  <RecoilRoot>
    <PhoneAuthTemp />
  </RecoilRoot>
);

export const Primary = Template.bind({});
Primary.parameters = {};
