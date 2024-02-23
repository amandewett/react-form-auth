import { inputFormComponent } from "../../utils/cTypes";

const DropDown: inputFormComponent = ({ inputProps, onChange }) => {
  const { htmlFor, label, selectorValues, value } = inputProps;

  return (
    <div className="w-72 pl-5 pr-5 mt-0 mb-5 flex flex-col relative">
      <label htmlFor={htmlFor} className="font-bold">
        {label}
      </label>
      <select
        name={htmlFor}
        id={htmlFor}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          onChange(e.target.value)
        }
        className="bg-slate-200 p-3 rounded-sm block w-full relative outline-aPrimaryColor"
      >
        {selectorValues?.map((v: string) => (
          <option
            key={v.toLocaleLowerCase()}
            value={v.toLocaleLowerCase()}
            className="m-5"
          >
            {v}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
