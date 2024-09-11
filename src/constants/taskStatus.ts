export type TaskStatusType = "toDo" | "inProgress" | "completed";

export const TaskStatus: {
  [key in TaskStatusType]: {
    id: TaskStatusType;
    name: string;
  };
} = {
  toDo: { id: "toDo", name: "To do" },
  inProgress: { id: "inProgress", name: "In progress" },
  completed: { id: "completed", name: "Completed" },
};

export const taskStatusOptions = Object.keys(TaskStatus).map((key) => ({
  id: TaskStatus[key as TaskStatusType].id,
  name: TaskStatus[key as TaskStatusType].name,
}));
