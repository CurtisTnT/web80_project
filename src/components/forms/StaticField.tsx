import { PropsWithChildren } from "react";
import clsx from "clsx";

type Props = {
  label: string | React.ReactNode;
  value?: string | number | null;
  className?: string;
};

export default function StaticField(props: PropsWithChildren<Props>) {
  const { label, value, className, children } = props;

  return (
    <div className={clsx("col-span-1 mb-4", className)}>
      <h6 className="col-span-1 text-white-dark text-sm font-medium font-space-grotesk">
        {label}
      </h6>
      {!children && <p className="break-words min-h-5">{value || ""}</p>}
      {children}
    </div>
  );
}
