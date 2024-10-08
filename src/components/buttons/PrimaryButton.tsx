import React, { PropsWithChildren } from "react";
import clsx from "clsx";

import Loader from "@/components/loading/Loader";

type Props = {
  title?: string;
  loading?: boolean;
};

export default function PrimaryButton(
  props: PropsWithChildren<Props> &
    React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  const { title, loading = false, className, children, ...btnProps } = props;

  return (
    <button
      {...btnProps}
      className={clsx(
        "relative flex gap-1 items-center justify-center w-auto px-4 py-1.5 bg-blue border border-transparent rounded-md shadow-[0px_5px_15px_1px] shadow-blue/40 text-white hover:bg-white hover:border-blue hover:shadow-none hover:text-blue disabled:opacity-50 disabled:hover:bg-blue disabled:hover:text-white disabled:hover:cursor-not-allowed",
        className
      )}
      type="submit"
    >
      {children || title}
      {loading && <Loader className="absolute !border-2 !w-5 !h-5" />}
    </button>
  );
}
