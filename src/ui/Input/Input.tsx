import { IInputProps } from "./IInputProps";
import "./style.scss";

export const Input = ({
  register,
  name,
  placeholder,
  onChange,
  validation,
  ...inputProps
}: IInputProps) => {
  return (
    <>
      <input
        className="input"
        {...register(name, validation)}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        {...inputProps}
      />
    </>
  );
};
