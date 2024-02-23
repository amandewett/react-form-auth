import { aComponent } from "../../utils/cTypes";
import { motion } from "framer-motion";
import InputField from "../shared/InputField";
import FormActions from "../shared/FormActions";
import { FormEvent, useState, useContext } from "react";
import { emailValidator, passwordValidator } from "../../utils/validators";
import { useCustomInput } from "../../hooks/useCustomInput";
import { AuthContext } from "../../store/auth.context";
import { redirect } from "react-router-dom";

const LoginForm: aComponent = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { login } = useContext(AuthContext);

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

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    handleEmailOnBlur(true);
    handlePasswordOnBlur(true);
    isEmailInvalid = emailValidator(emailInputValue, true);
    isPasswordInvalid = passwordValidator(passwordInputValue, true);
    if (!isEmailInvalid.status || !isPasswordInvalid.status) {
    } else {
      setIsSubmitting(true);
      const result: any = login(emailInputValue, passwordInputValue);
      setIsSubmitting(false);
      if (result.status) {
        resetForm();
        redirect("/home");
      }
    }
  };

  const resetForm = () => {
    handleEmailValueOnchange("");
    handlePasswordValueOnchange("");
  };

  /* const handleFormSubmitWithFormData = (event: any) => {
    // getting data using FormData()
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log(JSON.stringify(data));
  }; */

  return (
    <>
      <motion.div
        className="w-1/3 bg-slate-100 rounded-md ml-auto mr-auto mt-28 flex flex-col items-center justify-start min-h-60 drop-shadow-md overflow-hidden"
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
          Login
        </motion.h1>
        <motion.form
          onSubmit={handleFormSubmit}
          className="w-full flex flex-col items-center mt-5"
        >
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
          <FormActions isSubmitting={isSubmitting}>Login</FormActions>
        </motion.form>
      </motion.div>
    </>
  );
};

export default LoginForm;
