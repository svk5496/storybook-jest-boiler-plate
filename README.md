# 안녕하세요 react, storybook, jest 테스팅 예제에 오신걸 환영합니다

이 프로젝트에선 백엔드를 연결하지 않았기 때문에, 실제로 로그인이나 로그아웃이 불가능하며, 스토리북을 통해 unit test와 E2E 테스트가 각각 어떻게 이뤄지는지 등을 보실 수 있습니다

# How to clone

## 1. 클론 할 주소를 복사합니다

```
git clone https://github.com/svk5496/storybook-jest-boiler-plate.git
```

## 2. 복사할 디렉토리로 가서 붙여넣기를 합니다

## 3. node module package들을 인스톨 합니다

```
npm install
```

## 4. 가장 상위폴더(src와 같은 레벨)에 .storybook 폴더를 만듭니다

    <img src="https://velog.s3.ap-northeast-2.amazonaws.com/jest-github.png"></img>

## 5. 폴더 안에 두개의 파일을 추가합니다

main.js

```javascript
module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-create-react-app",
    "@storybook/addon-a11y",
    "@storybook/addon-coverage",
    "storybook-addon-apollo-client",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
  features: {
    interactionDebugger: true,
  },
};
```

preview.js

```javascript
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
```

## 6. 명령어

```
npm run start : 리액트 앱 실행
npm run storybook : storybook 실행
```

## 7. 홈페이지가 제대로 작동하지 않을시

package.json 파일을 확인하시고 아래 파일들을 지우시면 localhost에서 잘 작동합니다.

```

  "description": "1. typescript 2. React-router-dom 3. styled-component 4. recoil 5. jest 6. storybook 7. react-hook-form",
  "main": "jest.config.js",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/svk5496/storybook-jest-boiler-plate.git"
  },
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/svk5496/storybook-jest-boiler-plate/issues"
  },
  "homepage": "https://github.com/svk5496/storybook-jest-boiler-plate#readme"


```
