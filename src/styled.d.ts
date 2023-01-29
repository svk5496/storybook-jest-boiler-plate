import "styled-components";

declare module "*.ttf";

declare module "styled-components" {
  export interface DefaultTheme {
    white: string;
    danger: string;
    primary: string;
    primaryDark: string;
    primaryLight: string;
    secondaryLight: string;
    secondary: string;
    secondaryDark: string;
    borderColor: string;
    gray: string;
    fontColorLight: string;
    fontColor: string;
    fontColorDark: string;
    fontLightGray: string;
    fontGray: string;
    fontDarkGray: string;
    blueLight: string;
    blue: string;
    blueDark: string;
    bgColorLight: string;
    bgColor: string;
    bgColorDark: string;
    bgGrayLight: string;
    bgGray: string;
    bgGrayDark: string;
    font_kor: string;
  }
}
