import { inputFormComponent } from "../../utils/cTypes";
import { motion } from "framer-motion";

const InputField: inputFormComponent = ({
  inputProps,
  onChange,
  isInvalid,
  onBlur,
}) => {
  const { htmlFor, label, inputType, placeHolder, value } = inputProps;

  return (
    <motion.div className="w-full pl-5 pr-5 mt-0 mb-5 flex flex-col">
      <label htmlFor={htmlFor} className="font-bold">
        {label}
      </label>
      <motion.input
        className={`p-3 rounded-sm bg-slate-200 text-aTextColor font-normal placeholder:text-slate-500 placeholder:font-light placeholder:text-sm outline-aPrimaryColor ${
          !isInvalid.status && "bg-rose-100"
        }`}
        transition={{ repeat: 2, duration: 0.1 }}
        id={htmlFor}
        type={inputType}
        name={htmlFor}
        value={value}
        placeholder={placeHolder}
        onBlur={() => onBlur()}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onChange(e.target.value);
        }}
      />
      {!isInvalid.status ? (
        <motion.div
          initial={{ x: 20 }}
          animate={{ x: 0 }}
          transition={{ repeat: 2, duration: 0.1 }}
          className="text-red-500 mt-1 italic text-xs h-4"
        >
          {isInvalid.message}
        </motion.div>
      ) : (
        <div className="text-red-500 mt-1 italic text-xs h-4"></div>
      )}
    </motion.div>
  );
};

export default InputField;
