import { Form, FormikProps } from "formik";
import { object, string } from "yup";

import TextInput from "@/components/inputs/TextInput";
import { Project } from "@/services/interface";
import DatePickerInput from "@/components/inputs/DatePickerInput";
import { convertToEndOfDay, convertToStartOfDay } from "@/utils/helpers";
import TextareaInput from "@/components/inputs/TextareaInput";

export const projectSchema = object({
  title: string().required("Title is required!"),
  startDate: string().required("Start date is required!"),
  endDate: string().required("End date is required!"),
});

type Props = {
  formikProps: FormikProps<Project>;
};

export default function ProjectForm(props: Props) {
  const { formikProps } = props;
  const {
    values,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
    handleSubmit,
  } = formikProps;
  const { startDate, endDate } = values;

  return (
    <Form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-6">
        <TextInput
          label="Title"
          name="title"
          isRequired
          formikProps={formikProps}
        />

        <div className="grid grid-cols-2 gap-6">
          <DatePickerInput
            name="startDate"
            label="Start date"
            isRequired
            value={startDate}
            onChange={(dates) =>
              setFieldValue("startDate", convertToStartOfDay(dates[0]))
            }
            onBlur={() => setFieldTouched("startDate", true)}
            isErrored={!!errors.startDate && touched.startDate}
          />

          <DatePickerInput
            name="endDate"
            label="End date"
            isRequired
            value={endDate}
            onChange={(dates) =>
              setFieldValue("endDate", convertToEndOfDay(dates[0]))
            }
            onBlur={() => setFieldTouched("endDate", true)}
            isErrored={!!errors.endDate && touched.endDate}
          />
        </div>
      </div>

      <div className="grid grid-cols-1">
        <TextareaInput
          name="desc"
          label="Description"
          formikProps={formikProps}
        />
      </div>
    </Form>
  );
}
