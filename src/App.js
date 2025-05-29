import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DoctorSidebar from "./components/DoctorSidebar";
import Home from "./pages/Home";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
import DoctorAvailability from "./pages/Doctor/DoctorAvailability";
import DoctorProfile from "./pages/Doctor/DoctorProfile";
import DoctorSchedule from "./pages/Doctor/DoctorSchedule";
import Login from "./auth/Login";
import Register from "./auth/Register";
import AdminDoctorApproval from "./admin/AdminDoctorsApproval";
import AdminPatientApproval from "./admin/AdminPatientApproval";

function DoctorLayout() {
  return (
    <div style={{ display: "flex" }}>
      <DoctorSidebar />
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="dashboard" element={<DoctorDashboard />} />
          <Route path="appointments" element={<DoctorAppointments />} />
          <Route path="availability" element={<DoctorAvailability />} />
          <Route path="profile" element={<DoctorProfile />} />
          <Route path="schedule" element={<DoctorSchedule />} /> {/* جديد */}
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/doctor/*" element={<DoctorLayout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/AdminPatientApproval" element={<AdminPatientApproval />} />
        <Route path="/admin/AdminDoctorApproval" element={<AdminDoctorApproval />} />
      </Routes>
    </Router>
  );
}

export default App;
