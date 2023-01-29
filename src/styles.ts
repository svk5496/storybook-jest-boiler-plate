import { createGlobalStyle, DefaultTheme } from "styled-components";
import reset from "styled-reset";

//Sandol
import AppleSDGothicNeoT from "./assets/fonts/appleSDGothic/AppleSDGothicNeoT.woff";
import AppleSDGothicNeoUL from "./assets/fonts/appleSDGothic/AppleSDGothicNeoUL.woff";
import AppleSDGothicNeoL from "./assets/fonts/appleSDGothic/AppleSDGothicNeoL.woff";
import AppleSDGothicNeoR from "./assets/fonts/appleSDGothic/AppleSDGothicNeoR.woff";
import AppleSDGothicNeoM from "./assets/fonts/appleSDGothic/AppleSDGothicNeoM.woff";
import AppleSDGothicNeoSB from "./assets/fonts/appleSDGothic/AppleSDGothicNeoSB.woff";
import AppleSDGothicNeoB from "./assets/fonts/appleSDGothic/AppleSDGothicNeoB.woff";
import AppleSDGothicNeoEB from "./assets/fonts/appleSDGothic/AppleSDGothicNeoEB.woff";
import AppleSDGothicNeoH from "./assets/fonts/appleSDGothic/AppleSDGothicNeoH.woff";

export const lightTheme: DefaultTheme = {
  white: "#FFFFFF",

  bgColorLight: "#FFF8ED",
  bgColor: "#FFEED6",
  bgColorDark: "#FFE2B9",

  primary: "#FB8500",
  primaryDark: "#C47501",
  primaryLight: "#dc7400",

  secondaryLight: "#8FFD66",
  secondary: "#44FB00",
  secondaryDark: "#36C900",

  borderColor: "#DBDBDB",
  gray: "#bfbfbf",

  bgGrayLight: "#FDF8F1",
  bgGray: "#F0F0F0",
  bgGrayDark: "#eaeaea",

  fontColorLight: "#606060",
  fontColor: "#404040",
  fontColorDark: "#202020",

  fontLightGray: "#E9E9E9",
  fontGray: "#8E8E8E",
  fontDarkGray: "#65665B",

  blueLight: "#E0EDFD",
  blue: "#2688D4",
  blueDark: "#0663B0",

  danger: "#FF6347",
  font_kor: "'AppleSD', sans-serif",
};

export const GlobalStyles = createGlobalStyle`

@font-face {
      font-family: "AppleSD";
      src: url(${AppleSDGothicNeoT}) format("woff");
      font-display: swap;
      font-weight:100;
    };
    @font-face {
      font-family: "AppleSD";
      src: url(${AppleSDGothicNeoUL}) format("woff");
      font-display: swap;
      font-weight:200;
    };
    @font-face {
      font-family: "AppleSD";
      src: url(${AppleSDGothicNeoL}) format("woff");
      font-display: swap;
      font-weight:300;
    };
    @font-face {
      font-family: "AppleSD";
      src: url(${AppleSDGothicNeoR}) format("woff");
      font-display: swap;
      font-weight:400;
    };
    @font-face {
      font-family: "AppleSD";
      src: url(${AppleSDGothicNeoM}) format("woff");
      font-display: swap;
      font-weight:500;
    };
    @font-face {
      font-family: "AppleSD";
      src: url(${AppleSDGothicNeoSB}) format("woff");
      font-display: swap;
      font-weight:600;
    };
    @font-face {
      font-family: "AppleSD";
      src: url(${AppleSDGothicNeoB}) format("woff");
      font-display: swap;
      font-weight:700;
    };
    @font-face {
      font-family: "AppleSD";
      src: url(${AppleSDGothicNeoEB}) format("woff");
      font-display: swap;
      font-weight:60;
    };
    @font-face {
      font-family: "AppleSD";
      src: url(${AppleSDGothicNeoH}) format("woff");
      font-display: swap;
      font-weight:900;
    };

    ${reset}
    * {
        box-sizing:border-box;
    }
    input {
        all:unset
    }
    body {
      //global
      font-family: ${(props) => props.theme.font_kor};
      color:${(props) => props.theme.fontColor};

      @media  screen and  (max-width: 600px) {
        h1{
          font-size: 30px;
          font-weight: 600;
          line-height: 1.4;
        }
        h2{
          font-size:26px;
          font-weight: 600;
          line-height: 1.4;

        }
        h3{
          font-size:20px;
          font-weight: 600;
          line-height: 1.4;

        }
        h4{
          font-size:18px;
          font-weight: 600;
          line-height: 1.4;

        }
        span{
          font-size:18px;
          font-weight: 400;
          line-height: 1.4;

        }
        p{
          font-size:16px;
          font-weight: 400;
          line-height: 1.4;

        }
        small{
          font-size:16px;
          font-weight: 400;
          line-height: 1.4;
        }
        
      }
      @media  screen and  (min-width: 601px) {
        h1{
          font-size: 48px;
          font-weight: 600;
          line-height: 1.4;
        }
        h2{
          font-size:36px;
          font-weight: 600;
          line-height: 1.4;
        }
        h3{
          font-size:24px;
          font-weight: 600;
          line-height: 1.4;
        }
        h4{
          font-size:18px;
          font-weight: 600;
          line-height: 1.4;
        }
        span{
          font-size:16px;
          font-weight: 400;
          line-height: 1.4;
        }
        p{
          font-size:14px;
          font-weight: 400;
          line-height: 1.4;
        }
        small{
          font-size:12px;
          font-weight: 400;
          line-height: 1.4;
        }
      }
    }
`;
