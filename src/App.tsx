import React from "react";
import "./index.css";
import Dashboard from "./components/layouts/DashboardLayout";
import Admin from "./pages/admin/Admin";
import Login from "./pages/auth/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Learner from "./pages/Learner";
import Country from "./pages/Country";
import Test from "./pages/Test";
import Question from "./pages/Question";
import Feedback from "./pages/Feedback";
import Topic from "./pages/Topic";
import NotFound from "./pages/NotFound";
import MyAccount from "./pages/MyAccount";
import CreateAdmin from "./pages/admin/CreateAdmin";
import ForgetPassword from "./pages/auth/ForgetPassword";
import Role from "./pages/role/Role";
import CreateRole from "./pages/role/CreateRole";
import ResetPassword from "./pages/auth/ResetPassword";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />

        <Route element={<Dashboard />}>
          <Route path="/" element={<Admin />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/createadmin" element={<CreateAdmin />} />

          <Route path="/role" element={<Role />} />
          <Route path="/createrole" element={<CreateRole />} />
          <Route path="/learner" element={<Learner />} />
          <Route path="/country" element={<Country />} />
          <Route path="/topic" element={<Topic />} />
          <Route path="/test" element={<Test />} />
          <Route path="/question" element={<Question />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/account" element={<MyAccount />} />
          
          {/* <Route path="/:type/:id" element={<Detail />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
