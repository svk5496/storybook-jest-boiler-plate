import { ThemeProvider } from "styled-components";
import { lightTheme } from "../src/styles";
import React from "react";
import { MockedProvider } from "@apollo/client/testing";

export const decorators = [
  (Story) => (
    <ThemeProvider theme={lightTheme}>
      <Story />
    </ThemeProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  apolloClient: {
    MockedProvider,
    // any props you want to pass to MockedProvider on every story
  },
  a11y: {
    // Optional selector to inspect
    element: "#root",
    config: {
      rules: [
        {
          // The autocomplete rule will not run based on the CSS selector provided
          id: "autocomplete-valid",
          selector: '*:not([autocomplete="nope"])',
        },
        {
          // Setting the enabled option to false will disable checks for this particular rule on all stories.
          id: "image-alt",
          enabled: false,
        },
        {
          //ignore color contrast
          id: "color-contrast",
          enabled: false,
        },
      ],
    },
    // Axe's options parameter
    options: {},
    // Optional flag to prevent the automatic check
    manual: false,
  },
};
