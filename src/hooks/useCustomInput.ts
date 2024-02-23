import { useState } from "react";
import { validatorReturnType } from "../utils/cTypes";

export const useCustomInput = (
  defaultValue: string,
  validationFn: (
    input: string,
    didTouched: boolean,
    password?: string
  ) => validatorReturnType,
  password?: string
) => {
  const [inputValue, setInputValue] = useState<string>(defaultValue);
  const [didTouched, setDidTouched] = useState<boolean>(false);
  let isInvalid: validatorReturnType = password
    ? validationFn(inputValue, didTouched, password)
    : validationFn(inputValue, didTouched);

  const handleInputValueChange = (value: string) => {
    handleOnBlur(false);
    setInputValue(value);
  };

  const handleOnBlur = (value: boolean = true) => {
    setDidTouched(value);
  };

  return {
    inputValue,
    handleInputValueChange,
    handleOnBlur,
    isInvalid,
  };
};
