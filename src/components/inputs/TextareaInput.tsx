import { InputHTMLAttributes, RefObject, useEffect, useState } from "react";
import clsx from "clsx";
import { FormikProps } from "formik";

import FieldLabel, { FieldLabelProps } from "./FieldLabel";
import FieldError, { FieldErrorProps } from "./FieldError";

type Props = FieldLabelProps & {
  formikProps: FormikProps<any>;
  className?: string;
  inputRef?: RefObject<HTMLInputElement>;
  textareaProps?: InputHTMLAttributes<HTMLTextAreaElement>;
  isDebounce?: boolean;
} & Pick<FieldErrorProps, "customErrMsg">;

export default function TextareaInput(props: Props) {
  const {
    label,
    name,
    isRequired,
    labelStyle,
    formikProps,
    className,
    textareaProps,
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

  useEffect(() => {
    const textAreaEls = document.querySelectorAll(".form-textarea");
    if (!textAreaEls) return;

    const autoExpand = (el: HTMLElement) => {
      el.style.height = "auto";
      el.style.height = el.scrollHeight + "px";
    };

    textAreaEls.forEach((textAreaEl) =>
      textAreaEl.addEventListener("input", () =>
        autoExpand(textAreaEl as HTMLElement)
      )
    );

    return () => {
      textAreaEls.forEach((textAreaEl) =>
        textAreaEl.removeEventListener("input", () =>
          autoExpand(textAreaEl as HTMLElement)
        )
      );
    };
  }, []);

  return (
    <div className={className}>
      <FieldLabel
        label={label}
        name={name}
        isRequired={isRequired}
        labelStyle={labelStyle}
      />

      <textarea
        id={name}
        name={name}
        {...textareaProps}
        className={clsx("form-textarea", textareaProps?.className, {
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
          textareaProps?.onBlur?.(e);
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
