import { useState } from "react";
import { Formik } from "formik";

import ProjectForm from "@/components/forms/ProjectForm";
import PageCard from "@/layouts/PageCard";
import AddMembersTable from "@/components/tables/AddMembersTable";
import { Project } from "@/services/interface";
import StaticField from "@/components/forms/StaticField";
import CardTitle from "@/layouts/CardTitle";
import EditButton from "@/components/buttons/EditButton";
import OutlinePrimaryButton from "@/components/buttons/OutlinePrimaryButton";
import PrimaryButton from "@/components/buttons/PrimaryButton";

type Props = {
  project: Project;
};

export default function ProjectInfo(props: Props) {
  const { project } = props;
  const { title, startDate, endDate, desc } = project;
  const [isEdit, setIsEdit] = useState(false);

  const handleUpdateProject = (values: Project) => {
    console.log(values);
  };

  return (
    <PageCard className="mt-5">
      <CardTitle title="Project information" className="mb-3" />

      {isEdit ? (
        <Formik initialValues={project} onSubmit={handleUpdateProject}>
          {(formikProps) => <ProjectForm formikProps={formikProps} />}
        </Formik>
      ) : (
        <div>
          <EditButton
            onClick={() => setIsEdit(true)}
            className="absolute top-5 right-5"
          />
          <div className="grid grid-cols-2 gap-6">
            <StaticField label="Title" value={title} />

            <div className="grid grid-cols-2 gap-6">
              <StaticField label="Start date" value={startDate} />
              <StaticField label="End date" value={endDate} />
            </div>
          </div>

          <StaticField label="Description" value={desc} />
        </div>
      )}

      <AddMembersTable isEdit={isEdit} />

      {isEdit && (
        <div className="flex justify-end gap-4">
          <PrimaryButton title="Save" />
          <OutlinePrimaryButton
            type="button"
            title="Cancel"
            className="!w-auto"
            onClick={() => setIsEdit(false)}
          />
        </div>
      )}
    </PageCard>
  );
}
