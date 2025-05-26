import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
import DoctorAvailability from "./pages/Doctor/DoctorAvailability";
import DoctorProfile from "./pages/Doctor/DoctorProfile";
import DoctorSidebar from "./components/DoctorSidebar";
import Home from "./pages/Home";

function DoctorLayout() {
  // تصميم لوحة تحكم الدكتور فقط
  return (
    <div style={{ display: "flex" }}>
      <DoctorSidebar />
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="dashboard" element={<DoctorDashboard />} />
          <Route path="appointments" element={<DoctorAppointments />} />
          <Route path="availability" element={<DoctorAvailability />} />
          <Route path="profile" element={<DoctorProfile />} />
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
      </Routes>
    </Router>
  );
}

export default App;
