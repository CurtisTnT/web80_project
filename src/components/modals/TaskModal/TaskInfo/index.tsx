import { useEffect, useRef } from "react";
import { TbTags } from "react-icons/tb";
import { BiCheckSquare } from "react-icons/bi";
import { LuUserCog, LuUsers, LuCalendarDays } from "react-icons/lu";
import { TbFileDescription } from "react-icons/tb";

import StaticField from "@/components/forms/StaticField";
import StatusDropdown from "@/components/dropdowns/StatusDropdown";
import { initialTask, initialUser } from "@/services/initialState";
import { TaskPriority, taskPriorityOptions } from "@/constants/taskPriority";
import { TaskStatus, taskStatusOptions } from "@/constants/taskStatus";
import AsyncMultiSelect from "@/components/dropdowns/AsyncMultiSelect";
import DatePickerInput from "@/components/inputs/DatePickerInput";
import { convertToEndOfDay } from "@/utils/helpers";
import { Task } from "@/services/interface";
import SubTasksInfo from "./SubTasksInfo";
import AsyncInput from "@/components/inputs/AsyncInput";
import Attachments from "./Attachments";

type Props = {
  task: Task;
  onSetTask: (values: Partial<Task>) => void;
};

export default function TaskInfo(props: Props) {
  const { task, onSetTask } = props;
  const { id, title, priority, status, reporter, assignees, endDate, desc } =
    task;

  const initialTaskRef = useRef<Task>(initialTask);

  useEffect(() => {
    initialTaskRef.current = task;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task.id]);

  return (
    <div className="col-span-2 h-[calc(100vh-208px)] overflow-y-scroll p-5 bg-white rounded-lg shadow-[0px_0px_5px_0px] shadow-dark-shadow">
      <AsyncInput
        value={title}
        onChange={(value) => onSetTask({ title: value })}
        onReset={() => onSetTask({ title: initialTaskRef.current.title })}
        inputClassName="h-7"
        labelClassName="!text-xl"
      />

      <div className="mt-5">
        <StaticField
          label={
            <span className="flex items-center gap-2">
              <TbTags size={22} className="rotate-90 shrink-0" />
              <p>Priority</p>
            </span>
          }
          className="grid grid-cols-5 gap-5 items-center"
        >
          <div className="col-span-4 flex">
            <StatusDropdown
              id="task-priority"
              value={priority}
              onChange={(priority) => onSetTask({ priority })}
              options={taskPriorityOptions}
              dropdownEnum={TaskPriority}
              btnClassName="!rounded-full !py-0"
              dropdownClassName="left-1/2 -translate-x-1/2 top-7"
            />
          </div>
        </StaticField>

        <StaticField
          label={
            <span className="flex items-center gap-2">
              <BiCheckSquare size={22} className="shrink-0" />
              <p>Status</p>
            </span>
          }
          className="grid grid-cols-5 gap-5 items-center"
        >
          <div className="col-span-4 flex">
            <StatusDropdown
              id="task-status"
              value={status}
              onChange={(status) => onSetTask({ status })}
              options={taskStatusOptions}
              dropdownEnum={TaskStatus}
              btnClassName="!rounded-full !py-0"
              dropdownClassName="left-1/2 -translate-x-1/2 top-7"
            />
          </div>
        </StaticField>

        <StaticField
          label={
            <span className="flex items-center gap-2">
              <LuUserCog size={22} className="shrink-0" />
              <p>Reporter</p>
            </span>
          }
          className="grid grid-cols-5 gap-5 items-center"
        >
          <div className="col-span-4 flex items-center gap-2">
            <div className="h-[40px] w-[40px] shrink-0 bg-white-light rounded-full border border-white">
              <img
                src={reporter?.avatar}
                alt="avatar"
                className="object-contain"
              />
            </div>
            <span>{reporter?.firstName + " " + reporter?.lastName}</span>
          </div>
        </StaticField>

        <StaticField
          label={
            <span className="flex items-center gap-2">
              <LuUsers size={22} className="shrink-0" />
              <p>Assignee(s)</p>
            </span>
          }
          className="grid grid-cols-5 gap-5 items-center"
        >
          <div className="col-span-4">
            <AsyncMultiSelect
              values={assignees.map((assignee) => ({
                ...assignee,
                id: assignee.id,
                name: assignee.firstName,
              }))}
              onChange={(newValues) => onSetTask({ assignees: newValues })}
              options={[
                {
                  ...initialUser,
                  avatar: "/assets/images/sign-up.png",
                  firstName: "Assignee",
                  lastName: "1",
                  id: "1",
                  name: "Assignee 1 qwe qw e asd as d",
                },
                {
                  ...initialUser,
                  avatar: "/assets/images/sign-up.png",
                  firstName: "Assignee",
                  lastName: "2",
                  id: "2",
                  name: "Assignee 2 asd asd asd",
                },
              ]}
              renderSelectedItem={({ avatar, firstName, lastName }) => (
                <div className="col-span-4 flex items-center gap-2">
                  <div className="h-[30px] w-[30px] shrink-0 bg-white-light rounded-full border border-white">
                    <img src={avatar} alt="avatar" className="object-contain" />
                  </div>
                  <span>{firstName + " " + lastName}</span>
                </div>
              )}
              renderItem={({ avatar, firstName, lastName }) => (
                <div className="flex items-center gap-2">
                  <div className="h-[30px] w-[30px] bg-white-light rounded-full border border-white">
                    <img src={avatar} alt="avatar" className="object-contain" />
                  </div>
                  <span>{firstName + " " + lastName}</span>
                </div>
              )}
            />
          </div>
        </StaticField>

        <StaticField
          label={
            <span className="flex items-center gap-2">
              <LuCalendarDays size={22} className="shrink-0" />
              <p>Due date</p>
            </span>
          }
          className="grid grid-cols-5 gap-5 items-center"
        >
          <div className="col-span-4">
            {/* {endDate} */}
            <div className="w-[200px]">
              <DatePickerInput
                value={endDate}
                onChange={(dates) =>
                  onSetTask({ endDate: convertToEndOfDay(dates[0]) })
                }
              />
            </div>
          </div>
        </StaticField>

        <StaticField
          label={
            <span className="flex items-center gap-2">
              <TbFileDescription size={22} className="shrink-0" />
              <p>Description</p>
            </span>
          }
          className="grid grid-cols-5 gap-5 items-center"
        >
          <div className="col-span-4">
            <AsyncInput
              value={desc}
              onChange={(value) => onSetTask({ desc: value })}
              onReset={() => onSetTask({ desc: initialTaskRef.current.desc })}
              labelClassName="!font-normal !text-base"
            />
          </div>
        </StaticField>
      </div>

      <SubTasksInfo taskId={id} />

      <Attachments attachments={task.attachments} onSetTask={onSetTask} />
    </div>
  );
}
