import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import SignIn from "./pages/auth/SignIn";
import MainLayout from "./layouts/MainLayout";
import Projects from "./pages/main/Projects";
import NewProject from "./pages/main/Projects/NewProject";
import Users from "./pages/main/Users";
import NewUser from "./pages/main/Users/NewUser";
import ProjectDetail from "./pages/main/Projects/ProjectDetail";
import AuthLayout from "./layouts/AuthLayout";
import AppLoading from "./components/loading/AppLoading";
import { useAppDispatch } from "./reduxStore";
import { checkAuthentication } from "./reduxStore/auth/action";
import UserDetail from "./pages/main/Users/UserDetail";

function App() {
  const dispatch = useAppDispatch();
  const [loadingApp, setLoadingApp] = useState(true);

  useEffect(() => {
    (async () => {
      await dispatch(checkAuthentication());
      setLoadingApp(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loadingApp ? (
    <AppLoading />
  ) : (
    <main className="relative text-black min-h-screen">
      <Routes>
        {/* Auth route */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignIn />} />
        </Route>

        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<h1>Dashboard</h1>} />

          {/* Users */}
          <Route path="users" element={<Users />} />
          <Route path="users/new" element={<NewUser />} />
          <Route path="users/:id" element={<UserDetail />} />

          <Route path="projects" element={<Projects />} />
          <Route path="projects/new" element={<NewProject />} />
          <Route path="projects/:projectId" element={<ProjectDetail />} />

          <Route path="my-tasks" element={<h1>Tasks</h1>} />
        </Route>

        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </main>
  );
}

export default App;
