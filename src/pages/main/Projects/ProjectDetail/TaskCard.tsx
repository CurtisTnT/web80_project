import { TfiTimer } from "react-icons/tfi";
import { ImAttachment } from "react-icons/im";
import { FaRegCommentDots } from "react-icons/fa";

import { Task } from "@/services/interface";
import { formatDateShortMonth } from "@/utils/helpers";
import UserAvatars from "@/components/UserAvatars";

type Props = {
  task: Task;
};

export default function TaskCard(props: Props) {
  const { task } = props;
  const { title, desc, endDate, attachments, assignor, assignees } = task;

  return (
    <div className="p-3 bg-white rounded-md shadow-[0px_0px_5px_1px] shadow-dark-shadow space-y-3 hover:shadow-primary/40 duration-300 cursor-pointer">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">{title}</h4>
        <div className="flex items-center gap-1 text-danger font-medium">
          <TfiTimer size={16} />
          <span className="text-xs uppercase">
            {formatDateShortMonth(endDate)}
          </span>
        </div>
      </div>

      <p className="text-xs text-white-dark">{desc}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-white-dark">
          <span className="flex items-center gap-1">
            <ImAttachment size={14} />
            <p className="text-xs">{attachments.length}</p>
          </span>

          <span className="flex items-center gap-1">
            <FaRegCommentDots size={14} />
            <p className="text-xs">{attachments.length}</p>
          </span>
        </div>

        <UserAvatars users={[assignor, ...assignees].filter((u) => !!u)} />
      </div>
    </div>
  );
}
