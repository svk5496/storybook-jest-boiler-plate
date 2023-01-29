import { ApolloProvider } from "@apollo/client";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { RecoilRoot } from "recoil";
import { client } from "../../../apollo";
import SignModalTemp from "./SignUpModalTemp";

export default {
  title: "DesignSystem/Templates/SignUp/SignModalTemp",
  component: SignModalTemp,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof SignModalTemp>;

const Template: ComponentStory<typeof SignModalTemp> = (args) => (
  <RecoilRoot>
    <SignModalTemp />
  </RecoilRoot>
);

export const Primary = Template.bind({});
Primary.args = {};
