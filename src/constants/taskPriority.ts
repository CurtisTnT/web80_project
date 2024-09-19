export type TaskPriorityType = "low" | "medium" | "high" | "critical";

export const TaskPriority: {
  [key in TaskPriorityType]: {
    id: TaskPriorityType;
    name: string;
  };
} = {
  low: { id: "low", name: "Low" },
  medium: { id: "medium", name: "Medium" },
  high: { id: "high", name: "High" },
  critical: { id: "critical", name: "Critical" },
};

export const taskPriorityOptions = Object.keys(TaskPriority).map((key) => ({
  id: TaskPriority[key as TaskPriorityType].id,
  name: TaskPriority[key as TaskPriorityType].name,
}));
