import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Breadcrumb from "@/layouts/Breadcrumb";
import PageCard from "@/layouts/PageCard";
import DebounceSearch from "@/components/inputs/DebounceSearch";
import TaskViewTypeDropdown from "@/components/dropdowns/TaskViewModeDropdown";
import { TaskViewModeType } from "@/constants/taskViewMode";
import TaskStatusCard from "./TaskStatusCard";
import ProjectInfo from "./ProjectInfo";
import ProjectStatusDropdown from "@/components/dropdowns/ProjectStatusDropdown";
import { ProjectStatusType } from "@/constants/projectStatus";
import { Project } from "@/services/interface";
import { initialProject } from "@/services/initialState";
import CardTitle from "@/layouts/CardTitle";

export default function ProjectDetail() {
  const { projectId } = useParams();

  const [project, setProject] = useState<Project>(initialProject);
  const [taskViewMode, setTaskViewMode] = useState<TaskViewModeType>("kanban");

  const handleUpdateStatus = (status: ProjectStatusType) => {
    console.log(status);
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

        <ProjectStatusDropdown
          value={project.status}
          onChange={handleUpdateStatus}
        />
      </div>

      <PageCard className="mt-5">
        <CardTitle title="Task" className="mb-3" />

        <div className="flex items-center gap-4">
          <DebounceSearch onSearch={() => {}} placeholder="Search task..." />

          <TaskViewTypeDropdown
            value={taskViewMode}
            onChange={setTaskViewMode}
          />
        </div>

        <div className="flex gap-10 flex-nowrap overflow-x-scroll w-full p-5">
          <TaskStatusCard statusTitle="To do" />
          <TaskStatusCard statusTitle="In progress" />
          <TaskStatusCard statusTitle="Completed" />
          <TaskStatusCard statusTitle="Completed" />
        </div>
      </PageCard>

      <ProjectInfo project={project} />
    </div>
  );
}
