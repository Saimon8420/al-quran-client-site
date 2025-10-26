import { useDispatch } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../select";
import type { ReactNode } from "react";
import { setUserSelect } from "@/components/redux/slices/editionSlice";
import type { EditionState } from "@/components/redux/slices/editionSlice";

interface CustomSelectProps<T> {
  data: T[];
  placeholder: string;
  label: string;
  renderOption: (item: T) => ReactNode;
  type?: Pick<EditionState, "userSelect">;
}

const CustomSelect = <T extends { identifier: string }>({
  data,
  placeholder,
  label,
  renderOption,
  type,
}: CustomSelectProps<T>) => {
  const dispatch = useDispatch();
  return (
    <Select onValueChange={(value) => dispatch(setUserSelect({ value, type }))}>
      <SelectTrigger className="max-w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {data.map((item) => (
            <SelectItem
              className="max-w-[180px]"
              key={item.identifier}
              value={item.identifier}
            >
              {renderOption(item)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CustomSelect;
