import { JobTitleType } from "@/constants/jobTitle";
import { designationLevelType } from "@/constants/designationLevel";
import { ProjectStatusType } from "@/constants/projectStatus";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  phoneNumber: string;
  createdBy: User | null;
  designationLevel: designationLevelType | null;
  jobTitle: JobTitleType | null;
}

export interface Project {
  id: string;
  title: string;
  desc: string;
  startDate: string;
  endDate: string;
  status: ProjectStatusType;
}
