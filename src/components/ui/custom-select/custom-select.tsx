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

interface CustomSelectProps<T, K extends string> {
  data: T[];
  placeholder: string;
  label: string;
  renderOption: (item: T) => ReactNode;
  type: K;
  defaultValue: string;
  onChange?: (value: string, type: K) => void;
}

const CustomSelect = <T extends { identifier: string }, K extends string>({
  data,
  placeholder,
  label,
  renderOption,
  type,
  defaultValue,
  onChange,
}: CustomSelectProps<T, K>) => {
  return (
    <div>
      <Select
        onValueChange={(value) => onChange?.(value, type)}
        defaultValue={defaultValue}
      >
        <SelectTrigger className="w-full">
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
    </div>
  );
};

export default CustomSelect;
