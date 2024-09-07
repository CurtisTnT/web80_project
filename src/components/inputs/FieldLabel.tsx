import clsx from "clsx";

export type FieldLabelProps = {
  label: string;
  name: string;
  labelStyle?: string;
  isRequired?: boolean;
};

export default function FieldLabel(props: FieldLabelProps) {
  const { label, name, isRequired, labelStyle } = props;
  return (
    <div className="flex gap-1 text-sm font-medium font-space-grotesk">
      <label htmlFor={name} className={labelStyle}>
        {label}
      </label>

      <span
        className={clsx("text-danger", {
          hidden: !isRequired,
        })}
      >
        *
      </span>
    </div>
  );
}
