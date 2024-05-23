import AsyncSelect from "react-select/async";
import "./style.scss";
import Select from "react-select";

export const Selector = ({
  type,
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
      {type == "async" ? (
        <AsyncSelect
          loadOptions={loadOptions}
          defaultOptions={defaultOptions}
          className="selector"
          components={{ Option: CustomOption }}
          isMulti
          placeholder="Введите название фильма.."
          onChange={handleChange}
        />
      ) : (
        <Select
          options={defaultOptions}
          defaultValue={defaultOptions[0]}
          className="selector"
          components={{ Option: CustomOption }}
          isSearchable={false}
          onChange={handleChange}
          isClearable={false}
        />
      )}
    </>
  );
};
