import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { isFulfilled } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import Breadcrumb from "@/layouts/Breadcrumb";
import PageCard from "@/layouts/PageCard";
import UserForm, { userSchema } from "@/components/forms/UserForm";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import OutlinePrimaryButton from "@/components/buttons/OutlinePrimaryButton";
import { initialUser } from "@/reduxStore/initialState";
import { useAppDispatch } from "@/reduxStore";
import { createUser } from "@/reduxStore/users/action";
import { User } from "@/reduxStore/interface";
import { handleErrorReduxRes, handleSuccessReduxRes } from "@/utils/helpers";
import CenterToast from "@/components/toasts/CenterToast";

export default function NewUser() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleCreateUser = async (values: User) => {
    const res = await dispatch(createUser(values));

    if (isFulfilled(res)) {
      handleSuccessReduxRes<User>({
        payload: res.payload,
        onSuccess(res) {
          navigate("/users");
          toast.success(res.message);
        },
      });
    } else {
      handleErrorReduxRes({
        payload: res.payload,
        onError(res) {
          CenterToast({
            title: "Create user failed!",
            text: res.message,
            icon: "error",
          });
        },
      });
    }
  };

  return (
    <div className="p-5">
      <Breadcrumb
        items={[{ title: "Users", href: "/users" }, { title: "Create user" }]}
      />

      <PageCard className="mt-5">
        <Formik
          initialValues={initialUser}
          onSubmit={handleCreateUser}
          validationSchema={userSchema}
        >
          {(formikProps) => (
            <>
              <UserForm formikProps={formikProps} formId="create-user" />
              <div className="flex justify-end gap-4">
                <PrimaryButton
                  title="Create"
                  form="create-user"
                  disabled={formikProps.isSubmitting}
                  loading={formikProps.isSubmitting}
                />
                <OutlinePrimaryButton
                  title="Cancel"
                  onClick={() => navigate("/users")}
                  disabled={formikProps.isSubmitting}
                />
              </div>
            </>
          )}
        </Formik>
      </PageCard>
    </div>
  );
}
