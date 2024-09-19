import { useRef, useState } from "react";

import PageCard from "@/layouts/PageCard";
import DebounceSearch from "@/components/inputs/DebounceSearch";
import TaskViewTypeDropdown from "@/components/dropdowns/TaskViewModeDropdown";
import { TaskViewModeType } from "@/constants/taskViewMode";
import TaskStatusCard from "./TaskStatusCard";
import CardTitle from "@/layouts/CardTitle";
import { Project, Task } from "@/services/interface";
import TaskModal, { TaskModalActionsRef } from "@/components/modals/TaskModal";
import { ModalRef } from "@/components/modals/Modal";

type Props = {
  project: Project;
};

export default function TaskInfo(props: Props) {
  const { project } = props;

  const [taskViewMode, setTaskViewMode] = useState<TaskViewModeType>("kanban");

  const taskModalRef = useRef<ModalRef>(null);
  const taskModalActionsRef = useRef<TaskModalActionsRef>(null);

  const handleOpenTaskModal = (task: Task) => {
    taskModalActionsRef.current?.onSelectTask(task);
    taskModalRef.current?.open();
  };

  return (
    <PageCard className="mt-5">
      <CardTitle title="Task" className="mb-3" />

      <div className="flex items-center gap-4">
        <DebounceSearch onSearch={() => {}} placeholder="Search task..." />

        <TaskViewTypeDropdown value={taskViewMode} onChange={setTaskViewMode} />
      </div>

      <div className="flex gap-10 flex-nowrap overflow-x-scroll w-full p-5">
        <TaskStatusCard
          statusTitle="To do"
          openTaskModal={handleOpenTaskModal}
        />
        <TaskStatusCard
          statusTitle="In progress"
          openTaskModal={handleOpenTaskModal}
        />
        <TaskStatusCard
          statusTitle="Completed"
          openTaskModal={handleOpenTaskModal}
        />
        <TaskStatusCard
          statusTitle="In Review"
          openTaskModal={handleOpenTaskModal}
        />
      </div>

      <TaskModal
        ref={taskModalActionsRef}
        taskModalRef={taskModalRef}
        project={project}
      />
    </PageCard>
  );
}
