import { Ref } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import Modal, { ModalRef } from "@/components/modals/Modal";
import TextInput from "@/components/inputs/TextInput";
import PasswordInput from "@/components/inputs/PasswordInput";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { phoneRegExp } from "@/constants/regex";
import CenterToast from "@/components/toasts/CenterToast";
import { signUp } from "@/reduxStore/auth/action";
import { SignUpQuery } from "@/reduxStore/interface";
import { handleApiResponse } from "@/utils/helpers";

type Props = {
  signUpRef: Ref<ModalRef>;
  onLoading: (loading: boolean) => void;
  onClose: () => void;
};

export default function SignUpModal(props: Props) {
  const { signUpRef, onLoading, onClose } = props;

  const createAccSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().required("Email is required").email("Invalid email"),
    phoneNumber: Yup.string().matches(phoneRegExp, "Invalid phone number"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Must use a minimum of 8 alpha-numeric characters"),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password")], "Password does not match"),
  });

  const handleCreateAccount = async (values: SignUpQuery) => {
    onLoading(true);

    const res = await signUp(values);

    handleApiResponse({
      res,
      onSuccess(res) {
        onClose();
        CenterToast({
          title: "Register successfully!",
          text: res.message,
          icon: "success",
        });
      },
      onError(res) {
        CenterToast({
          title: "Register failed!",
          text: res.message,
          icon: "error",
        });
      },
    });
    onLoading(false);
  };

  return (
    <Modal
      ref={signUpRef}
      header={
        <h2 className="text-center text-2xl font-bold">Create account</h2>
      }
      size="md"
    >
      <div className="flex items-center justify-between mt-5">
        <div>
          <img src="./assets/images/sign-up.png" alt="sign-up" width={350} />

          <div className="text-center font-medium font-space-grotesk">
            Hi there! <br />
            Let us help you arrange your work.
          </div>
        </div>

        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            phoneNumber: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={handleCreateAccount}
          validationSchema={createAccSchema}
        >
          {(formikProps) => (
            <Form className="w-[330px]" onSubmit={formikProps.handleSubmit}>
              <TextInput
                isRequired
                label="First name"
                name="firstName"
                formikProps={formikProps}
              />

              <TextInput
                isRequired
                label="Last name"
                name="lastName"
                formikProps={formikProps}
              />

              <TextInput
                label="Phone number"
                name="phoneNumber"
                formikProps={formikProps}
              />

              <TextInput
                isRequired
                label="Email"
                name="email"
                formikProps={formikProps}
              />

              <PasswordInput
                isRequired
                label="Password"
                name="password"
                formikProps={formikProps}
              />

              <PasswordInput
                isRequired
                label="Confirm password"
                name="confirmPassword"
                formikProps={formikProps}
              />

              <PrimaryButton
                title="Register"
                className="!w-full mt-2 font-bold"
              />
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
}
