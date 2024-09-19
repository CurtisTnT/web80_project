import clsx from "clsx";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";

import PrimaryButton from "@/components/buttons/PrimaryButton";
import { initialSubTask, initialUser } from "@/services/initialState";
import { SubTask, Task } from "@/services/interface";
import SubTaskRow from "./SubTaskRow";
import Loader from "@/components/loading/Loader";

type Props = {
  taskId: Task["id"];
  className?: string;
};

export default function SubTasksInfo(props: Props) {
  const { taskId, className } = props;

  const [subTasks, setSubTasks] = useState<SubTask[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      if (taskId) {
        setSubTasks([
          {
            ...initialSubTask,
            title: "Subtask 1",
            desc: "This is the desc of subtask 1",
            assignees: [
              {
                ...initialUser,
                avatar: "/assets/images/sign-up.png",
                firstName: "Assignee 1",
                lastName: "1",
                id: "1",
              },
            ],
          },
          {
            ...initialSubTask,
            title: "Subtask 2",
            desc: "This is the desc of subtask 2",
            assignees: [
              {
                ...initialUser,
                avatar: "/assets/images/sign-up.png",
                firstName: "Assignee 2",
                lastName: "2",
                id: "2",
              },
            ],
          },
        ]);
      }
      setLoading(false);
    }, 1000);
  }, [taskId]);

  return (
    <div id="modal-content" className={clsx("mt-10", className)}>
      <div className="flex items-center gap-2">
        <h4 className="font-semibold">Sub task(s)</h4>

        <PrimaryButton type="button" className="!rounded-full !p-0.5">
          <FiPlus className="size-5" />
        </PrimaryButton>
      </div>

      <div className="mt-3">
        {loading ? (
          <Loader className="!w-6 !h-6 !border-[2.5px]" />
        ) : (
          <div className="divide-y border rounded shadow">
            {subTasks.map((subTask) => (
              <SubTaskRow key={subTask.id} initSubTask={subTask} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
