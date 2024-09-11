export type TaskViewModeType = "backLog" | "kanban";

export const TaskViewMode: {
  [key in TaskViewModeType]: { id: TaskViewModeType; name: string };
} = {
  backLog: { id: "backLog", name: "Backlog" },
  kanban: { id: "kanban", name: "Kanban" },
};

export const taskViewModeOptions = Object.keys(TaskViewMode).map((key) => ({
  id: TaskViewMode[key as TaskViewModeType].id,
  name: TaskViewMode[key as TaskViewModeType].name,
}));
