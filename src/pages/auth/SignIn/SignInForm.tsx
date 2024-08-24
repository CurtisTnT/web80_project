import { useRef } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import TextInput from "@/components/inputs/TextInput";
import PasswordInput from "@/components/inputs/PasswordInput";
import ForgotPasswordModal from "./ForgotPasswordModal";
import { ModalRef } from "@/components/modals/Modal";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import SignUpModal from "./SignUpModal";

export default function SignInForm() {
  const forgotPasswordRef = useRef<ModalRef>(null);
  const signUpRef = useRef<ModalRef>(null);

  const signInSchema = Yup.object({
    email: Yup.string().required("Email is required").email("Invalid email"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Must be a minimum of 8 alpha-numeric characters"),
  });

  const handleLogin = (values: { email: string; password: string }) => {
    console.log(values);
  };

  return (
    <>
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
                className="text-xs underline hover:opacity-80"
                onClick={() => forgotPasswordRef.current?.open()}
              >
                Forgot password
              </button>

              <PrimaryButton title="Sign in" />

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
