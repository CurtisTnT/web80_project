import { useNavigate } from "react-router-dom";
import { Formik } from "formik";

import PrimaryButton from "@/components/buttons/PrimaryButton";
import PageTitle from "@/layouts/PageTitle";
import PageCard from "@/layouts/PageCard";
import ProjectForm from "@/components/forms/ProjectForm";
import { Project } from "@/services/interface";
import { initialProject } from "@/services/initialState";

type FormValues = Pick<Project, "title" | "desc" | "endDate" | "startDate">;

export default function Projects() {
  const navigate = useNavigate();

  const handleCreateProject = (values: FormValues) => {
    console.log(values);
  };

  return (
    <div className="p-5">
      <div className="flex items-center justify-between">
        <PageTitle title="Projects" />
        <PrimaryButton
          title="Create"
          className="!w-auto !px-3 !py-1.5"
          onClick={() => navigate("/projects/new")}
        />
      </div>

      <PageCard className="mt-5">
        <Formik initialValues={initialProject} onSubmit={handleCreateProject}>
          {(formikProps) => <ProjectForm formikProps={formikProps} />}
        </Formik>
      </PageCard>
    </div>
  );
}
