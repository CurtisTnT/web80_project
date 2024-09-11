import { PropsWithChildren } from "react";

type Props = {
  label: string;
  value?: string | number | null;
};

export default function StaticField(props: PropsWithChildren<Props>) {
  const { label, value, children } = props;

  return (
    <div className="col-span-1 mb-4">
      <h6 className="text-white-dark text-sm font-medium font-space-grotesk">{label}</h6>
      {!children && <p className="break-words min-h-5">{value || ""}</p>}
      {children}
    </div>
  );
}
