export type TaskStatusType =
  | "toDo"
  | "inProgress"
  | "onHold"
  | "inReview"
  | "readyForTesting"
  | "completed"
  | "blocked"
  | "cancelled";

export const TaskStatus: {
  [key in TaskStatusType]: {
    id: TaskStatusType;
    name: string;
  };
} = {
  toDo: { id: "toDo", name: "To do" },
  inProgress: { id: "inProgress", name: "In progress" },
  onHold: { id: "onHold", name: "On hold" },
  inReview: { id: "inReview", name: "In review" },
  readyForTesting: { id: "readyForTesting", name: "Ready for testing" },
  completed: { id: "completed", name: "Completed" },
  blocked: { id: "blocked", name: "Blocked" },
  cancelled: { id: "cancelled", name: "Cancelled" },
};

export const taskStatusOptions = Object.keys(TaskStatus).map((key) => ({
  id: TaskStatus[key as TaskStatusType].id,
  name: TaskStatus[key as TaskStatusType].name,
}));
