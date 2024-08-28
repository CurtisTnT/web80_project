import { Outlet } from "react-router-dom";

import SideBar from "./SideBar";
import Header from "./Header";

export default function MainLayout() {
  return (
    <>
      <Header />

      <div className="relative pt-20 bg-[#F0F6FF] min-h-screen">
        <SideBar />

        <div className="pl-[280px]">
          <Outlet />
        </div>
      </div>
    </>
  );
}
