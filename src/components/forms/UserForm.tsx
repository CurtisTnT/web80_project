import { Form, FormikProps } from "formik";
import { object, string } from "yup";

import { User } from "@/services/interface";
import TextInput from "@/components/inputs/TextInput";
import FieldLabel from "@/components/inputs/FieldLabel";
import FieldError from "@/components/inputs/FieldError";
import SingleSelect from "@/components/dropdowns/SingleSelect";
import {
  DesignationLevel,
  DesignationLevelOptions,
} from "@/constants/designationLevel";
import { JobTitle, jobTitleOptions } from "@/constants/jobTitle";
import { formatSingleConstantValue } from "@/utils/helpers";

type Props = {
  formikProps: FormikProps<User>;
  formId?: string;
};

export const userSchema = object({
  firstName: string().required("First name is required!"),
  lastName: string().required("Last name is required!"),
  email: string().required("Email is required!").email("Email is invalid!"),
  designationLevel: string().required("Designation level is required!"),
  jobTitle: string().required("Job title is required!"),
});

export default function UserForm(props: Props) {
  const { formikProps, formId } = props;
  const {
    values,
    errors,
    touched,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
  } = formikProps;
  const { designationLevel, jobTitle } = values;

  return (
    <Form id={formId} onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-6">
        <TextInput
          label="First name"
          name="firstName"
          isRequired
          formikProps={formikProps}
        />

        <TextInput
          label="Last name"
          name="lastName"
          isRequired
          formikProps={formikProps}
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <TextInput
          label="Email"
          name="email"
          isRequired
          formikProps={formikProps}
        />

        <TextInput
          label="Phone number"
          name="phoneNumber"
          formikProps={formikProps}
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <FieldLabel
            name="designationLevel"
            label="Designation level"
            isRequired
          />
          <SingleSelect
            value={formatSingleConstantValue(
              designationLevel,
              DesignationLevel
            )}
            onChange={(newValue) =>
              setFieldValue("designationLevel", newValue.id)
            }
            options={DesignationLevelOptions}
            onBlur={() => setFieldTouched("designationLevel", true)}
            isError={!!errors.designationLevel && touched.designationLevel}
          />
          <FieldError name="designationLevel" />
        </div>

        <div>
          <FieldLabel name="jobTitle" label="Job Title" isRequired />
          <SingleSelect
            value={formatSingleConstantValue(jobTitle, JobTitle)}
            onChange={(newValue) => setFieldValue("jobTitle", newValue.id)}
            options={jobTitleOptions}
            onBlur={() => setFieldTouched("jobTitle", true)}
            isError={!!errors.jobTitle && touched.jobTitle}
          />
          <FieldError name="jobTitle" />
        </div>
      </div>
    </Form>
  );
}
