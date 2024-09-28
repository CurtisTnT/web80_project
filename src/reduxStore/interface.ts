import { DesignationLevelType } from "@/constants/designationLevel";
import { JobTitleType } from "@/constants/jobTitle";

//Query type
export type SignUpQuery = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  password: string;
  confirmPassword: string;
};

export type SignInQuery = {
  email: string;
  password: string;
};

export type ForgotPasswordQuery = {
  email: string;
};

export type VerifyOtpQuery = {
  email: string;
  otp: string;
};

export type ResetPasswordQuery = {
  email: string;
  curPassword: string;
  newPassword: string;
  confirmPassword: string;
};

//Response type
export type ServerResponse<T> = SuccessResponse<T> | ErrorResponse;

export type SuccessResponse<T> = {
  isSuccess: true;
  data: T;
  message: string;
};

export type ErrorResponse = {
  isSuccess: false;
  data: null;
  message: string;
};

export interface Auth {
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
