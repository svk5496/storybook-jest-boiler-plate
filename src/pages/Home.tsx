import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { ButtonText } from "../stories/atoms/buttons/ButtonText";
import { routes } from "./routes";

const Base = styled.div`
  width: calc(100vw - calc(100vw - 100%));
  height: calc(100vh - calc(100vh - 100%));
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderBase = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  border-bottom: solid 1px ${(props) => props.theme.borderColor};
`;

const MenuBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
`;

const HomeContent = styled.div`
  width: 100%;
  min-width: 400px;
  max-width: 700px;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 30px 0px;
`;

function Home() {
  const history = useHistory();
  return (
    <Base>
      <HeaderBase>
        <MenuBox>
          <ButtonText variant="ghost" label="홈"></ButtonText>
          <ButtonText variant="ghost" label="메뉴1"></ButtonText>
          <ButtonText variant="ghost" label="메뉴2"></ButtonText>
          <ButtonText variant="ghost" label="메뉴3"></ButtonText>
        </MenuBox>
        <MenuBox>
          <ButtonText
            variant="ghost"
            label="로그인"
            onClick={() => history.push(routes.login)}
          ></ButtonText>
        </MenuBox>
      </HeaderBase>
      <HomeContent>
        <h4>
          안녕하세요 react, storybook, jest 테스팅 예제에 오신걸 환영합니다
        </h4>
        <span>
          이 프로젝트에선 백엔드를 연결하지 않았기 때문에, 실제로 로그인이나
          로그아웃이 불가능하며, 스토리북을 통해 unit test와 E2E 테스트가 각각
          어떻게 이뤄지는지 등을 보실 수 있습니다
        </span>
      </HomeContent>
    </Base>
  );
}

export default Home;
