import { Routes, Route } from "react-router-dom";
import "./App.css";

import SignIn from "./pages/auth/SignIn";
import MainLayout from "./layouts/MainLayout";

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
          </Route>
        )}

        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </main>
  );
}

export default App;
