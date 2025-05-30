import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";

// Public Pages
import MainDashboard from "./pages/MainDashboard";
import Home from "./pages/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";

// Doctor
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
import DoctorAvailability from "./pages/Doctor/DoctorAvailability";
import DoctorProfile from "./pages/Doctor/DoctorProfile";
import DoctorSidebar from "./components/DoctorSidebar";
import DoctorSchedule from "./pages/Doctor/DoctorSchedule";

// Admin
import AdminDoctorApproval from "./admin/AdminDoctorsApproval";
import AdminPatientApproval from "./admin/AdminPatientApproval";
import AdminLayout from "./components/admin/shared/AdminLayout";
import DoctorList from "./components/admin/UserManagement/DoctorList";
import PatientsList from "./components/admin/UserManagement/PatientsList";
import DoctorDetails from "./components/admin/UserManagement/DoctorDetails";
import PatientDetails from "./components/admin/UserManagement/PatientDetails";
import AppointmentsList from "./components/admin/Appointments/AppointmentsList";
import SpecialtiesList from "./components/admin/Specialties/SpecialtyList";
import AdminHomePage from "./components/Home/AdminHomePage";
import Notifications from "./pages/admin/Notifications";

// Patient
import PatientLayout from "./layouts/PatientLayout";
import FindDoctorsView from "./features/patients/FindDoctorsView";
import Doctor_Details from "./features/patients/Doctor_Details";
import AppointmentConfirmation from "./features/patients/AppointmentConfirmation";
import Profile from "./features/patients/Profile";

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
          <Route path="AdminDoctorApproval" element={<AdminDoctorApproval />} />
          <Route path="AdminPatientApproval" element={<AdminPatientApproval />} />
        </Routes>
      </AdminLayout>
    </ThemeProvider>
  );
}

function PatientRoutes() {
  return (
    <ThemeProvider theme={theme}>
      <PatientLayout>
        <Routes>
          <Route path="/" element={<FindDoctorsView />} />
          <Route path="doctors/:docId" element={<Doctor_Details />} />
          <Route path="confirm-appointment/:docId" element={<AppointmentConfirmation />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </PatientLayout>
    </ThemeProvider>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainDashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Doctor Routes */}
        <Route path="/doctor/*" element={<DoctorLayout />} />

        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* Patient Routes */}
        <Route path="/patient/*" element={<PatientRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
