import { aComponent } from "../../utils/cTypes";
import { motion } from "framer-motion";
import InputField from "../shared/InputField";
import FormActions from "../shared/FormActions";
import { FormEvent, useState, useContext } from "react";

import {
  cPasswordValidator,
  emailValidator,
  imageValidator,
  nameValidator,
  passwordValidator,
} from "../../utils/validators";
import { useCustomInput } from "../../hooks/useCustomInput";
import DropDown from "../shared/DropDown";
import FilePicker from "../shared/FilePicker";
import { AuthContext } from "../../store/auth.context";
import { redirect } from "react-router-dom";

const SignUpForm: aComponent = () => {
  const { signUp } = useContext(AuthContext);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  let {
    inputValue: fNameInputValue,
    handleInputValueChange: handlefNameValueOnchange,
    handleOnBlur: handlefNameOnBlur,
    isInvalid: isfNameInvalid,
  } = useCustomInput("", nameValidator);
  let {
    inputValue: lNameInputValue,
    handleInputValueChange: handlelNameValueOnchange,
    handleOnBlur: handlelNameOnBlur,
    isInvalid: islNameInvalid,
  } = useCustomInput("", nameValidator);

  let {
    inputValue: emailInputValue,
    handleInputValueChange: handleEmailValueOnchange,
    handleOnBlur: handleEmailOnBlur,
    isInvalid: isEmailInvalid,
  } = useCustomInput("", emailValidator);

  let {
    inputValue: passwordInputValue,
    handleInputValueChange: handlePasswordValueOnchange,
    handleOnBlur: handlePasswordOnBlur,
    isInvalid: isPasswordInvalid,
  } = useCustomInput("", passwordValidator);

  let {
    inputValue: confirmPasswordInputValue,
    handleInputValueChange: handleConfirmPasswordValueOnchange,
    handleOnBlur: handleConfirmPasswordOnBlur,
    isInvalid: isConfirmPasswordInvalid,
  } = useCustomInput("", cPasswordValidator, passwordInputValue);

  let {
    inputValue: genderInputValue,
    handleInputValueChange: handleGenderValueOnchange,
    handleOnBlur: handleGenderOnBlur,
    isInvalid: isGenderInvalid,
  } = useCustomInput("male", nameValidator);

  let {
    inputValue: countryInputValue,
    handleInputValueChange: handleCountryValueOnchange,
    handleOnBlur: handleCountryOnBlur,
    isInvalid: isCountryInvalid,
  } = useCustomInput("canada", nameValidator);

  const [pickedImage, setPickedImage] = useState<string | null | ArrayBuffer>(
    null
  );

  let isImageInvalid = imageValidator(pickedImage);

  const onChangeFilePicker = (file: any) => {
    try {
      if (!file) {
        setPickedImage(null);
        return;
      }

      const fileReader = new FileReader();
      fileReader.onload = () => setPickedImage(fileReader.result);
      fileReader.readAsDataURL(file);
    } catch (e: any) {
      console.log(e);
      throw new Error(e.message);
    }
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    handlefNameOnBlur(true);
    handlelNameOnBlur(true);
    handleEmailOnBlur(true);
    handlePasswordOnBlur(true);
    handleConfirmPasswordOnBlur(true);
    isfNameInvalid = nameValidator(fNameInputValue, true);
    islNameInvalid = nameValidator(lNameInputValue, true);
    isEmailInvalid = emailValidator(emailInputValue, true);
    isPasswordInvalid = passwordValidator(passwordInputValue, true);
    isConfirmPasswordInvalid = cPasswordValidator(
      confirmPasswordInputValue,
      true,
      passwordInputValue
    );

    if (
      !isfNameInvalid.status ||
      !islNameInvalid.status ||
      !isEmailInvalid.status ||
      !isPasswordInvalid.status ||
      !isConfirmPasswordInvalid.status
    ) {
      console.log(`Something is missing...`);
      console.log(JSON.stringify(isfNameInvalid));
      console.log(JSON.stringify(islNameInvalid));
      console.log(JSON.stringify(isEmailInvalid));
      console.log(JSON.stringify(isPasswordInvalid));
      console.log(JSON.stringify(isConfirmPasswordInvalid));
    } else {
      setIsSubmitting(true);
      const result: any = signUp(
        fNameInputValue,
        lNameInputValue,
        emailInputValue,
        passwordInputValue,
        genderInputValue,
        countryInputValue,
        JSON.stringify(pickedImage)
      );

      setIsSubmitting(false);
      if (result.status) {
        resetForm();
        redirect("/");
      }
    }
  };

  const resetForm = () => {
    handlefNameValueOnchange("");
    handlelNameValueOnchange("");
    handleEmailValueOnchange("");
    handlePasswordValueOnchange("");
    handleConfirmPasswordValueOnchange("");
    handleGenderValueOnchange("");
    handleCountryValueOnchange("");
  };

  return (
    <>
      <motion.div
        className="w-1/2 bg-slate-100 rounded-md ml-auto mr-auto mt-28 flex flex-col items-center justify-start min-h-60 drop-shadow-md overflow-hidden"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <motion.h1
          className="mt-3 text-2xl font-bold"
          variants={{
            hidden: {
              y: -10,
              opacity: 0,
            },
            visible: {
              y: 0,
              opacity: 1,
            },
          }}
          initial="hidden"
          animate="visible"
          transition={{
            delay: 0.5,
          }}
        >
          Signup
        </motion.h1>
        <motion.form
          onSubmit={handleFormSubmit}
          className="w-full flex flex-col items-center mt-5 relative"
        >
          <div className="w-full flex justify-start items-center">
            <FilePicker
              inputProps={{
                htmlFor: "ppPicker",
                imageSrc: pickedImage,
                isInvalid: isImageInvalid,
              }}
              onchange={onChangeFilePicker}
            />
          </div>
          <div className="flex justify-between items-center w-full">
            <InputField
              inputProps={{
                htmlFor: "fName",
                placeHolder: "First name",
                label: "First name",
                inputType: "text",
                value: fNameInputValue,
              }}
              onChange={handlefNameValueOnchange}
              isInvalid={isfNameInvalid}
              onBlur={handlefNameOnBlur}
            />
            <InputField
              inputProps={{
                htmlFor: "lName",
                placeHolder: "Last name",
                label: "Last name",
                inputType: "text",
                value: lNameInputValue,
              }}
              onChange={handlelNameValueOnchange}
              isInvalid={islNameInvalid}
              onBlur={handlelNameOnBlur}
            />
          </div>
          <InputField
            inputProps={{
              htmlFor: "email",
              placeHolder: "Email address",
              label: "Email",
              inputType: "email",
              value: emailInputValue,
            }}
            onChange={handleEmailValueOnchange}
            isInvalid={isEmailInvalid}
            onBlur={handleEmailOnBlur}
          />
          <div className="flex justify-between items-center w-full">
            <InputField
              inputProps={{
                htmlFor: "password",
                placeHolder: "Password",
                label: "Password",
                inputType: "password",
                value: passwordInputValue,
              }}
              onChange={handlePasswordValueOnchange}
              isInvalid={isPasswordInvalid}
              onBlur={handlePasswordOnBlur}
            />
            <InputField
              inputProps={{
                htmlFor: "cPassword",
                placeHolder: "Confirm password",
                label: "Confirm Password",
                inputType: "password",
                value: confirmPasswordInputValue,
              }}
              onChange={handleConfirmPasswordValueOnchange}
              isInvalid={isConfirmPasswordInvalid}
              onBlur={handleConfirmPasswordOnBlur}
            />
          </div>
          <div className="flex justify-between items-center w-full">
            <DropDown
              inputProps={{
                htmlFor: "gender",
                placeHolder: "",
                label: "Gender",
                inputType: "text",
                value: genderInputValue,
                selectorValues: ["Male", "Female"],
              }}
              onChange={handleGenderValueOnchange}
              isInvalid={isGenderInvalid}
              onBlur={handleGenderOnBlur}
            />
            <DropDown
              inputProps={{
                htmlFor: "country",
                placeHolder: "",
                label: "Country",
                inputType: "text",
                value: countryInputValue,
                selectorValues: ["Canada", "US", "India"],
              }}
              onChange={handleCountryValueOnchange}
              isInvalid={isCountryInvalid}
              onBlur={handleCountryOnBlur}
            />
          </div>
          <FormActions isSubmitting={isSubmitting}>SignUp</FormActions>
        </motion.form>
      </motion.div>
    </>
  );
};

export default SignUpForm;
