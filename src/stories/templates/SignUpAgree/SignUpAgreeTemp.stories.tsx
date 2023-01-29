import { ApolloProvider } from "@apollo/client";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { RecoilRoot } from "recoil";
import { client } from "../../../apollo";
import SignUpAgreeTemp from "./SignUpAgreeTemp";

export default {
  title: "DesignSystem/Templates/SignUp/SignUpAgreeTemp",
  component: SignUpAgreeTemp,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof SignUpAgreeTemp>;

const Template: ComponentStory<typeof SignUpAgreeTemp> = (args) => (
  <RecoilRoot>
    <SignUpAgreeTemp />
  </RecoilRoot>
);

export const Primary = Template.bind({});
Primary.args = {};
