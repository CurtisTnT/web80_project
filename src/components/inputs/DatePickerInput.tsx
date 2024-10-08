import { useRef } from "react";
import Flatpickr, { DateTimePickerProps } from "react-flatpickr";
import clsx from "clsx";
import { LuCalendarDays } from "react-icons/lu";

import { formatNormalDate } from "@/utils/helpers";

type Props = {
  value: string;
  onChange: (dates: Date[]) => void;
  onBlur?: () => void;
  dateFormat?: string;
  disabled?: boolean;
  isErrored?: boolean;
};

export default function DatePickerInput(props: Props) {
  const {
    value,
    onChange,
    onBlur,
    dateFormat = "d/m/Y",
    disabled,
    isErrored,
  } = props;

  const flatpickrRef = useRef<Flatpickr>(null);
  const flatpickrCtnRef = useRef<HTMLDivElement>(null);

  const date = value ? formatNormalDate(value) : "";
  const today = new Date();
  const options: DateTimePickerProps["options"] =
    date && new Date(date) < today
      ? {
          dateFormat,
          minDate: new Date(date),
          disable: [
            {
              from: new Date(date).setDate(new Date(date).getDate() + 1),
              to: today.setDate(today.getDate() - 1),
            },
          ],
        }
      : { dateFormat, minDate: today };

  return (
    <div
      ref={flatpickrCtnRef}
      className={clsx("flex border rounded-[6px] overflow-hidden", {
        "border-danger": isErrored,
        "border-white-light": !isErrored,
      })}
    >
      <Flatpickr
        onClick={() => {
          flatpickrCtnRef.current?.classList.add("!border-primary");
        }}
        onClose={() => {
          flatpickrCtnRef.current?.classList.remove("!border-primary");
          onBlur && onBlur();
        }}
        ref={flatpickrRef}
        placeholder="Select"
        value={date}
        options={options}
        className="w-full h-9 border-0 !outline-none text-sm pl-4 disabled:bg-disable-bg disabled:text-disable-text"
        onChange={onChange}
        disabled={disabled}
      />
      <button
        type="button"
        className="w-10 h-9 shrink-0 flex justify-center items-center bg-[#EEEEEE] border-l border-inherit text-white-dark cursor-pointer"
        onClick={() => {
          flatpickrCtnRef.current?.classList.add("!border-primary");
          flatpickrRef.current?.flatpickr.open();
        }}
        disabled={disabled}
      >
        <LuCalendarDays size={20} />
      </button>
    </div>
  );
}
