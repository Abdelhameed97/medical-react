import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
import DoctorAvailability from "./pages/Doctor/DoctorAvailability";
import DoctorProfile from "./pages/Doctor/DoctorProfile";
import DoctorSidebar from "./components/DoctorSidebar";
import Home from "./pages/Home";
import DoctorSchedule from "./pages/Doctor/DoctorSchedule"; // جديد
// Add these new imports for patients and admin
import AdminLayout from "./components/admin/shared/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import DoctorList from "./components/admin/UserManagement/DoctorList";
import PatientsList from "./components/admin/UserManagement/PatientsList";
import DoctorDetails from "./components/admin/UserManagement/DoctorDetails";
import PatientDetails from "./components/admin/UserManagement/PatientDetails";
import AppointmentsList from "./components/admin/Appointments/AppointmentsList";
import SpecialtiesList from "./components/admin/Specialties/SpecialtyList";

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
          <Route path="schedule" element={<DoctorSchedule />} /> {/* جديد */}

        </Routes>
      </div>
    </div>
  );
}

// Add new AdminLayout component
function AdminRoutes() {
  return (
    <ThemeProvider theme={theme}>
      <AdminLayout>
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="doctors" element={<DoctorList />} />
          <Route path="patients" element={<PatientsList />} />
          <Route path="doctors/:id" element={<DoctorDetails />} />
          <Route path="patients/:id" element={<PatientDetails />} />
          <Route path="appointments" element={<AppointmentsList />} />
          <Route path="specialties" element={<SpecialtiesList />} />
        </Routes>
      </AdminLayout>
    </ThemeProvider>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/doctor/*" element={<DoctorLayout />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
