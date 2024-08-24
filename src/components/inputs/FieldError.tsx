import { ErrorMessage } from "formik";

export type FieldErrorProps = {
  name: string;
  customErrMsg?: string;
  isCusErrored?: boolean;
};

export default function FieldError(props: FieldErrorProps) {
  const { name, customErrMsg, isCusErrored } = props;

  return (
    <div className="text-danger h-5 text-xs mt-0.5">
      <ErrorMessage name={name} component="div" />
      {isCusErrored && (customErrMsg || "")}
    </div>
  );
}
