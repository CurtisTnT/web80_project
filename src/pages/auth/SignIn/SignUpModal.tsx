import { Ref } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import Modal, { ModalRef } from "@/components/modals/Modal";
import TextInput from "@/components/inputs/TextInput";
import PasswordInput from "@/components/inputs/PasswordInput";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { phoneRegExp } from "@/constants/regex";
import CenterToast from "@/components/toasts/CenterToast";

type FormValues = {
  userName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type Props = {
  signUpRef: Ref<ModalRef>;
  onLoading: (loading: boolean) => void;
  onClose: () => void;
};

export default function SignUpModal(props: Props) {
  const { signUpRef, onLoading, onClose } = props;

  const createAccSchema = Yup.object({
    userName: Yup.string().required("Full name is required"),
    email: Yup.string().required("Email is required").email("Invalid email"),
    phoneNumber: Yup.string().matches(phoneRegExp, "Invalid phone number"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Must use a minimum of 8 alpha-numeric characters"),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password")], "Password does not match"),
  });

  const handleCreateAccount = (values: FormValues) => {
    onLoading(true);

    setTimeout(() => {
      console.log(values);
      onClose();
      onLoading(false);
      CenterToast({
        title: "Register successfully!",
        text: "Your account has been successfully created. Please sign in using your credentials!",
        icon: "success",
      });
    }, 1000);
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
            userName: "",
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
                label="Full name"
                name="userName"
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

              <PrimaryButton title="Register" className="mt-2 font-bold" />
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
}
