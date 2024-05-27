import AsyncSelect from "react-select/async";
import "./style.scss";
import Select from "react-select";

export const Selector = ({
  type,
  loadOptions,
  handleChange,
  defaultOptions,
  defaultValues,
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
          defaultValue={defaultValues}
          className="selector"
          components={{ Option: CustomOption }}
          isMulti
          placeholder="Введите название фильма.."
          onChange={handleChange}
        />
      ) : type == "single-async" ? (
        <AsyncSelect
          loadOptions={loadOptions}
          defaultOptions={defaultOptions}
          defaultValue={defaultValues}
          className="selector"
          components={{ Option: CustomOption }}
          placeholder="Введите название фильма.."
          onChange={handleChange}
        />
      ) : (
        <Select
          options={defaultOptions}
          placeholder="Сортировать:"
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
