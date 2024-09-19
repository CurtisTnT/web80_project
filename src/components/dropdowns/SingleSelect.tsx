import { useState } from "react";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { FaCheck } from "react-icons/fa6";
import { IoChevronDownOutline } from "react-icons/io5";
import clsx from "clsx";

type SingleSelectValue<T> = Partial<T> & { id: string | number; name: string };

type Props<T> = {
  value: SingleSelectValue<T> | null;
  onChange: (newValue: SingleSelectValue<T>) => void;
  options: SingleSelectValue<T>[];
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  isError?: boolean;
};

export default function SingleSelect<T>(props: Props<T>) {
  const { value, onChange, options, onBlur, isError = false } = props;

  const [query, setQuery] = useState("");

  const filteredOptions =
    query === ""
      ? options
      : options.filter((item) => {
          return item.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox
      value={value}
      onChange={(value: SingleSelectValue<T>) => onChange(value)}
      onClose={() => setQuery("")}
    >
      <div className="relative">
        <ComboboxInput
          className={clsx(
            "w-full rounded-lg border outline-none py-1.5 pr-10 pl-3 text-sm/6 peer",
            "focus:border-primary",
            {
              "border-danger": isError,
              "border-white-light": !isError,
            }
          )}
          displayValue={(value: SingleSelectValue<T>) => value?.name}
          onChange={(event) => setQuery(event.target.value)}
          onBlur={onBlur}
          autoComplete="off"
        />
        <ComboboxButton
          className={clsx(
            "group absolute inset-y-0 right-0 px-2.5 border bg-dark-light rounded-r-lg peer-focus:border-primary",
            {
              "border-danger": isError,
              "border-white-light": !isError,
            }
          )}
        >
          <IoChevronDownOutline className="size-4 -rotate-180 group-data-[open]:rotate-0 duration-200" />
        </ComboboxButton>
      </div>

      <ComboboxOptions
        anchor="bottom"
        transition
        className={clsx(
          "w-[var(--input-width)] rounded-xl border bg-white p-1 [--anchor-gap:var(--spacing-1)] empty:invisible",
          "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
        )}
      >
        {filteredOptions.map((item) => (
          <ComboboxOption
            key={item.id}
            value={item}
            className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-blue data-[focus]:text-white"
          >
            <FaCheck className="invisible size-4 group-data-[selected]:visible" />
            <div className="text-sm/6">{item.name}</div>
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  );
}
