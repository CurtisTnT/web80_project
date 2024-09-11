import { PropsWithChildren } from "react";
import clsx from "clsx";

type Props = {
  className?: string;
};

export default function PageCard({
  className,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div className={clsx("relative p-5 bg-white rounded-lg shadow-lg", className)}>
      {children}
    </div>
  );
}
