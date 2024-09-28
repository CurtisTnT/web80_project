import { useRef } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";

import TextInput from "@/components/inputs/TextInput";
import PasswordInput from "@/components/inputs/PasswordInput";
import ForgotPasswordModal from "./ForgotPasswordModal";
import { ModalRef } from "@/components/modals/Modal";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import SignUpModal from "./SignUpModal";
import { SignInQuery } from "@/reduxStore/interface";
import { useAppDispatch, useAppSelect } from "@/reduxStore";
import { signIn } from "@/reduxStore/auth/action";
import { isRejected } from "@reduxjs/toolkit";
import { handleErrorReduxRes } from "@/utils/helpers";
import ComponentSpinner from "@/components/loading/ComponentSpinner";

export default function SignInForm() {
  const dispatch = useAppDispatch();
  const loading = useAppSelect((state) => state.auth.loading);

  const forgotPasswordRef = useRef<ModalRef>(null);
  const signUpRef = useRef<ModalRef>(null);

  const signInSchema = Yup.object({
    email: Yup.string().required("Email is required").email("Invalid email"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Must be a minimum of 8 characters"),
  });

  const handleLogin = async (
    values: SignInQuery,
    formikHelpers: FormikHelpers<SignInQuery>
  ) => {
    const res = await dispatch(signIn(values));

    if (isRejected(res)) {
      handleErrorReduxRes({
        payload: res.payload,
        onError(res) {
          formikHelpers.setFieldError("password", res.message);
        },
      });
    }
  };

  return (
    <>
      <ComponentSpinner isLoading={loading}>
        <div className="p-2">
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={handleLogin}
            validationSchema={signInSchema}
          >
            {(formikProps) => (
              <Form onSubmit={formikProps.handleSubmit}>
                <TextInput
                  label="Email"
                  name="email"
                  isRequired
                  formikProps={formikProps}
                />

                <PasswordInput
                  label="Password"
                  name="password"
                  isRequired
                  formikProps={formikProps}
                />

                <div className="space-y-7">
                  <button
                    type="button"
                    className="text-xs text-primary underline italic hover:opacity-80"
                    onClick={() => forgotPasswordRef.current?.open()}
                  >
                    Forgot password
                  </button>

                  <PrimaryButton
                    title="Sign in"
                    className="!w-full font-bold"
                  />

                  <div className="text-sm font-space-grotesk">
                    Don't have an account?{" "}
                    <button
                      type="button"
                      className="underline font-medium"
                      onClick={() => signUpRef.current?.open()}
                    >
                      Sign up for free
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </ComponentSpinner>

      <ForgotPasswordModal
        forgotPasswordRef={forgotPasswordRef}
        onClose={() => forgotPasswordRef.current?.close()}
        onLoading={(loading) => forgotPasswordRef.current?.onLoading(loading)}
      />

      <SignUpModal
        signUpRef={signUpRef}
        onLoading={(loading) => signUpRef.current?.onLoading(loading)}
        onClose={() => signUpRef.current?.close()}
      />
    </>
  );
}
