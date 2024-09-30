import { Auth, User } from "./interface";

export const initAuth: Auth = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  avatar: "",
  phoneNumber: "",
  designationLevel: null,
  jobTitle: null,
  role: null,
};

export const initialUser: User = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  avatar: "",
  phoneNumber: "",
  designationLevel: null,
  jobTitle: null,
  role: null,
  createdBy: null,
  createdAt: "",
};
