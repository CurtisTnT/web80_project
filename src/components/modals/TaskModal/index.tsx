import { forwardRef, Ref, useImperativeHandle, useState } from "react";

import Modal, { ModalRef } from "@/components/modals/Modal";
import { Project, Task } from "@/services/interface";
import { initialTask } from "@/services/initialState";
import TaskInfo from "./TaskInfo";
import Comments from "./Comments";

export type TaskModalActionsRef = {
  onSelectTask: (task: Task) => void;
};

type Props = {
  taskModalRef: Ref<ModalRef>;
  project: Project;
};

export default forwardRef(function TaskModal(
  props: Props,
  forwardRef: Ref<TaskModalActionsRef>
) {
  const { taskModalRef, project } = props;

  const [task, setTask] = useState<Task>(initialTask);
  const { id } = task;

  useImperativeHandle(forwardRef, () => ({
    onSelectTask: setTask,
  }));

  const handleChangeTask = (values: Partial<Task>) => {
    setTask({ ...task, ...values });
  };

  return (
    <Modal
      ref={taskModalRef}
      header={
        <h2 className="mb-5 text-sm text-white-dark font-medium">
          Project: <span className="text-black">{project.title}</span> / Task
          ID: <span className="text-black">{id}</span>
        </h2>
      }
      size="full"
    >
      <div className="grid grid-cols-3 gap-6">
        <TaskInfo task={task} onSetTask={handleChangeTask} />

        <Comments taskId={task.id} />
      </div>
    </Modal>
  );
});
