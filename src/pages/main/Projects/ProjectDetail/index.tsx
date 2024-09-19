import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Breadcrumb from "@/layouts/Breadcrumb";
import ProjectInfo from "./ProjectInfo";
import StatusDropdown from "@/components/dropdowns/StatusDropdown";
import {
  ProjectStatus,
  projectStatusOptions,
  ProjectStatusType,
} from "@/constants/projectStatus";
import { Project } from "@/services/interface";
import { initialProject } from "@/services/initialState";
import TaskInfo from "./TaskInfo";

export default function ProjectDetail() {
  const { projectId } = useParams();

  const [project, setProject] = useState<Project>(initialProject);

  const handleUpdateStatus = (status: ProjectStatusType) => {
    setProject({ ...project, status });
  };

  useEffect(() => {
    setProject({
      ...initialProject,
      title: "Project 1",
      startDate: "2024/09/10",
      endDate: "2025/10/10",
      desc: "This is the description of the project 1",
    });
  }, []);

  return (
    <div className="p-5">
      <div className="flex items-end justify-between">
        <Breadcrumb
          items={[
            { title: "Projects", href: "/projects" },
            { title: projectId || "" },
          ]}
        />

        <StatusDropdown
          value={project.status}
          onChange={handleUpdateStatus}
          options={projectStatusOptions}
          dropdownEnum={ProjectStatus}
          id="project-status"
          dropdownClassName="right-0"
        />
      </div>

      <TaskInfo project={project} />

      <ProjectInfo project={project} />
    </div>
  );
}
