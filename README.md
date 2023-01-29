# dependencies

1. typescript
2. React-router-dom
3. styled-component
4. recoil
5. jest
6. storybook
7. react-hook-form

# dependency setup

1. CRA로 타입스크립트 리액트앱 실행

```
npx create-react-app my-app --template typescript
```

2. react-router-dom

```
npm install --save react-router-dom@5.3.4
```

3. install styled-components

```
npm i --save-dev @types/styled-components styled-components
npm i -D styled-reset
add styled.d.ts
add fonts.d.ts
app.tsx파일 ThemeProvide로 감싸기
```

4. install Recoil

```
npm i -D recoil
```

5. install jest

```
npm install -D jest @types/jest ts-jest
script 파일 test:jest로 변경
npm install --save-dev @babel/preset-typescript
```

6. install storybook

```
npx storybook init --> initialize storybook

//테스트 러너에 관한 라이브러리
npm install @storybook/test-runner --save-dev
npm install @storybook/addon-a11y --save-dev
npm install @storybook/jest

//아이콘 관련 라이브러리
@fortawesome/fontawesome-svg-core
@fortawesome/free-brands-svg-icons
@fortawesome/free-regular-svg-icons
@fortawesome/free-solid-svg-icons
@fortawesome/react-fontawesome
```
