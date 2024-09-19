import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { CgClose } from "react-icons/cg";
import { GoCheck } from "react-icons/go";
import { MdOutlineModeEdit } from "react-icons/md";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onReset: () => void;
  inputClassName?: string;
  labelClassName?: string;
};

export default function AsyncInput(props: Props) {
  const { value, onChange, onReset, inputClassName, labelClassName } = props;

  const [isEditTitle, setIsEditTitle] = useState(false);

  const ctnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isEditTitle) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (!ctnRef.current!.contains(event.target as Node)) {
        onReset();
        setIsEditTitle(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditTitle]);

  return isEditTitle ? (
    <div ref={ctnRef} className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoFocus
        className={clsx("w-full px-1", inputClassName)}
      />

      <div className="absolute top-7 right-0 flex items-center gap-2">
        <button
          type="button"
          className="flex items-center justify-center w-[30px] h-[30px] bg-white border shadow hover:bg-white-light rounded"
          onClick={() => setIsEditTitle(false)}
        >
          <GoCheck className="shrink-0" size={16} />
        </button>
        <button
          type="button"
          className="flex items-center justify-center w-[30px] h-[30px] bg-white border shadow hover:bg-white-light rounded"
          onClick={() => {
            onReset();
            setIsEditTitle(false);
          }}
        >
          <CgClose className="shrink-0" size={16} />
        </button>
      </div>
    </div>
  ) : (
    <div className="flex items-center group">
      <h4 className={clsx("flex-grow text-sm font-semibold", labelClassName)}>
        {value}
      </h4>
      <button
        type="button"
        onClick={() => setIsEditTitle(true)}
        className="invisible group-hover:visible"
      >
        <MdOutlineModeEdit size={20} className="shrink-0 text-white-dark" />
      </button>
    </div>
  );
}
