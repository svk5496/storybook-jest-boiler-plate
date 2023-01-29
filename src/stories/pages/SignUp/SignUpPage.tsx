import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import styled from "styled-components";
import {
  aPersonalInfoModal,
  aPhone,
  aServiceInfoModal,
  aSignUpStep,
} from "./SignUp.Atom";
import PersonalInfo from "../../templates/SignUpAgree/PersonalInfo";
import CreateAccountTemplate from "../../templates/CreateAccount/CreateAccountTemp";
import PhoneAuthTemp from "../../templates/PhoneAuth/PhoneAuthTemp";
import ServiceInfo from "../../templates/SignUpAgree/ServiceInfo";

const Base = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  justify-content: center;
  align-items: center;
`;

function SignUpPage() {
  const [step, setStep] = useRecoilState(aSignUpStep);
  const personalInfoModal = useRecoilValue(aPersonalInfoModal);
  const serviceInfoModal = useRecoilValue(aServiceInfoModal);
  const [phone, setPhone] = useRecoilState(aPhone);
  useEffect(() => {
    setStep(1);
    setPhone("");
  }, []);

  return (
    <Base>
      {personalInfoModal ? <PersonalInfo></PersonalInfo> : null}
      {serviceInfoModal ? <ServiceInfo></ServiceInfo> : null}
      {step > 3 ? (
        <CreateAccountTemplate></CreateAccountTemplate>
      ) : (
        <PhoneAuthTemp></PhoneAuthTemp>
      )}
    </Base>
  );
}
export default SignUpPage;
