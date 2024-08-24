import AppLogo from "@/layouts/AppLogo";
import SignInForm from "./SignInForm";

export default function SignIn() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="space-y-5">
        <AppLogo />

        <div className="flex gap-20">
          <img
            src="/assets/images/login-access.png"
            alt="login-access"
            width={500}
            className="shadow-[0px_0px_10px_1px] shadow-gray-300 rounded"
          />

          <div>
            <div className="space-y-3 mb-10">
              <h3 className="text-4xl font-extrabold">Welcome back!</h3>
              <p>Welcome back! Please enter your account.</p>
            </div>

            <SignInForm />
          </div>
        </div>
      </div>
    </div>
  );
}
