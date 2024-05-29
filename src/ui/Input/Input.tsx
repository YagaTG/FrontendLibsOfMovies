import { IInputProps } from "./IInputProps";
import "./style.scss";

export const Input = ({
  register,
  name,
  placeholder,
  onChange,
  validation = false,
  type = "text",
  defaultValue,
  ...inputProps
}: IInputProps) => {
  return (
    <>
      {type == "text" && (
        <input
          className="input"
          {...register(name, validation)}
          onChange={onChange}
          placeholder={placeholder}
          name={name}
          defaultValue={defaultValue ?? null}
          {...inputProps}
        />
      )}
      {type == "textarea" && (
        <textarea
          className="textarea"
          {...register(name, validation)}
          onChange={onChange}
          placeholder={placeholder}
          defaultValue={defaultValue ?? null}
          name={name}
          type="textarea"
          {...inputProps}
        />
      )}
    </>
  );
};
