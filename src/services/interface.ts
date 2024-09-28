import { JobTitleType } from "@/constants/jobTitle";
import { DesignationLevelType } from "@/constants/designationLevel";
import { ProjectStatusType } from "@/constants/projectStatus";
import { TaskStatusType } from "@/constants/taskStatus";
import { TaskPriorityType } from "@/constants/taskPriority";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  phoneNumber: string;
  createdBy: User | null;
  designationLevel: DesignationLevelType | null;
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
  updatedAt: string;
}

export interface SubTask {
  id: string;
  title: string;
  desc: string;
  startDate: string;
  endDate: string;
  status: TaskStatusType;
  reporter: User | null;
  assignees: User[];
  attachments: Attachment[];
  comments: Comment[];
  priority: TaskPriorityType;
}

export interface Task {
  id: string;
  title: string;
  desc: string;
  startDate: string;
  endDate: string;
  status: TaskStatusType;
  reporter: User | null;
  assignees: User[];
  attachments: Attachment[];
  comments: Comment[];
  priority: TaskPriorityType;
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

export type UserQuery = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  createdBy: User | null;
  designationLevel?: DesignationLevelType | null;
  jobTitle?: JobTitleType | null;
};
