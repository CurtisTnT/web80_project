import { JobTitleType } from "@/constants/jobTitle";
import { designationLevelType } from "@/constants/designationLevel";

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
}
