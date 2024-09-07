export type JobTitleType =
  | "feDev"
  | "beDev"
  | "fullStackDev"
  | "devops"
  | "uxUiDesigner"
  | "businessAnalyst"
  | "dataAnalyst"
  | "productOwner";

export const JobTitle: {
  [key in JobTitleType]: { id: JobTitleType; name: string };
} = {
  feDev: { id: "feDev", name: "Front-end developer" },
  beDev: { id: "beDev", name: "Back-end developer" },
  fullStackDev: { id: "fullStackDev", name: "Fullstack developer" },
  devops: { id: "devops", name: "DevOps" },
  uxUiDesigner: { id: "uxUiDesigner", name: "UX/UI designer" },
  businessAnalyst: { id: "businessAnalyst", name: "Business analyst" },
  dataAnalyst: { id: "dataAnalyst", name: "Data analyst" },
  productOwner: { id: "productOwner", name: "Product owner" },
};

export const jobTitleOptions = Object.keys(JobTitle).map((key) => ({
  id: JobTitle[key as JobTitleType].id,
  name: JobTitle[key as JobTitleType].name,
}));
