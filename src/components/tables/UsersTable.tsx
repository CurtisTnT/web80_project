import { DataTable, useDataTableColumns } from "mantine-datatable";

import { User } from "@/services/interface";
import { DesignationLevel } from "@/constants/designationLevel";
import { JobTitle } from "@/constants/jobTitle";

const users: User[] = [
  {
    id: "1",
    avatar: "/assets/images/sign-up.png",
    firstName: "Curtis",
    lastName: "Truong",
    email: "nghiatintruong@gmail.com",
    designationLevel: "entry",
    jobTitle: "fullStackDev",
    phoneNumber: "",
    createdBy: null,
  },
];

export default function UsersTable() {
  const key = "user-table";
  const { effectiveColumns } = useDataTableColumns<User>({
    key,
    columns: [
      {
        accessor: "avatar",
        title: "",
        cellsClassName: "min-w-[68px] flex justify-center",
        resizable: true,
        render: ({ avatar }) => (
          <div>
            <img
              src={avatar}
              alt="avatar"
              className="w-12 h-12 rounded-full shadow"
            />
          </div>
        ),
      },
      {
        accessor: "name",
        title: "Name",
        resizable: true,
        cellsClassName: "text-wrap break-all overflow-hidden",
        render: ({ firstName, lastName }) => (
          <span className="text-sm text-black">
            {firstName} {lastName}
          </span>
        ),
      },
      {
        accessor: "email",
        title: "Email",
        resizable: true,
        cellsClassName: "text-wrap break-all overflow-hidden",
      },
      {
        accessor: "designationLevel",
        title: "Designation Level",
        resizable: true,
        cellsClassName: "text-wrap break-all overflow-hidden",
        render: ({ designationLevel }) =>
          designationLevel ? DesignationLevel[designationLevel].name : "",
      },
      {
        accessor: "jobTitle",
        title: "Job Title",
        resizable: true,
        cellsClassName: "text-wrap break-all overflow-hidden",
        render: ({ jobTitle }) => (jobTitle ? JobTitle[jobTitle].name : ""),
      },
    ],
  });

  return (
    <DataTable
      withBorder
      withColumnBorders
      storeColumnsKey={key}
      records={users}
      columns={effectiveColumns}
      highlightOnHover
      shadow="sm"
      borderRadius="sm"
      scrollAreaProps={{ type: "never" }}
    />
  );
}
