import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { IoChevronDownOutline } from "react-icons/io5";

import {
  ProjectStatus,
  projectStatusOptions,
  ProjectStatusType,
} from "@/constants/projectStatus";

type Props = {
  value: ProjectStatusType;
  onChange: (value: ProjectStatusType) => void;
};

export default function ProjectStatusDropdown(props: Props) {
  const { value, onChange } = props;

  const [isOpen, setIsOpen] = useState(false);

  const dropdownCtnRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownCtnRef.current!.contains(event.target as Node)) {
      return;
    }

    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownCtnRef} className="relative">
      <button
        type="button"
        className={clsx(
          "flex gap-1 items-center px-2 py-1 border rounded-md selected",
          value
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">{ProjectStatus[value].name}</span>
        <IoChevronDownOutline className="shrink-0" />
      </button>

      {isOpen && (
        <div className="absolute top-9 right-0 z-10 overflow-scroll py-1 bg-white border rounded-md shadow">
          {projectStatusOptions.map(({ id, name }) => (
            <button
              key={id}
              type="button"
              className={clsx(
                "flex gap-1 items-center justify-center w-full px-6 py-1.5 hover:bg-[#F4F5F7]",
                {
                  hidden: value === id,
                }
              )}
              onClick={() => {
                onChange(id);
                setIsOpen(false);
              }}
            >
              <span
                className={clsx("px-1.5 rounded-full text-nowrap", id)}
              >
                {name}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
