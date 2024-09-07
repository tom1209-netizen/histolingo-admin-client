import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./components/layouts/DashboardLayout";
import "./index.css";
import Admin from "./pages/admin/Admin";
import CreateAdmin from "./pages/admin/CreateAdmin";
import UpdateAdmin from "./pages/admin/UpdateAdmin";
import ForgetPassword from "./pages/auth/ForgetPassword";
import Login from "./pages/auth/Login";
import ResetPassword from "./pages/auth/ResetPassword";
import Country from "./pages/country/Country";
import CreateCountry from "./pages/country/CreateCountry";
import UpdateCountry from "./pages/country/UpdateCountry";
import CreateDocumentation from "./pages/documentation/CreateDocumentation";
import Documentation from "./pages/documentation/Documentation";
import UpdateDocumentation from "./pages/documentation/UpdateDocumentation";
import Feedback from "./pages/feedback/Feedback";
import Learner from "./pages/learner/Learner";
import MyAccount from "./pages/MyAccount";
import NotFound from "./pages/NotFound";
import CreatePlayerTest from "./pages/playerTest/CreatePlayerTest";
import PlayerTest from "./pages/playerTest/playerTest";
import UpdatePlayerTest from "./pages/playerTest/UpdatePlayerTest";
import CreateQuestion from "./pages/question/CreateQuestion";
import Question from "./pages/question/Question";
import UpdateQuestion from "./pages/question/UpdateQuestion";
import Result from "./pages/result/Result";
import CreateRole from "./pages/role/CreateRole";
import Role from "./pages/role/Role";
import UpdateRole from "./pages/role/UpdateRole";
import TestPlay from "./pages/testPlay/TestPlay";
import CreateTopic from "./pages/topic/CreateTopic";
import Topic from "./pages/topic/Topic";
import UpdateTopic from "./pages/topic/UpdateTopic";
import { DataProvider } from "./components/layouts/ProfileContext";

const App: React.FC = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
       
          <Route element={<DataProvider ><Dashboard /></DataProvider >} >
          {/* <Route element={<Dashboard />} > */}
            <Route path="/" element={<MyAccount />} />
            {/* <Route path="/" element={<Country />} /> */}
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/:adminId" element={<UpdateAdmin />} />
            <Route path="/createadmin" element={<CreateAdmin />} />

            <Route path="/role" element={<Role />} />
            <Route path="/role/:roleId" element={<UpdateRole />} />
            <Route path="/createrole" element={<CreateRole />} />

            <Route path="/country" element={<Country />} />
            <Route path="/country/:countryId" element={<UpdateCountry />} />
            <Route path="/createcountry" element={<CreateCountry />} />

            <Route path="/topic" element={<Topic />} />
            <Route path="/topic/:topicId" element={<UpdateTopic />} />
            <Route path="/createtopic" element={<CreateTopic />} />

            <Route path="/question" element={<Question />} />
            <Route path="/question/:questionId" element={<UpdateQuestion />} />
            <Route path="/createquestion" element={<CreateQuestion />} />

            <Route path="/playertest" element={<PlayerTest />} />
            <Route path="/playertest/:testId" element={<UpdatePlayerTest />} />
            <Route path="/createtest" element={<CreatePlayerTest />} />

            <Route path="/documentation" element={<Documentation />} />
            <Route
              path="/documentation/:documentationId"
              element={<UpdateDocumentation />}
            />
            <Route
              path="/createdocumentation"
              element={<CreateDocumentation />}
            />

            <Route path="/testplay/:testId" element={<TestPlay />} />
            <Route path="/result" element={<Result />} />

            <Route path="/learner" element={<Learner />} />
            <Route path="/feedback" element={<Feedback />} />

            <Route path="/learner" element={<Learner />} />
            <Route path="/account" element={<MyAccount />} />
          </Route>
        </Routes>
        <ToastContainer />
 
    </BrowserRouter>
  );
};

export default App;
