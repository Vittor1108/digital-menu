import Select from "react-select";
import { IMultipleSelect } from "./interfaces/IMultipleSelect";

export const MultipleSelect = <T,>({
  isMulti,
  isSearchable,
  options,
  placeholder,
  inputId,
}: IMultipleSelect<T>): JSX.Element => {
  return (
    <Select
      isMulti={isMulti}
      isSearchable={isSearchable}
      options={options}
      placeholder={placeholder}
      inputId={inputId}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          borderColor: "#ddd",
          padding: "0px",
          minHeight: "0",
          fontSize: "14px"
        }),
      }}
    />
  );
};
