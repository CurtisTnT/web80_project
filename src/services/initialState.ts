import { Project, Task, User } from "./interface";

export const initialProject: Project = {
  id: "",
  title: "",
  desc: "",
  startDate: "",
  endDate: "",
  status: "notStarted",
  tasks: [],
  members: [],
};

export const initialUser: User = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  avatar: "",
  phoneNumber: "",
  createdBy: null,
  designationLevel: null,
  jobTitle: null,
};

export const initialTask: Task = {
  id: "",
  title: "",
  desc: "",
  startDate: "",
  endDate: "",
  status: "toDo",
  assignor: null,
  assignees: [],
  attachments: [],
  comments: [],
};
