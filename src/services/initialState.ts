import { Comment, Project, SubTask, Task, User } from "./interface";

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
  reporter: null,
  assignees: [],
  attachments: [],
  comments: [],
  priority: "low",
};

export const initialSubTask: SubTask = {
  id: "",
  title: "",
  desc: "",
  startDate: "",
  endDate: "",
  status: "toDo",
  reporter: null,
  assignees: [],
  attachments: [],
  comments: [],
  priority: "low",
};

export const initialComment: Comment = {
  id: "",
  content: "",
  createdBy: initialUser,
  updatedAt: "",
};
