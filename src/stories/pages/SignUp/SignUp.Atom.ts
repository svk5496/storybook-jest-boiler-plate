import { atom } from "recoil";

export const aSignUpStep = atom({
  key: "signUpStep",
  default: 1,
});

export const aKorName = atom({
  key: "korName",
  default: "",
});

export const abirthDate = atom({
  key: "birthDate",
  default: "",
});

export const aGender = atom({
  key: "gender",
  default: "",
});

export const aPhone = atom({
  key: "phone",
  default: "",
});

export const aEmail = atom({
  key: "signUpEmail",
  default: "",
});

export const aPassword = atom({
  key: "signUpPassword",
  default: "",
});

export const aPasswordConfirm = atom({
  key: "signUpPasswordConfirm",
  default: "",
});

export const aAuthModal = atom({
  key: "authModal",
  default: false,
});

export const aAuthNumber = atom({
  key: "authNumber",
  default: "",
});

export const aPersonalInfoModal = atom({
  key: "personalInfoModal",
  default: false,
});

export const aServiceInfoModal = atom({
  key: "serviceInfoModal",
  default: false,
});
