import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import AuthHeader from "../../molecules/headers/AuthHeader";
import { aPersonalInfoModal } from "../../pages/SignUp/SignUp.Atom";

const Base = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.5);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
  transition: 0.3s ease-in-out;
  h5 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  h6 {
    font-size: 14px;
  }
  span {
    font-size: 12px;
  }
`;

const AuthWindow = styled.div`
  width: 100%;
  max-width: 420px;
  min-height: 700px;
  max-height: 800px;
  overflow: auto;
  padding: 10px 20px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 10px;
  background-color: white;
  display: flex;
  position: absolute;
  z-index: 30;
  flex-direction: column;
  h4 {
    margin-bottom: 10px;
  }
`;

const Block = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 14px 0px;
  word-break: keep-all;
  span {
    margin-bottom: 4px;
  }
`;

const StyledTable = styled.table`
  border-collapse: separate;
  border-spacing: 0;
  th {
    border-collapse: separate;
    border-spacing: 0;
    border: 1px solid ${(props) => props.theme.borderColor};
    background-color: #eee;
    padding: 10px 0px;
    width: 150px;
  }
  td {
    border-collapse: separate;
    border-spacing: 0;
    border: 1px solid ${(props) => props.theme.borderColor};
    padding: 10px 10px;
    font-size: 14px;
    word-break: keep-all;
  }
`;

function PersonalInfo() {
  const [personalInfoModal, setPersonalInfoModal] =
    useRecoilState(aPersonalInfoModal);
  const outSection = useRef<HTMLDivElement>(null);
  return (
    <Base
      ref={outSection}
      onClick={(e) => {
        if (outSection.current === e.target) {
          setPersonalInfoModal(false);
        }
      }}
    >
      <AuthWindow>
        <AuthHeader
          label="개인정보 수집/이용 동의"
          rightIcon={<FontAwesomeIcon icon={faX}></FontAwesomeIcon>}
          onClickRight={() => setPersonalInfoModal(false)}
        ></AuthHeader>
        <Block>
          <StyledTable>
            <thead>
              <tr>
                <th>수집 목적</th>
                <th>수집 항목</th>
                <th>보유 기간</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>회원제 서비스 이용에 따른 본인 식별</td>
                <td>이름, 이메일, 비밀번호</td>
                <td>회원 탈퇴하거나 회원에 제명된 때 즉시 파기</td>
              </tr>
            </tbody>
          </StyledTable>
          <span>
            개인정보 제공에 동의하지 않으실 수 있으며, 동의하지 않으실 경우
            서비스 이용이 제한될 수 있습니다. 그 밖의 사항은 (주)나인투식스의
            개인정보처리방침에 따릅니다.
          </span>
        </Block>
      </AuthWindow>
    </Base>
  );
}

export default PersonalInfo;
