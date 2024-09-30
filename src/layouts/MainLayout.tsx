import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import SideBar from "./SideBar";
import Header from "./Header";
import { useAppDispatch, useAppSelect } from "@/reduxStore";
import { getUsers } from "@/reduxStore/users/action";

export default function MainLayout() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelect((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/sign-in");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  useEffect(() => {
    dispatch(getUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
