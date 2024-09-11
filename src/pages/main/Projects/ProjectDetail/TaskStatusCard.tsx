import React from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

import DropdownBtn from "@/components/dropdowns/DropdownBtn";
import PlusIcon from "@/icons/PlusIcon";
import TaskCard from "./TaskCard";
import { Task } from "@/services/interface";
import { initialUser } from "@/services/initialState";

type Props = {
  statusTitle: string;
};

export default function TaskStatusCard(props: Props) {
  const { statusTitle } = props;
  const task: Task = {
    id: "",
    title: "Task 1",
    desc: "Description of task 1",
    startDate: "2024/09/08",
    endDate: "2024/09/10",
    status: "toDo",
    assignor: { ...initialUser, avatar: "/assets/images/sign-up.png" },
    assignees: [{ ...initialUser, avatar: "/assets/images/sign-up.png" }],
    attachments: [],
    comments: [],
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

        <TaskCard task={task} />
        <TaskCard task={task} />
        <TaskCard task={task} />
        <TaskCard task={task} />
      </div>
    </div>
  );
}
