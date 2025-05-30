import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainDashboard from "./pages/MainDashboard"; // أضف هذا الاستيراد
import Home from "./pages/Home";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
import DoctorAvailability from "./pages/Doctor/DoctorAvailability";
import DoctorProfile from "./pages/Doctor/DoctorProfile";
import Login from "./auth/Login";
import Register from "./auth/Register";
import AdminDoctorApproval from "./admin/AdminDoctorsApproval";
import AdminPatientApproval from "./admin/AdminPatientApproval";
import DoctorSidebar from "./components/DoctorSidebar";
import DoctorSchedule from "./pages/Doctor/DoctorSchedule";
import AdminLayout from "./components/admin/shared/AdminLayout";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import DoctorList from "./components/admin/UserManagement/DoctorList";
import PatientsList from "./components/admin/UserManagement/PatientsList";
import DoctorDetails from "./components/admin/UserManagement/DoctorDetails";
import PatientDetails from "./components/admin/UserManagement/PatientDetails";
import AppointmentsList from "./components/admin/Appointments/AppointmentsList";
import SpecialtiesList from "./components/admin/Specialties/SpecialtyList";
import AdminHomePage from "./components/Home/AdminHomePage";
import Notifications from "./pages/admin/Notifications";

function DoctorLayout() {
  return (
    <div style={{ display: "flex" }}>
      <DoctorSidebar />
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<DoctorDashboard />} />
          <Route path="appointments" element={<DoctorAppointments />} />
          <Route path="availability" element={<DoctorAvailability />} />
          <Route path="profile" element={<DoctorProfile />} />
          <Route path="schedule" element={<DoctorSchedule />} /> 
        </Routes>
      </div>
    </div>
  );
}

function AdminRoutes() {
  return (
    <ThemeProvider theme={theme}>
      <AdminLayout>
        <Routes>
          <Route path="/" element={<AdminHomePage />} />
          <Route path="doctors" element={<DoctorList />} />
          <Route path="patients" element={<PatientsList />} />
          <Route path="doctors/:id" element={<DoctorDetails />} />
          <Route path="patients/:id" element={<PatientDetails />} />
          <Route path="appointments" element={<AppointmentsList />} />
          <Route path="specialties" element={<SpecialtiesList />} />
          <Route path="notifications" element={<Notifications />} />
        </Routes>
      </AdminLayout>
    </ThemeProvider>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainDashboard />} /> {/* الصفحة الرئيسية الجديدة */}
        <Route path="/home" element={<Home />} />
        <Route path="/doctor/*" element={<DoctorLayout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/AdminPatientApproval" element={<AdminPatientApproval />} />
        <Route path="/admin/AdminDoctorApproval" element={<AdminDoctorApproval />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;