import { useState } from "react";
import Tippy from "@tippyjs/react";
import { TbBook2 } from "react-icons/tb";
import { BsTrash3 } from "react-icons/bs";

import { SubTask } from "@/services/interface";
import StatusDropdown from "@/components/dropdowns/StatusDropdown";
import { TaskStatus, taskStatusOptions } from "@/constants/taskStatus";
import AsyncInput from "@/components/inputs/AsyncInput";

type Props = {
  initSubTask: SubTask;
};

export default function SubTaskRow(props: Props) {
  const { initSubTask } = props;

  const [subTask, setSubTask] = useState<SubTask>(initSubTask);
  const { title, assignees, status } = subTask;

  const handleChangeSubTask = (values: Partial<SubTask>) => {
    setSubTask({ ...subTask, ...values });
  };

  return (
    <div className="flex items-center gap-2 p-1.5">
      <div>
        <TbBook2 size={20} className="shrink-0 text-blue" />
      </div>
      <div className="flex-grow">
        <AsyncInput
          value={title}
          onChange={(value) => handleChangeSubTask({ title: value })}
          //Recheck the initSubtask
          onReset={() => handleChangeSubTask({ title: initSubTask.title })}
        />
      </div>

      <div className="flex items-center px-3 -space-x-2">
        {assignees.map(({ id, firstName, lastName, avatar }) => (
          <Tippy
            key={id}
            content={`${firstName} ${lastName}`}
            theme="primary"
            className="text-sm"
          >
            <div className="flex items-center justify-center h-[30px] w-[30px] shrink-0 bg-white-light rounded-full border border-white hover:border-primary">
              <img src={avatar} alt="avatar" className="object-contain" />
            </div>
          </Tippy>
        ))}
      </div>

      <StatusDropdown
        id="task-status"
        value={status}
        onChange={(newStatus) => handleChangeSubTask({ status: newStatus })}
        options={taskStatusOptions}
        dropdownEnum={TaskStatus}
        btnClassName="!rounded-full !py-0"
        dropdownClassName="left-1/2 -translate-x-1/2 top-7"
      />

      <button type="button" className="ml-2">
        <BsTrash3 size={18} className="shrink-0 text-danger" />
      </button>
    </div>
  );
}
