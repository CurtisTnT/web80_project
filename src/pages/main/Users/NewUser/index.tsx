import { Formik } from "formik";
// import { PiUserCircleLight } from "react-icons/pi";
import { FiCamera } from "react-icons/fi";

import Breadcrumb from "@/layouts/Breadcrumb";
import PageCard from "@/layouts/PageCard";
import { initialUser } from "@/services/initialState";
import { User } from "@/services/interface";
import UserForm, { userSchema } from "@/components/forms/UserForm";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import OutlinePrimaryButton from "@/components/buttons/OutlinePrimaryButton";
import { useNavigate } from "react-router-dom";

export default function NewUser() {
  const navigate = useNavigate();

  const handleCreateUser = (values: User) => {
    console.log(values);
  };

  return (
    <div className="p-5">
      <Breadcrumb
        items={[{ title: "Users", href: "/users" }, { title: "Create user" }]}
      />

      <PageCard className="mt-5">
        <div className="flex items-start gap-10">
          <div className="relative">
            {/* <div>
              <PiUserCircleLight size={100} className="text-white-dark" />
            </div> */}
            <button
              type="button"
              className="border-2 border-white ring-2 ring-pink-500 rounded-full shadow-[0px_0px_10px_1px] shadow-white-dark/40 overflow-hidden"
            >
              <img
                src="/assets/images/sign-up.png"
                alt="avatar"
                className="w-[100px] h-[100px] object-contain"
              />
            </button>
            <button
              type="button"
              className="absolute bottom-1 right-1 p-1.5 bg-dark-light border border-white rounded-full"
            >
              <FiCamera size={16} />
            </button>
          </div>

          <div className="flex-grow">
            <Formik
              initialValues={initialUser}
              onSubmit={handleCreateUser}
              validationSchema={userSchema}
            >
              {(formikProps) => (
                <UserForm formikProps={formikProps} formId="create-user" />
              )}
            </Formik>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <PrimaryButton title="Create" form="create-user" />
          <OutlinePrimaryButton
            title="Cancel"
            onClick={() => navigate("/users")}
          />
        </div>
      </PageCard>
    </div>
  );
}
