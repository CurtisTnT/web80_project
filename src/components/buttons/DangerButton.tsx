import React, { PropsWithChildren } from "react";
import clsx from "clsx";

import Loader from "@/components/loading/Loader";

type Props = {
  title?: string;
  loading?: boolean;
};

export default function DangerButton(
  props: PropsWithChildren<Props> &
    React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  const { title, loading = false, className, children, ...btnProps } = props;

  return (
    <button
      {...btnProps}
      className={clsx(
        "relative flex gap-1 items-center justify-center w-auto px-4 py-1.5 bg-danger border border-transparent rounded-md shadow-[0px_5px_15px_1px] shadow-danger/40 text-white hover:bg-white hover:border-danger hover:shadow-none hover:text-danger disabled:opacity-50 disabled:hover:bg-danger disabled:hover:text-white disabled:hover:cursor-not-allowed",
        className
      )}
      type="submit"
    >
      {children || title}
      {loading && <Loader className="absolute !border-2 !w-5 !h-5" />}
    </button>
  );
}
