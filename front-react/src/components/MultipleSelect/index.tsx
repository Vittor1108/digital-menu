import Select from "react-select";
import { IMultipleSelect } from "./interfaces/IMultipleSelect";

export const MultipleSelect = <T,>({}: IMultipleSelect<T>): JSX.Element => {
  return <Select />;
};
