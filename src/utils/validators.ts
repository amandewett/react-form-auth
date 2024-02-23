import { validatorReturnType } from "./cTypes";

export const emailValidator = (
  input: string,
  didTouched: boolean
): validatorReturnType => {
  if (didTouched) {
    if (input === "") {
      return {
        status: false,
        message: `Email required`,
      };
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(input)) {
      return {
        status: false,
        message: `Invalid email address`,
      };
    } else {
      return { status: true };
    }
  } else {
    return { status: true };
  }
};

export const passwordValidator = (
  input: string,
  didTouched: boolean
): validatorReturnType => {
  if (didTouched) {
    if (input === "") {
      return {
        status: false,
        message: `Password required`,
      };
    } else if (!/[a-z]/.test(input)) {
      return {
        status: false,
        message: `Password must have a lowercase character a-z`,
      };
    } else if (!/[A-Z]/.test(input)) {
      return {
        status: false,
        message: `Password must have a uppercase character A-Z`,
      };
    } else if (!/[0-9]/.test(input)) {
      return {
        status: false,
        message: `Password must have a number 0-9`,
      };
    } else if (!/[@.#$!%*?&^]/.test(input)) {
      return {
        status: false,
        message: `Password must have a symbol @.#$!%*?&^`,
      };
    } else if (!/^.{8,16}$/.test(input)) {
      return {
        status: false,
        message: `Password must be minimum 8 and maximum of 16 length`,
      };
    } else {
      return { status: true };
    }
  } else {
    return { status: true };
  }
};

export const cPasswordValidator = (
  input: string,
  didTouched: boolean,
  password?: string
): validatorReturnType => {
  if (didTouched) {
    if (input === "") {
      return {
        status: false,
        message: `Confirm password required`,
      };
    } else if (password !== input) {
      return {
        status: false,
        message: `Password do not match`,
      };
    } else {
      return { status: true };
    }
  } else {
    return { status: true };
  }
};

export const nameValidator = (
  input: string,
  didTouched: boolean
): validatorReturnType => {
  if (didTouched) {
    if (input === "") {
      return {
        status: false,
        message: `Name required`,
      };
    } else if (!/^.{3,20}$/.test(input)) {
      return {
        status: false,
        message: `Name must be minimum 3 and maximum of 20 length`,
      };
    } else if (/[0-9]/.test(input)) {
      return {
        status: false,
        message: `Name cannot contain any numbers`,
      };
    } else {
      return { status: true };
    }
  } else {
    return { status: true };
  }
};

export const imageValidator = (
  input: string | null | ArrayBuffer
): validatorReturnType => {
  if (input === null) {
    return {
      status: false,
      message: `Profile picture required`,
    };
  } else {
    return { status: true };
  }
};
