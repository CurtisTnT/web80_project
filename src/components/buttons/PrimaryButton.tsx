import React, { PropsWithChildren } from "react";
import clsx from "clsx";

type Props = {
  title?: string;
};

export default function PrimaryButton(
  props: PropsWithChildren<Props> &
    React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  const { title, className, children, ...btnProps } = props;

  return (
    <button
      {...btnProps}
      className={clsx(
        "flex gap-1 items-center justify-center w-auto px-4 py-1.5 bg-blue border border-transparent rounded-md shadow-[0px_5px_15px_1px] shadow-blue/40 text-white hover:bg-white hover:border-blue hover:shadow-none hover:text-blue",
        className
      )}
      type="submit"
    >
      {children || title}
    </button>
  );
}
