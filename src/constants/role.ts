export type RoleType = "admin" | "lead" | "staff";

export const Role: {
  [key in RoleType]: {
    id: RoleType;
    name: string;
  };
} = {
  admin: { id: "admin", name: "Admin" },
  lead: { id: "lead", name: "Lead" },
  staff: { id: "staff", name: "Staff" },
};

export const roleOptions = Object.keys(Role).map((key) => ({
  id: Role[key as RoleType].id,
  name: Role[key as RoleType].name,
}));
