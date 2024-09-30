import { useEffect, useState } from "react";
import { Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { isFulfilled } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import Breadcrumb from "@/layouts/Breadcrumb";
import PageCard from "@/layouts/PageCard";
import UserForm, { userSchema } from "@/components/forms/UserForm";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import OutlinePrimaryButton from "@/components/buttons/OutlinePrimaryButton";
import { User } from "@/reduxStore/interface";
import { initialUser } from "@/reduxStore/initialState";
import {
  deleteUser,
  getUserDetail,
  updateUser,
} from "@/reduxStore/users/action";
import {
  handleApiResponse,
  handleErrorReduxRes,
  handleSuccessReduxRes,
} from "@/utils/helpers";
import StaticForm from "./StaticForm";
import EditButton from "@/components/buttons/EditButton";
import { useAppDispatch, useAppSelect } from "@/reduxStore";
import CenterToast from "@/components/toasts/CenterToast";
import DangerButton from "@/components/buttons/DangerButton";

export default function UserDetail() {
  const params = useParams();
  const userId = params.id;

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { isAdmin, isLead } = useAppSelect((state) => state.auth);

  const [user, setUser] = useState<User>(initialUser);
  const [isEdit, setIsEdit] = useState(false);

  const handleDeleteUser = () => {
    CenterToast({
      title: "Delete user!",
      text: "Are you sure that you want to delete this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirm",
    }).then(async ({ isConfirmed }) => {
      if (isConfirmed) {
        const res = await dispatch(deleteUser({ id: user.id }));
        if (isFulfilled(res)) {
          handleSuccessReduxRes({
            payload: res.payload,
            onSuccess(res) {
              toast.success(res.message);
              navigate("/users");
            },
          });
        } else {
          handleErrorReduxRes({
            payload: res.payload,
            onError(res) {
              CenterToast({
                title: "Delete user failed!",
                text: res.message,
                icon: "error",
              });
            },
          });
        }
      }
    });
  };

  const handleUpdateUser = async (values: User) => {
    const res = await dispatch(updateUser(values));
    if (isFulfilled(res)) {
      handleSuccessReduxRes<User>({
        payload: res.payload,
        onSuccess(res) {
          setIsEdit(false);
          setUser(res.data);
          toast.success(res.message);
        },
      });
    } else {
      handleErrorReduxRes({
        payload: res.payload,
        onError(res) {
          CenterToast({
            title: "Update user failed!",
            text: res.message,
            icon: "error",
          });
        },
      });
    }
  };

  useEffect(() => {
    if (userId) {
      (async () => {
        const res = await getUserDetail({ id: userId });
        handleApiResponse({
          res,
          onSuccess(res) {
            setUser(res.data);
          },
        });
      })();
    }
  }, [userId]);

  return (
    <div className="p-5">
      <div className="flex justify-between items-center">
        <Breadcrumb
          items={[{ title: "Users", href: "/users" }, { title: "Detail" }]}
        />
        {(isAdmin || isLead) && (
          <DangerButton
            type="button"
            title="Delete"
            onClick={handleDeleteUser}
          />
        )}
      </div>

      <PageCard className="mt-5 flex gap-10">
        {!isEdit && (isAdmin || isLead) && (
          <EditButton
            onClick={() => setIsEdit(true)}
            className="absolute top-4 right-5"
          />
        )}

        <div className="flex justify-center items-center w-[150px] h-[150px] rounded-full object-contain shadow-[0px_0px_5px_1px] shadow-dark-shadow shrink-0">
          {user.avatar ? (
            <img src={user.avatar} alt="avatar" />
          ) : (
            <div className="text-7xl text-blue font-medium uppercase">
              {user.firstName.slice(0, 1)}
              {user.lastName.slice(0, 1)}
            </div>
          )}
        </div>

        <div className="flex-grow">
          {isEdit ? (
            <div>
              <Formik
                initialValues={user}
                onSubmit={handleUpdateUser}
                validationSchema={userSchema}
              >
                {(formikProps) => (
                  <>
                    <UserForm
                      formikProps={formikProps}
                      formId="update-user"
                      isEdit
                    />
                    <div className="flex justify-end gap-4">
                      <PrimaryButton
                        title="Update"
                        form="update-user"
                        disabled={
                          !formikProps.dirty || formikProps.isSubmitting
                        }
                        loading={formikProps.isSubmitting}
                      />
                      <OutlinePrimaryButton
                        title="Cancel"
                        onClick={() => setIsEdit(false)}
                        disabled={formikProps.isSubmitting}
                      />
                    </div>
                  </>
                )}
              </Formik>
            </div>
          ) : (
            <StaticForm user={user} />
          )}
        </div>
      </PageCard>
    </div>
  );
}
