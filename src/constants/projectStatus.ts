export type ProjectStatusType =
  | "notStarted"
  | "inProgress"
  | "onHold"
  | "underReview"
  | "completed"
  | "cancelled";

export const ProjectStatus: {
  [key in ProjectStatusType]: {
    id: ProjectStatusType;
    name: string;
    color: string;
  };
} = {
  notStarted: { id: "notStarted", name: "Not started", color: "#B0B0B0" },
  inProgress: { id: "inProgress", name: "In progress", color: "#007BFF" },
  onHold: { id: "onHold", name: "On hold", color: "#FFC107" },
  underReview: { id: "underReview", name: "Under review", color: "#6F42C1" },
  completed: { id: "completed", name: "Completed", color: "#28A745" },
  cancelled: { id: "cancelled", name: "Cancelled", color: "#DC3545" },
};

export const projectStatusOptions = Object.keys(ProjectStatus).map((key) => ({
  id: ProjectStatus[key as ProjectStatusType].id,
  name: ProjectStatus[key as ProjectStatusType].name,
  color: ProjectStatus[key as ProjectStatusType].color,
}));
