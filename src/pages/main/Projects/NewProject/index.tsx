import { Formik } from "formik";

import Breadcrumb from "@/layouts/Breadcrumb";
import PageCard from "@/layouts/PageCard";
import ProjectForm from "@/components/forms/ProjectForm";
import { Project } from "@/services/interface";
import { initialProject } from "@/services/initialState";
import FieldLabel from "@/components/inputs/FieldLabel";
import UsersTable from "@/components/tables/UsersTable";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import PlusIcon from "@/icons/PlusIcon";
import UserCardModal from "./UserCardModal";
import { useRef } from "react";
import { ModalRef } from "@/components/modals/Modal";

type FormValues = Pick<Project, "title" | "desc" | "endDate" | "startDate">;

export default function NewProject() {
  const userCardModalRef = useRef<ModalRef>(null);
  const handleCreateProject = (values: FormValues) => {
    console.log(values);
  };

  return (
    <div className="p-5">
      <Breadcrumb
        items={[
          { title: "Projects", href: "/projects" },
          { title: "Create project" },
        ]}
      />

      <PageCard className="mt-5">
        <Formik initialValues={initialProject} onSubmit={handleCreateProject}>
          {(formikProps) => <ProjectForm formikProps={formikProps} />}
        </Formik>

        <div>
          <FieldLabel name="members" label="Members" />
          <UsersTable />
          <div className="flex justify-center items-center mt-2">
            <PrimaryButton
              type="button"
              className="!w-auto px-2.5 py-1"
              onClick={() => userCardModalRef.current?.open()}
            >
              <PlusIcon />
              <span className="text-sm">Add member(s)</span>
            </PrimaryButton>
          </div>
        </div>
      </PageCard>

      <UserCardModal userCardModalRef={userCardModalRef} />
    </div>
  );
}
