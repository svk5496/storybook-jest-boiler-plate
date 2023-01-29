import {
  faChevronDown,
  faChevronRight,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { keyframes } from "styled-components";
import { ButtonText } from "../../atoms/buttons/ButtonText";
import {
  aPersonalInfoModal,
  aServiceInfoModal,
} from "../../pages/SignUp/SignUp.Atom";

const Base = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  input {
    -webkit-appearance: checkbox !important;
    -moz-appearance: checkbox !important;
    -ms-appearance: checkbox !important;
    -o-appearance: checkbox !important;
    appearance: checkbox !important;
    accent-color: ${(props) => props.theme.blue};
    margin-right: 10px;
  }
  label {
    cursor: pointer;
  }
`;

const AgreeBox = styled.div`
  height: 40px;
  width: 100%;
  padding: 0px 20px;
  background-color: ${(props) => props.theme.blueLight};
  display: flex;
  align-items: center;
  border-radius: 12px;
  font-size: 14px;
  justify-content: space-between;
  z-index: 10;
`;

const SlideIn = keyframes`
    from{
       height:0;
    }
    to {
        height:160px;
    }
`;

const AgreeDetailBox = styled.div`
  width: 100%;
  animation: ${SlideIn} 0.25s linear;
  padding: 0px 10px 0px 20px;
`;

const AgreeDetail = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  justify-content: space-between;
  span {
    padding-right: 4px;
    font-size: 12px;
  }
`;

const LinkBox = styled.div`
  cursor: pointer;
`;

interface element {
  id: number;
  title: string;
  method: string;
}

type Array = element[];

const AGREEMENT_LIST = [
  {
    id: 0,
    title: "개인정보 수집/이용 동의 (필수)",
    method: "personalInfo",
  },
  { id: 1, title: "서비스 이용약관 (필수)", method: "serviceInfo" },
  { id: 2, title: "만 14세 이상입니다. (필수)", method: "" },
  {
    id: 3,
    title: "본인인증 목적으로 상기 정보를 제공함에 동의 (필수)",
    method: "",
  },
];

function SignUpAgreeTemp() {
  const [modal, setModal] = useState(false); //약관 페이지 펼치고 닫기
  const [checkedList, setCheckedList] = useState<Array>([]);
  const dataList: Array = [];
  const [personalInfoModal, setPersonalInfoModal] =
    useRecoilState(aPersonalInfoModal);
  const [serviceInfoModal, setServiceInfoModal] =
    useRecoilState(aServiceInfoModal);

  AGREEMENT_LIST.forEach((agreement) => dataList.push(agreement));

  const onCheckedAll = useCallback(
    (checked: boolean) => {
      if (checked) {
        const checkedListArray: Array = [];
        dataList.forEach((list) => checkedListArray.push(list));
        setCheckedList(checkedListArray);
      } else {
        setCheckedList([]);
      }
    },
    [dataList]
  );

  const onCheckedElement = useCallback(
    (checked: boolean, list: any) => {
      if (checked) {
        setCheckedList([...checkedList, list]);
      } else {
        setCheckedList(checkedList.filter((el) => el !== list));
      }
    },
    [checkedList]
  );

  const modalFunction = (method: string) => {
    if (method === "personalInfo") {
      setPersonalInfoModal(true);
    }
    if (method === "serviceInfo") {
      setServiceInfoModal(true);
    }
  };

  return (
    <Base>
      <AgreeBox>
        <label>
          <input
            type="checkbox"
            onChange={(e) => onCheckedAll(e.target.checked)}
            data-testid="test-checkbox-input"
            checked={
              checkedList?.length === 0
                ? false
                : checkedList?.length === dataList?.length
                ? true
                : false
            }
          ></input>
          약관 모두동의
        </label>
        {modal ? (
          <FontAwesomeIcon
            onClick={() => setModal(!modal)}
            icon={faChevronUp}
            cursor="pointer"
          ></FontAwesomeIcon>
        ) : (
          <FontAwesomeIcon
            onClick={() => setModal(!modal)}
            icon={faChevronDown}
            cursor="pointer"
          ></FontAwesomeIcon>
        )}
      </AgreeBox>
      {modal ? (
        <AgreeDetailBox>
          {AGREEMENT_LIST.map((agreement) => (
            <AgreeDetail key={agreement.id}>
              <label>
                <input
                  type="checkbox"
                  onChange={(e) =>
                    onCheckedElement(e.target.checked, agreement)
                  }
                  checked={checkedList.includes(agreement) ? true : false}
                ></input>
                <span>{agreement.title}</span>
              </label>
              {agreement.method === "" ? (
                <></>
              ) : (
                <LinkBox
                  onClick={() => {
                    modalFunction(agreement.method);
                  }}
                >
                  <span>상세보기</span>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    size="xs"
                  ></FontAwesomeIcon>
                </LinkBox>
              )}
            </AgreeDetail>
          ))}
        </AgreeDetailBox>
      ) : null}
      <ButtonText
        label="인증번호받기"
        margin="16px 0px"
        variant="confirm"
        fullWidth={true}
        disabled={checkedList.length !== dataList.length}
      ></ButtonText>
    </Base>
  );
}
export default SignUpAgreeTemp;
