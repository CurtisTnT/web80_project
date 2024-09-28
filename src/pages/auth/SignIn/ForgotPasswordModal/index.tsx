import { Ref, useState } from "react";
import clsx from "clsx";
import { FormikHelpers } from "formik";
import toast from "react-hot-toast";

import Modal, { ModalRef } from "@/components/modals/Modal";
import CenterToast from "@/components/toasts/CenterToast";
import {
  ForgotPasswordQuery,
  ResetPasswordQuery,
} from "@/reduxStore/interface";
import {
  forgotPassword,
  resetPassword,
  verifyOtp,
} from "@/reduxStore/auth/action";
import { handleApiResponse } from "@/utils/helpers";
import SendOtpForm from "./SendOtpForm";
import VerifyOtpForm from "./VerifyOtpForm";
import ResetPasswordForm from "./ResetPasswordForm";

type Props = {
  forgotPasswordRef: Ref<ModalRef>;
  onClose: () => void;
  onLoading: (loading: boolean) => void;
};

export default function ForgotPasswordModal(props: Props) {
  const { forgotPasswordRef, onClose, onLoading } = props;

  const [cardId, setCardId] = useState(1);
  const [email, setEmail] = useState("");

  const handleGoNext = (cardId: number) => {
    setCardId(cardId);
  };

  const handleGoBack = () => {
    setCardId(cardId - 1);
  };

  const handleResetState = () => {
    setCardId(1);
    setEmail("");
  };

  const handleSendOtp = async (
    values: ForgotPasswordQuery,
    formikHelpers: FormikHelpers<ForgotPasswordQuery>
  ) => {
    const { email } = values;
    onLoading(true);

    const res = await forgotPassword(values);

    handleApiResponse({
      res,
      onSuccess() {
        handleGoNext(2);
        setEmail(email);
        formikHelpers.resetForm();
      },
      onError(res) {
        formikHelpers.setFieldError("email", res.message);
      },
    });
    onLoading(false);
  };

  const handleResendOtp = async () => {
    onLoading(true);

    const res = await forgotPassword({ email });

    handleApiResponse({
      res,
      onSuccess() {
        toast.success("Resend otp successfully!");
      },
    });
    onLoading(false);
  };

  const handleVerifyOtp = async (
    values: { otp: string },
    formikHelpers: FormikHelpers<{ otp: string }>
  ) => {
    onLoading(true);

    const res = await verifyOtp({ otp: values.otp, email });

    handleApiResponse({
      res,
      onSuccess() {
        handleGoNext(3);
        formikHelpers.resetForm();
      },
      onError(res) {
        formikHelpers.setFieldError("otp", res.message);
      },
    });

    onLoading(false);
  };

  const handleResetPassword = async (
    values: Omit<ResetPasswordQuery, "email">,
    formikHelpers: FormikHelpers<Omit<ResetPasswordQuery, "email">>
  ) => {
    onLoading(true);

    const res = await resetPassword({ ...values, email });

    handleApiResponse({
      res,
      onSuccess(res) {
        CenterToast({
          title: "Reset password successfully!",
          text: res.message,
          icon: "success",
        });
        formikHelpers.resetForm();
        onClose();
      },
      onError(res) {
        formikHelpers.setFieldError("confirmPassword", res.message);
      },
    });

    onLoading(false);
  };

  return (
    <Modal ref={forgotPasswordRef} onClosed={handleResetState}>
      <div className="overflow-hidden">
        <div
          className={clsx("flex gap-28 pt-16 pb-6 px-14 duration-300", {
            "translate-x-0": cardId === 1,
            "-translate-x-[536px]": cardId === 2,
            "-translate-x-[1072px]": cardId === 3,
          })}
        >
          <SendOtpForm cardId={cardId} onSendOtp={handleSendOtp} />

          <VerifyOtpForm
            cardId={cardId}
            onGoBack={handleGoBack}
            email={email}
            onVerifyOtp={handleVerifyOtp}
            onResendOtp={handleResendOtp}
          />

          <ResetPasswordForm
            cardId={cardId}
            onGoBack={handleGoBack}
            onResetPassword={handleResetPassword}
          />
        </div>
      </div>
    </Modal>
  );
}
