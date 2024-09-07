import { Routes, Route } from "react-router-dom";
import "./App.css";

import SignIn from "./pages/auth/SignIn";
import MainLayout from "./layouts/MainLayout";
import Projects from "./pages/main/Projects";
import NewProject from "./pages/main/Projects/NewProject";
import Users from "./pages/main/Users";
import NewUser from "./pages/main/Users/NewUser";

function App() {
  const isAuthenticated = true;
  return (
    <main className="relative text-black min-h-screen">
      <Routes>
        {/* Auth route */}
        <Route path="/sign-in" element={<SignIn />} />

        {isAuthenticated && (
          <Route path="/" element={<MainLayout />}>
            <Route path="" element={<h1>Dashboard</h1>} />

            {/* Users */}
            <Route path="users" element={<Users />} />
            <Route path="users/new" element={<NewUser />} />

            <Route path="projects" element={<Projects />} />
            <Route path="projects/new" element={<NewProject />} />

            <Route path="tasks" element={<h1>Tasks</h1>} />
          </Route>
        )}

        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </main>
  );
}

export default App;
