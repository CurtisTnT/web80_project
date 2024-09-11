import { JobTitleType } from "@/constants/jobTitle";
import { designationLevelType } from "@/constants/designationLevel";
import { ProjectStatusType } from "@/constants/projectStatus";
import { TaskStatusType } from "@/constants/taskStatus";

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

export interface Attachment {
  id: string;
  name: string;
  url: string;
}

export interface Comment {
  id: string;
  content: string;
  createdBy: User;
}

export interface Task {
  id: string;
  title: string;
  desc: string;
  startDate: string;
  endDate: string;
  status: TaskStatusType;
  assignor: User | null;
  assignees: User[];
  attachments: Attachment[];
  comments: Comment[];
}

export interface Project {
  id: string;
  title: string;
  desc: string;
  startDate: string;
  endDate: string;
  status: ProjectStatusType;
  tasks: Task[];
  members: User[];
}
