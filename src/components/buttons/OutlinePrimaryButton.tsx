import React from "react";
import clsx from "clsx";

type Props = {
  title: string;
};

export default function OutlinePrimaryButton(
  props: Props & React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  const { title, className, ...btnProps } = props;

  return (
    <button
      {...btnProps}
      className={clsx(
        "px-3 py-1.5 bg-[#EEF4FB] border border-transparent rounded-md shadow-[0px_3px_10px_1px] shadow-dark-shadow text-primary hover:border-primary hover:shadow-none",
        className
      )}
      type="submit"
    >
      {title}
    </button>
  );
}
