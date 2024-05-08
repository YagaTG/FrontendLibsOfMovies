import AsyncSelect from "react-select/async";
import "./style.scss";

export const Selector = ({
  type = "async",
  loadOptions,
  handleChange,
  defaultOptions,
}) => {
  const CustomOption = ({ innerProps, isDisabled, children }) => {
    return !isDisabled ? (
      <div {...innerProps} className="selector__item">
        {children}
      </div>
    ) : null;
  };
  return (
    <>
      {type == "async" && (
        <AsyncSelect
          loadOptions={loadOptions}
          defaultOptions={defaultOptions}
          className="selector"
          components={{ Option: CustomOption }}
          isMulti
          placeholder="Введите название фильма.."
          onChange={handleChange}
        />
      )}
    </>
  );
};
