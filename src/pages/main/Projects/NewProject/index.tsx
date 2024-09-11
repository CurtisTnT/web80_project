import { Formik } from "formik";

import Breadcrumb from "@/layouts/Breadcrumb";
import PageCard from "@/layouts/PageCard";
import ProjectForm, { projectSchema } from "@/components/forms/ProjectForm";
import { Project } from "@/services/interface";
import { initialProject } from "@/services/initialState";
import AddMembersTable from "@/components/tables/AddMembersTable";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import OutlinePrimaryButton from "@/components/buttons/OutlinePrimaryButton";
import { useNavigate } from "react-router-dom";

type FormValues = Pick<Project, "title" | "desc" | "endDate" | "startDate">;

export default function NewProject() {
  const navigate = useNavigate();

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
        <Formik
          initialValues={initialProject}
          onSubmit={handleCreateProject}
          validationSchema={projectSchema}
        >
          {(formikProps) => <ProjectForm formikProps={formikProps} />}
        </Formik>

        <AddMembersTable isEdit />

        <div className="flex justify-end gap-4">
          <PrimaryButton title="Create" />
          <OutlinePrimaryButton
            type="button"
            title="Cancel"
            className="!w-auto"
            onClick={() => navigate("/projects")}
          />
        </div>
      </PageCard>
    </div>
  );
}
