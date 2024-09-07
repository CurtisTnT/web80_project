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
        "w-full py-3 bg-[#EEF4FB] border border-transparent rounded-md shadow-[0px_5px_15px_1px] shadow-dark/20 text-primary hover:border-primary hover:shadow-none",
        className
      )}
      type="submit"
    >
      {title}
    </button>
  );
}
