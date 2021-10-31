import { InputHTMLAttributes, useEffect, useState } from "react";
import { ExitIcon } from "../Icons/Icons";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  startIcon?: JSX.Element;
  onChange: (e: onChangeEventType) => void;
}

const Input = (props: Props) => {
  const { value, name, type, onChange, placeholder, startIcon, className } =
    props;
  const [showClearBtn, setShowClearBtn] = useState<boolean>(false);

  useEffect(() => {
    // Display clear button
    const valueLength = (value as string).length;
    const displayClearBtn = valueLength > 0;
    setShowClearBtn(displayClearBtn);
  }, [value]);

  return (
    <>
      <label
        htmlFor={name}
        className="capitalize font-medium mb-2 text-left sr-only"
      >
        {name}
      </label>
      <div
        className={`${className} flex bg-gray-100 text-black w-full font-light rounded-md p-2 text-left shadow-sm border border-opacity-20 border-black`}
      >
        {startIcon}
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete="off"
          className="focus:outline-none w-full flex-grow bg-transparent"
        />
        {showClearBtn && (
          <button
            name="clearButton"
            type="button"
            className="flex-none ml-2"
            onClick={onChange}
          >
            <ExitIcon className="pointer-events-none w-7 h-7 stroke-current text-black" />
          </button>
        )}
      </div>
    </>
  );
};

export default Input;
