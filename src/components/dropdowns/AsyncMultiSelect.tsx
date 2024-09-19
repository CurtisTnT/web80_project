import { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import clsx from "clsx";

type MultiSelectValue<T> = Partial<T> & {
  id: string | number;
  name: string;
};

type Props<T> = {
  values: MultiSelectValue<T>[];
  onChange: (newValues: T[]) => void;
  options: MultiSelectValue<T>[];
  renderSelectedItem?: (value: T) => React.ReactNode;
  renderItem?: (value: T) => React.ReactNode;
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  isError?: boolean;
};

export default function AsyncMultiSelect<T>(props: Props<T>) {
  const {
    values,
    onChange,
    options,
    renderSelectedItem,
    renderItem,
    onBlur,
    isError = false,
  } = props;

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const optionsWithoutValues = options.filter(
    (option) => !values.find(({ id }) => option.id === id)
  );
  const filteredOptions =
    query === ""
      ? optionsWithoutValues
      : optionsWithoutValues.filter((item) => {
          return item.name.toLowerCase().includes(query.toLowerCase());
        });

  const handleOnClick = () => {
    const searchInputElm = document.getElementById(
      "search-input"
    ) as HTMLInputElement;

    if (searchInputElm) searchInputElm.focus();
    setIsOpen(true);
  };

  const handleDeleteValue = (id: string | number) => {
    const newValues = values.filter((value) => value.id !== id);
    onChange(newValues as T[]);
  };

  const handleSelectItem = (selectedValue: MultiSelectValue<T>) => {
    if (values.find((value) => value.id === selectedValue.id)) {
      handleDeleteValue(selectedValue.id);
    } else {
      onChange([...values, selectedValue] as T[]);
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (!dropdownRef.current!.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      ref={dropdownRef}
      className={clsx(
        "flex border-b border-white-light hover:border-primary focus-within:border-primary",
        {
          "border-danger": isError,
          "border-white-light": !isError,
        }
      )}
      onClick={handleOnClick}
    >
      <div className="flex items-center gap-2">
        {values.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-2 p-1 mb-1 border rounded-lg hover:border-primary"
          >
            {renderSelectedItem ? renderSelectedItem(item as T) : item.name}
            <button
              type="button"
              className="rounded border border-transparent hover:border-danger-dark-light hover:text-danger"
              onClick={() => handleDeleteValue(item.id)}
            >
              <IoClose size={14} />
            </button>
          </div>
        ))}
      </div>

      <div className="relative self-end">
        <input
          id="search-input"
          className={clsx("w-[100px] py-1.5 pr-10 pl-3 text-sm outline-none")}
          onChange={(event) => setQuery(event.target.value)}
          onBlur={onBlur}
          autoComplete="off"
        />

        {isOpen && (
          <div className="absolute top-10 left-0 z-10">
            <div className="min-w-[100px] max-h-[300px] p-2 bg-white border rounded-md shadow text-sm">
              {filteredOptions.length ? (
                filteredOptions.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="w-full rounded-lg py-1.5 px-3 hover:bg-blue hover:text-white text-nowrap"
                    onClick={() => handleSelectItem(item)}
                  >
                    {renderItem ? renderItem(item as T) : item.name}
                  </button>
                ))
              ) : (
                <div className="font-medium text-center text-white-dark">
                  No options
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
