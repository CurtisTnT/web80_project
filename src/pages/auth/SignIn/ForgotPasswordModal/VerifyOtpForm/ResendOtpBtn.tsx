import {
  forwardRef,
  Ref,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

export type ResendOtpBtnRef = {
  resetCountDown: () => void;
};

type Props = {
  onResendOtp: () => Promise<void>;
};

export default forwardRef(function ResendOtpBtn(
  props: Props,
  forwardRef: Ref<ResendOtpBtnRef>
) {
  const { onResendOtp } = props;

  const initCountDown = 60;
  const [countDown, setCountDown] = useState(initCountDown);

  useImperativeHandle(forwardRef, () => ({
    resetCountDown: handleResetCountDown,
  }));

  const handleResetCountDown = () => {
    setCountDown(initCountDown);
  };

  useEffect(() => {
    const intervalId = setTimeout(() => {
      setCountDown(countDown - 1);
    }, 1000);

    if (countDown === 0) {
      clearTimeout(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [countDown]);

  return countDown ? (
    <span className="text-white-dark text-sm font-medium">{countDown}(s)</span>
  ) : (
    <button
      type="button"
      className="text-primary text-sm font-medium hover:opacity-70"
      onClick={async () => {
        await onResendOtp();
        handleResetCountDown();
      }}
    >
      Resend
    </button>
  );
});
