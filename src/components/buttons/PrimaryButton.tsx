import React from "react";
import clsx from "clsx";

type Props = {
  title: string;
};

export default function PrimaryButton(
  props: Props & React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  const { title, className, ...btnProps } = props;

  return (
    <button
      {...btnProps}
      className={clsx(
        "w-full py-3 bg-blue border border-transparent rounded-md shadow-[0px_5px_15px_1px] shadow-blue/40 text-white font-bold hover:bg-white hover:border-blue hover:shadow-none hover:text-blue",
        className
      )}
      type="submit"
    >
      {title}
    </button>
  );
}
