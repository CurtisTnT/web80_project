import clsx from "clsx";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import OTPInput from "react-otp-input";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import * as Yup from "yup";

import PrimaryButton from "@/components/buttons/PrimaryButton";
import FieldError from "@/components/inputs/FieldError";
import { useRef } from "react";
import ResendOtpBtn from "./ResendOtpBtn";

type Props = {
  cardId: number;
  onGoBack: () => void;
  email: string;
  onVerifyOtp: (
    values: { otp: string },
    formikHelpers: FormikHelpers<{ otp: string }>
  ) => void;
  onResendOtp: () => Promise<void>;
};

export default function VerifyOtpForm(props: Props) {
  const { cardId, onGoBack, email, onVerifyOtp, onResendOtp } = props;

  const formikRef = useRef<FormikProps<{ otp: string }>>(null);

  const verifyOtpSchema = Yup.object({
    otp: Yup.string()
      .required("OTP is required")
      .min(6, "OTP must be 6 digits"),
  });

  return (
    <div
      className={clsx(
        "relative flex flex-col w-full shrink-0 py-4 items-center shadow-[0px_0px_10px_2px] shadow-dark-shadow rounded-md duration-300 delay-200",
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
        onClick={() => {
          onGoBack();
          formikRef.current?.resetForm();
        }}
      >
        <HiOutlineArrowNarrowLeft size={20} />
        Back
      </button>

      <h2 className="text-2xl font-semibold">Enter OTP</h2>
      <p className="text-sm text-center">
        We have shared an OTP to <b>{email}</b>.
        <br />
        Please use this OTP to verify!
      </p>

      <div className="mt-4">
        <Formik
          initialValues={{ otp: "" }}
          onSubmit={onVerifyOtp}
          validationSchema={verifyOtpSchema}
          innerRef={formikRef}
        >
          {(formikProps) => (
            <Form onSubmit={formikProps.handleSubmit}>
              <div className="hide-up-down-input">
                <OTPInput
                  value={formikProps.values.otp}
                  onChange={(otp) => formikProps.setFieldValue("otp", otp)}
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

              <div className="flex flex-col items-center gap-4">
                {cardId === 2 && <ResendOtpBtn onResendOtp={onResendOtp} />}
                <PrimaryButton title="Verify OTP" className="font-bold" />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
