import StaticField from "@/components/forms/StaticField";
import { DesignationLevel } from "@/constants/designationLevel";
import { JobTitle } from "@/constants/jobTitle";
import { Role } from "@/constants/role";
import { User } from "@/reduxStore/interface";
import { displayEnumValue, formatNormalDate } from "@/utils/helpers";

type Props = {
  user: User;
};

export default function StaticForm(props: Props) {
  const { user } = props;
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    designationLevel,
    jobTitle,
    role,
    createdBy,
    createdAt,
  } = user;

  return (
    <div>
      <div className="grid grid-cols-2 gap-6">
        <StaticField label="First name" value={firstName} />
        <StaticField label="Last name" value={lastName} />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <StaticField label="Email" value={email} />
        <StaticField label="Phone number" value={phoneNumber} />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <StaticField
          label="Designation level"
          value={displayEnumValue(designationLevel, DesignationLevel)}
        />
        <StaticField
          label="Job title"
          value={displayEnumValue(jobTitle, JobTitle)}
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <StaticField label="Email" value={email} />
        <StaticField label="Phone number" value={phoneNumber} />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <StaticField label="Role" value={displayEnumValue(role, Role)} />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <StaticField
          label="Created by"
          value={
            createdBy ? `${createdBy.firstName} ${createdBy.lastName}` : "Admin"
          }
        />
        <StaticField label="Created date" value={formatNormalDate(createdAt)} />
      </div>
    </div>
  );
}
