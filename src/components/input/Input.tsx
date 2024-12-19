import { ChangeEvent, useState } from "react";
import { eyeIcon, eyeSlashIcon } from "../../assets/icons";

interface inputProps {
  id: string;
  label?: string;
  type?: "text" | "password" | "email";
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string|undefined;
}

const Input = ({ id, label, type = "text", placeholder = "", onChange, value}: inputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };
  const onFocus = () => {
    setIsFocused(true);
  };
  const onBlur = () => {
    setIsFocused(false);
  };

  return (
    <div
      className="flex flex-col w-96 border border-solid rounded-lg p-2 pb-1"
      style={{ borderColor: isFocused ? "#b8b8b8" : "#e6e6e6" }}
    >
      <label htmlFor={id} className="text-xs pb-2 text-semibold">
        {label}
      </label>
      <div className="flex items-center">
        <input
          id={id}
          type={isPasswordVisible ? "text" : type}
          placeholder={placeholder}
          className="outline-none flex-grow text-base font-semibold"
          onBlur={onBlur}
          onFocus={onFocus}
          autoComplete="off"
          onChange={onChange}
          value={value}
        />
        {type === "password" && (
          <button
            aria-label="Toggle password visibility"
            onClick={togglePasswordVisibility}
          >
            {!isPasswordVisible ? (
              <img src={eyeSlashIcon} alt="icon" />
            ) : (
              <img src={eyeIcon} alt="icon" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
