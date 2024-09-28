import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useAppSelect } from "@/reduxStore";

export default function AuthLayout() {
  const navigate = useNavigate();
  const isAuthenticated = useAppSelect((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return <Outlet />;
}
