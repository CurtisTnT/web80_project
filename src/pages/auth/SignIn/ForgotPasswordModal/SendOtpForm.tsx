import clsx from "clsx";
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

import TextInput from "@/components/inputs/TextInput";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { ForgotPasswordQuery } from "@/reduxStore/interface";

type Props = {
  cardId: number;
  onSendOtp: (
    values: ForgotPasswordQuery,
    formikHelpers: FormikHelpers<ForgotPasswordQuery>
  ) => void;
};

export default function SendOtpForm(props: Props) {
  const { cardId, onSendOtp } = props;

  const sendOtpSchema = Yup.object({
    email: Yup.string().required("Email is required").email("Invalid email"),
  });

  return (
    <div
      className={clsx(
        "flex flex-col w-full shrink-0 py-4 items-center shadow-[0px_0px_10px_2px] shadow-dark-shadow rounded-md duration-300 delay-200",
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
          onSubmit={onSendOtp}
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
                <PrimaryButton title="Send OTP" className="font-bold" />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
