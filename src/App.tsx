import React from "react";
import "./index.css";
import Dashboard from "./components/layouts/DashboardLayout";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Learner from "./pages/Learner";
import Country from "./pages/Country";
import Test from "./pages/Test";
import Question from "./pages/Question";
import Feedback from "./pages/Feedback";
import Topic from "./pages/Topic";
import NotFound from "./pages/NotFound";
import MyAccount from "./pages/MyAccount";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />

        <Route element={<Dashboard />}>
          <Route path="/" element={<Admin />} />
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
