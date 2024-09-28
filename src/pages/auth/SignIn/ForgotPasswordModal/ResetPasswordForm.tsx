import clsx from "clsx";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import * as Yup from "yup";

import PrimaryButton from "@/components/buttons/PrimaryButton";
import PasswordInput from "@/components/inputs/PasswordInput";
import { ResetPasswordQuery } from "@/reduxStore/interface";
import { useRef } from "react";

type Props = {
  cardId: number;
  onGoBack: () => void;
  onResetPassword: (
    values: Omit<ResetPasswordQuery, "email">,
    formikHelpers: FormikHelpers<Omit<ResetPasswordQuery, "email">>
  ) => void;
};

export default function ResetPasswordForm(props: Props) {
  const { cardId, onGoBack, onResetPassword } = props;

  const formikRef =
    useRef<FormikProps<Omit<ResetPasswordQuery, "email">>>(null);

  const resetPasswordSchema = Yup.object({
    curPassword: Yup.string()
      .required("Current password is required")
      .min(8, "Must use a minimum of 8 characters"),
    newPassword: Yup.string()
      .required("New password is required")
      .min(8, "Must use a minimum of 8 characters"),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("newPassword")], "Password does not match"),
  });

  return (
    <div
      className={clsx(
        "relative flex flex-col w-full shrink-0 py-4 items-center shadow-[0px_0px_10px_2px] shadow-dark-shadow rounded-md duration-300 delay-200",
        {
          "scale-100": cardId === 3,
          "scale-[85%]": cardId !== 3,
        }
      )}
    >
      <button
        type="button"
        className={clsx(
          "absolute -top-8 -left-14 flex items-center gap-2 hover:text-primary duration-300",
          {
            "opacity-100": cardId === 3,
            "opacity-0": cardId !== 3,
          }
        )}
        onClick={() => {
          onGoBack();
          formikRef.current?.resetForm();
        }}
      >
        <HiOutlineArrowNarrowLeft size={20} />
        Back
      </button>

      <h2 className="text-2xl font-semibold">Reset password</h2>
      <p className="text-sm text-center">Please enter your new password!</p>

      <div className="w-2/3 mt-4">
        <Formik
          initialValues={{
            curPassword: "",
            newPassword: "",
            confirmPassword: "",
          }}
          onSubmit={onResetPassword}
          validationSchema={resetPasswordSchema}
          innerRef={formikRef}
        >
          {(formikProps) => (
            <Form onSubmit={formikProps.handleSubmit}>
              <PasswordInput
                label="Current password"
                name="curPassword"
                isRequired
                formikProps={formikProps}
              />

              <PasswordInput
                label="New password"
                name="newPassword"
                isRequired
                formikProps={formikProps}
              />

              <PasswordInput
                label="Confirm password"
                name="confirmPassword"
                isRequired
                formikProps={formikProps}
              />

              <div className="flex flex-col items-center">
                <PrimaryButton title="Reset password" className="font-bold" />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
