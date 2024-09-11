import { TfiTimer } from "react-icons/tfi";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

import { ProjectStatus } from "@/constants/projectStatus";
import { Project } from "@/services/interface";
import { formatDateShortMonth } from "@/utils/helpers";
import TaskIcon from "@/icons/TaskIcon";
import UserAvatars from "@/components/UserAvatars";

type Props = {
  project: Project;
};

export default function ProjectCard(props: Props) {
  const { project } = props;
  const { id, title, desc, status, endDate, members, tasks } = project;

  const navigate = useNavigate();

  return (
    <div
      className="col-span-1 p-4 bg-white rounded-md shadow space-y-4 animate-shrink-grow duration-300 hover:shadow-primary/40 hover:shadow-[0px_0px_10px_1px] cursor-pointer"
      onClick={() => navigate("/projects/" + id)}
    >
      <div className="flex justify-between items-center pb-1 border-b">
        <h4 className="text-lg font-medium">{title}</h4>
        <span className={clsx("px-2 py-0.5 rounded-full text-sm", status)}>
          {ProjectStatus[status].name}
        </span>
      </div>

      <div>
        <p className="mb-1 text-xs">{desc || "N/A"}</p>
        <div className="flex items-center gap-1 text-danger font-medium">
          <TfiTimer size={16} />
          <span className="text-xs uppercase">
            {formatDateShortMonth(endDate)}
          </span>
        </div>
      </div>

      <div className="flex items-end justify-between">
        <UserAvatars users={members} />

        <div className="flex items-center gap-1 text-xs text-gray-500">
          <TaskIcon className="size-4" />
          <span className="font-medium">{tasks.length} issue(s)</span>
        </div>
      </div>
    </div>
  );
}
