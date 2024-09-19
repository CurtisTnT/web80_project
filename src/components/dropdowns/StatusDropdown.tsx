import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

import { IoChevronDownOutline } from "react-icons/io5";

type Props<T extends string> = {
  value: T;
  onChange: (value: T) => void;
  options: { id: T; name: string }[];
  dropdownEnum: {
    [key in T]: {
      id: T;
      name: string;
    };
  };
  id: string;
  className?: string;
  btnClassName?: string;
  dropdownClassName?: string;
  itemClassName?: string;
};

export default function StatusDropdown<T extends string>(props: Props<T>) {
  const {
    value,
    onChange,
    options,
    dropdownEnum,
    id,
    className,
    btnClassName,
    dropdownClassName,
    itemClassName,
  } = props;

  const [isOpen, setIsOpen] = useState(false);

  const dropdownCtnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (!dropdownCtnRef.current!.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div id={id} ref={dropdownCtnRef} className={clsx("relative", className)}>
      <button
        type="button"
        className={clsx(
          "flex gap-1 items-center px-2 py-1 border rounded-md selected",
          value,
          btnClassName
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">{dropdownEnum[value].name}</span>
        <IoChevronDownOutline
          className={clsx("shrink-0 duration-200", {
            "-rotate-180": !isOpen,
          })}
        />
      </button>

      {isOpen && (
        <div
          className={clsx(
            "absolute top-9 z-10 overflow-scroll py-1 bg-white border rounded-md shadow",
            dropdownClassName,
            {
              "left-1/2 -translate-x-1/2": !dropdownClassName,
            }
          )}
        >
          {options.map(({ id, name }) => (
            <button
              key={id}
              type="button"
              className={clsx(
                "flex gap-1 items-center justify-center w-full px-6 py-1.5 hover:bg-[#F4F5F7]",
                itemClassName,
                {
                  hidden: value === id,
                }
              )}
              onClick={() => {
                onChange(id);
                setIsOpen(false);
              }}
            >
              <span className={clsx("px-1.5 rounded-full text-nowrap", id)}>
                {name}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
