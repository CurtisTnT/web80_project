import { InputHTMLAttributes, RefObject, useEffect, useState } from "react";
import clsx from "clsx";
import { FormikProps } from "formik";

import FieldLabel, { FieldLabelProps } from "./FieldLabel";
import FieldError, { FieldErrorProps } from "./FieldError";

type Props = FieldLabelProps & {
  formikProps: FormikProps<any>;
  className?: string;
  inputRef?: RefObject<HTMLInputElement>;
  textInputProps?: InputHTMLAttributes<HTMLInputElement>;
  isDebounce?: boolean;
} & Pick<FieldErrorProps, "customErrMsg">;

export default function TextInput(props: Props) {
  const {
    label,
    name,
    isRequired,
    labelStyle,
    formikProps,
    className,
    inputRef,
    textInputProps,
    customErrMsg,
    isDebounce = false,
  } = props;
  const nameWithoutPrefix = name.split(".").pop() || "";
  const value: string = formikProps.values[nameWithoutPrefix] || "";

  const [text, setText] = useState(value);

  const isErrored =
    formikProps.touched[nameWithoutPrefix] &&
    !!(formikProps.errors[nameWithoutPrefix] || customErrMsg);

  useEffect(() => {
    if (!isDebounce) return;

    const timeoutId = setTimeout(() => {
      //Avoid re-rendering the form on every keystroke
      if (text !== value) {
        formikProps.setFieldValue(name, text);
      }
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  useEffect(() => {
    //Listen to value changes from outside
    if (isDebounce && value !== text) {
      setText(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className={className}>
      <FieldLabel
        label={label}
        name={name}
        isRequired={isRequired}
        labelStyle={labelStyle}
      />

      <input
        id={name}
        name={name}
        ref={inputRef}
        {...textInputProps}
        className={clsx("form-input", textInputProps?.className, {
          "!border-danger": isErrored,
        })}
        value={isDebounce ? text : value}
        onChange={(e) =>
          isDebounce
            ? setText(e.target.value)
            : formikProps.setFieldValue(name, e.target.value)
        }
        onBlur={(e) => {
          formikProps.handleBlur(e);
          textInputProps?.onBlur?.(e);
        }}
      />

      <FieldError
        name={name}
        isCusErrored={isErrored}
        customErrMsg={customErrMsg}
      />
    </div>
  );
}
