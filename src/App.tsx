import React from "react";
import "./index.css";
import Dashboard from "./components/layouts/DashboardLayout";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App: React.FC = () => {
  return (
    <div>
      {/* <Dashboard>
        <Admin/>
      </Dashboard> */}
      {/* <Login/> */}
      <Register/>
    </div>
  );
};

export default App;
