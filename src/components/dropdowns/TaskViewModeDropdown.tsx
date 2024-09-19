import { useEffect, useRef, useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";

import {
  TaskViewMode,
  taskViewModeOptions,
  TaskViewModeType,
} from "@/constants/taskViewMode";

type Props = {
  value: TaskViewModeType;
  onChange: (value: TaskViewModeType) => void;
};

export default function TaskViewTypeDropdown(props: Props) {
  const { value, onChange } = props;

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
    <div className="flex items-center gap-1">
      <span className="text-sm">View: </span>

      <div ref={dropdownCtnRef} className="relative">
        <button
          type="button"
          className="flex gap-1 items-center px-2 py-1 border rounded-md"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-sm font-medium">
            {TaskViewMode[value].name}
          </span>
          <IoChevronDownOutline className="shrink-0" />
        </button>

        {isOpen && (
          <div className="absolute top-8 right-0 left-1/2 -translate-x-1/2 z-10 w-full overflow-scroll py-1 bg-white border rounded-md shadow">
            {taskViewModeOptions.map(({ id, name }) => (
              <button
                key={id}
                type="button"
                className="flex gap-1 items-center justify-center w-full px-3 py-1.5 text-sm hover:bg-[#F4F5F7]"
                onClick={() => {
                  onChange(id);
                  setIsOpen(false);
                }}
              >
                {name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
