import { Ref, useState } from "react";
import clsx from "clsx";
import { Form, Formik } from "formik";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import * as Yup from "yup";
import OtpInput from "react-otp-input";

import PrimaryButton from "@/components/buttons/PrimaryButton";
import TextInput from "@/components/inputs/TextInput";
import Modal, { ModalRef } from "@/components/modals/Modal";
import FieldError from "@/components/inputs/FieldError";
import CenterToast from "@/components/toasts/CenterToast";

type Props = {
  forgotPasswordRef: Ref<ModalRef>;
  onClose: () => void;
  onLoading: (loading: boolean) => void;
};

export default function ForgotPasswordModal(props: Props) {
  const { forgotPasswordRef, onClose, onLoading } = props;

  const [cardId, setCardId] = useState(1);
  const [email, setEmail] = useState("");

  const sendOtpSchema = Yup.object({
    email: Yup.string().required("Email is required").email("Invalid email"),
  });

  const resetPasswordSchema = Yup.object({
    otp: Yup.string()
      .required("OTP is required")
      .min(6, "OTP must be 6 digits"),
  });

  const handleGoNext = () => {
    setCardId(2);
  };

  const handleGoBack = () => {
    setCardId(1);
  };

  const handleResetState = () => {
    setCardId(1);
    setEmail("");
  };

  const handleSendOtp = (values: { email: string }) => {
    const { email } = values;
    onLoading(true);
    setTimeout(() => {
      onLoading(false);
      handleGoNext();
      setEmail(email);
    }, 1000);
  };

  const handleResetPassword = (values: { otp: string }) => {
    onLoading(true);

    setTimeout(() => {
      onClose();
      onLoading(false);
      console.log(values);
      CenterToast({
        title: "Reset password successfully!",
        text: "Your password has been reset. Please sign in with your updated credentials!",
        icon: "success",
      });
    }, 1000);
  };

  return (
    <Modal ref={forgotPasswordRef} onClosed={handleResetState}>
      <div className="overflow-hidden">
        <div
          className={clsx("flex gap-20 pt-16 pb-6 px-14 duration-300", {
            "translate-x-0": cardId === 1,
            "-translate-x-[500px]": cardId === 2,
          })}
        >
          <div
            className={clsx(
              "flex flex-col w-full shrink-0 py-4 items-center shadow-[0px_0px_10px_2px] shadow-gray-200 rounded-md duration-300 delay-200",
              {
                "scale-100": cardId === 1,
                "scale-[85%]": cardId !== 1,
              }
            )}
          >
            <h2 className="text-2xl font-semibold">Forgot password</h2>
            <p className="text-sm text-center">
              Enter your registered email address.
              <br />
              We'll send you a code to reset your password
            </p>

            <div className="w-2/3 mt-4">
              <Formik
                initialValues={{ email: "" }}
                onSubmit={handleSendOtp}
                validationSchema={sendOtpSchema}
              >
                {(formikProps) => (
                  <Form onSubmit={formikProps.handleSubmit}>
                    <TextInput
                      label="Email"
                      name="email"
                      isRequired
                      formikProps={formikProps}
                    />

                    <div className="flex flex-col items-center">
                      <PrimaryButton
                        title="Send OTP"
                        className="!px-4 !py-2 !w-auto"
                      />
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>

          <div
            className={clsx(
              "relative flex flex-col w-full shrink-0 py-4 items-center shadow-[0px_0px_10px_2px] shadow-gray-200 rounded-md duration-300 delay-200",
              {
                "scale-100": cardId === 2,
                "scale-[85%]": cardId !== 2,
              }
            )}
          >
            <button
              type="button"
              className={clsx(
                "absolute -top-8 -left-14 flex items-center gap-2 hover:text-primary duration-300",
                {
                  "opacity-100": cardId === 2,
                  "opacity-0": cardId !== 2,
                }
              )}
              onClick={handleGoBack}
            >
              <HiOutlineArrowNarrowLeft size={20} />
              Back
            </button>

            <h2 className="text-2xl font-semibold">Enter OTP</h2>
            <p className="text-sm text-center">
              We have shared a code of your registered email address at {email}
            </p>

            <div className="mt-4">
              <Formik
                initialValues={{ otp: "" }}
                onSubmit={handleResetPassword}
                validationSchema={resetPasswordSchema}
              >
                {(formikProps) => (
                  <Form onSubmit={formikProps.handleSubmit}>
                    <div className="hide-up-down-input">
                      <OtpInput
                        value={formikProps.values.otp}
                        onChange={(otp) =>
                          formikProps.setFieldValue("otp", otp)
                        }
                        numInputs={6}
                        inputType="number"
                        renderInput={(props) => (
                          <input
                            {...props}
                            className="!w-9 h-10 sm:!w-[47px] sm:h-[62px] border !border-[#888EA8] text-2xl rounded-[6px]"
                          />
                        )}
                        containerStyle="gap-3"
                      />
                      <FieldError name="otp" />
                    </div>

                    <div className="flex flex-col items-center">
                      <PrimaryButton
                        title="Reset password"
                        className="!px-4 !py-2 !w-auto"
                      />
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
