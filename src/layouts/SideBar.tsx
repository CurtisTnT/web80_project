import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import TaskIcon from "@/icons/TaskIcon";
import ProjectIcon from "@/icons/ProjectIcon";
import UserIcon from "@/icons/UserIcon";

export default function SideBar() {
  const { pathname } = useLocation();

  const SIDEBAR_ITEMS = [
    {
      id: 1,
      title: "Users",
      icon: <UserIcon className="shrink-0" />,
      link: "/users",
    },
    {
      id: 2,
      title: "Projects",
      icon: <ProjectIcon className="shrink-0" />,
      link: "/projects",
    },
    {
      id: 3,
      title: "My tasks",
      icon: <TaskIcon className="shrink-0" />,
      link: "/my-tasks",
    },
  ];

  useEffect(() => {
    SIDEBAR_ITEMS.forEach(({ link }) => {
      const selector = document.querySelector(
        '#side-bar a[href="' + link + '"]'
      );

      if (pathname.startsWith(link)) {
        selector?.classList.add("active");
      } else {
        selector?.classList.remove("active");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div
      id="side-bar"
      className="fixed z-10 top-20 left-0 w-[280px] h-full space-y-1 p-5 shadow-[5px_0px_10px_1px] shadow-dark/10 bg-white font-medium"
    >
      {SIDEBAR_ITEMS.map(({ id, title, icon, link }) => (
        <Link
          key={id}
          to={link}
          className="flex items-center gap-3 p-2 rounded-md hover:text-white hover:bg-blue"
        >
          {icon}
          <h5>{title}</h5>
        </Link>
      ))}
    </div>
  );
}
