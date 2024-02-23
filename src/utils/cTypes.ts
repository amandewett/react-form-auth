import { FC, ReactNode } from "react";

export type aComponent = FC<{ children?: ReactNode }>;

export type inputFormComponent = FC<{
  children?: ReactNode;
  inputProps: inputType;
  onChange: (value: string) => void;
  isInvalid: validatorReturnType;
  onBlur: () => void;
}>;

export type inputType = {
  htmlFor: string;
  placeHolder: string;
  label: string;
  inputType: string;
  value: string;
  selectorValues?: string[];
};

export type loginInputStateType = {
  email: string;
  password: string;
};

export type loginInputDidTouchedType = {
  email: boolean;
  password: boolean;
};

export type validatorReturnType = {
  status: boolean;
  message?: string;
};
