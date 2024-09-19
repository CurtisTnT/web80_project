import { HiOutlineDotsHorizontal } from "react-icons/hi";

import DropdownBtn from "@/components/dropdowns/DropdownBtn";
import PlusIcon from "@/icons/PlusIcon";
import TaskCard from "./TaskCard";
import { Task } from "@/services/interface";
import { initialUser } from "@/services/initialState";

type Props = {
  statusTitle: string;
  openTaskModal: (task: Task) => void;
};

export default function TaskStatusCard(props: Props) {
  const { statusTitle, openTaskModal } = props;

  const task: Task = {
    id: "kqeqkwen123",
    title: "Task 1",
    desc: "Description of task 1",
    startDate: "2024/09/08",
    endDate: "2024/09/10",
    status: "toDo",
    reporter: {
      ...initialUser,
      avatar: "/assets/images/sign-up.png",
      firstName: "Reporter",
      lastName: "1",
    },
    assignees: [
      {
        ...initialUser,
        avatar: "/assets/images/sign-up.png",
        firstName: "Assignee 1",
        lastName: "1",
        id: "1",
      },
    ],
    attachments: [],
    comments: [],
    priority: "low",
  };

  return (
    <div className="w-[380px] shrink-0 bg-white rounded-lg shadow">
      <div className="flex items-center justify-between bg-[#F0F6FF] px-5 py-3 rounded-tl-lg rounded-tr-lg">
        <h5 className="font-medium">{statusTitle}</h5>
        <DropdownBtn button={<HiOutlineDotsHorizontal />}></DropdownBtn>
      </div>

      <div className="p-5 space-y-4">
        <button
          type="button"
          className="flex justify-center items-center w-full py-1 border-2 border-dashed border-blue rounded-md"
        >
          <PlusIcon className="text-blue" />
        </button>

        <TaskCard task={task} onOpenTaskModal={() => openTaskModal(task)} />
        <TaskCard task={task} onOpenTaskModal={() => openTaskModal(task)} />
        <TaskCard task={task} onOpenTaskModal={() => openTaskModal(task)} />
        <TaskCard task={task} onOpenTaskModal={() => openTaskModal(task)} />
      </div>
    </div>
  );
}
