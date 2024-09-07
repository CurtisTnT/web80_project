import { Project, User } from "./interface";

export const initialProject: Project = {
  id: "",
  title: "",
  desc: "",
  startDate: "",
  endDate: "",
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
