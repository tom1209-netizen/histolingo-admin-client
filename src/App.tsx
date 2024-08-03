import React from "react";
import "./index.css";
import Dashboard from "./components/layouts/DashboardLayout";
import Admin from "./pages/admin/Admin";
import Login from "./pages/auth/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Learner from "./pages/learner/Learner";
import Country from "./pages/country/Country";
import Test from "./pages/playerTest/Test";
import Question from "./pages/question/Question";
import Feedback from "./pages/feedback/Feedback";
import Topic from "./pages/topic/Topic";
import NotFound from "./pages/NotFound";
import MyAccount from "./pages/MyAccount";
import CreateAdmin from "./pages/admin/CreateAdmin";
import ForgetPassword from "./pages/auth/ForgetPassword";
import Role from "./pages/role/Role";
import CreateRole from "./pages/role/CreateRole";
import ResetPassword from "./pages/auth/ResetPassword";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import UpdateRole from "./pages/role/UpdateRole";


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
          <Route path="/role/:roleId" element={<UpdateRole />} />
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
      <ToastContainer /> 
    </BrowserRouter>
  );
};

export default App;
