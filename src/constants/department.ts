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
  [key in JobTitleType]: { value: JobTitleType; label: string };
} = {
  feDev: { value: "feDev", label: "Front-end developer" },
  beDev: { value: "beDev", label: "Back-end developer" },
  fullStackDev: { value: "fullStackDev", label: "Fullstack developer" },
  devops: { value: "devops", label: "DevOps" },
  uxUiDesigner: { value: "uxUiDesigner", label: "UX/UI designer" },
  businessAnalyst: { value: "businessAnalyst", label: "Business analyst" },
  dataAnalyst: { value: "dataAnalyst", label: "Data analyst" },
  productOwner: { value: "productOwner", label: "Product owner" },
};

export const jobTitleOptions = Object.keys(JobTitle).map((key) => ({
  value: JobTitle[key as JobTitleType].value,
  label: JobTitle[key as JobTitleType].label,
}));
