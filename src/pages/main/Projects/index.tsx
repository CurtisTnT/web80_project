import { useNavigate } from "react-router-dom";

import PrimaryButton from "@/components/buttons/PrimaryButton";
import PageTitle from "@/layouts/PageTitle";
import ProjectCard from "./ProjectCard";
import { Project } from "@/services/interface";
import { initialTask, initialUser } from "@/services/initialState";

export default function Projects() {
  const navigate = useNavigate();

  const project: Project = {
    id: "123",
    title: "Project 1",
    desc: "Desc 1",
    startDate: "",
    endDate: "2024/09/08",
    status: "inProgress",
    tasks: [{ ...initialTask }, { ...initialTask }],
    members: [
      { ...initialUser, avatar: "/assets/images/sign-up.png" },
      { ...initialUser, avatar: "/assets/images/sign-up.png" },
      { ...initialUser, avatar: "/assets/images/sign-up.png" },
      { ...initialUser, avatar: "/assets/images/sign-up.png" },
      { ...initialUser, avatar: "/assets/images/sign-up.png" },
      { ...initialUser, avatar: "/assets/images/sign-up.png" },
    ],
  };

  return (
    <div className="p-5">
      <div className="flex items-center justify-between">
        <PageTitle title="Projects" />
        <PrimaryButton
          type="button"
          title="Create"
          onClick={() => navigate("/projects/new")}
        />
      </div>

      <div className="mt-5 grid grid-cols-3 gap-4">
        <ProjectCard project={project} />
        <ProjectCard project={project} />
        <ProjectCard project={project} />
        <ProjectCard project={project} />
      </div>
    </div>
  );
}
