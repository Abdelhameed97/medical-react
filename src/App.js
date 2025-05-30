import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainDashboard from "./pages/MainDashboard"; // أضف هذا الاستيراد
import Home from "./pages/Home";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
import DoctorAvailability from "./pages/Doctor/DoctorAvailability";
import DoctorProfile from "./pages/Doctor/DoctorProfile";
import Login from "./auth/Login";
import Register from "./auth/Register";
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

import PatientLayout from "./layouts/PatientLayout";
// Add new imports for patients
import FindDoctorsView from "./features/patients/FindDoctorsView";
import Doctor_Details from "./features/patients/Doctor_Details";
import AppointmentBooking from "./features/patients/AppointmentBooking";
import Profile from "./features/patients/Profile";
import AppointmentConfirmation from "./features/patients/AppointmentConfirmation";
import AdminPatientApproval from './components/admin/Approval/AdminPatientApproval';
import AdminDoctorApproval from './components/admin/Approval/AdminDoctorsApproval';
import AdminProfile from "./pages/admin/AdminProfile";

// Add new AdminLayout component
function PatientRoutes() {
  return (
    <PatientLayout>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path='/' element={<FindDoctorsView />} />
          <Route path='doctors/:docId' element={<Doctor_Details />} />
          <Route path='patients' element={<PatientsList />} />
          {/* <Route
            path='book-appointment/:docId'
            element={<AppointmentBooking />}
          /> */}
          <Route
            path='confirm-appointment/:docId'
            element={<AppointmentConfirmation />}
          />
          <Route path='profile' element={<Profile />} />
        </Routes>
      </ThemeProvider>
    </PatientLayout>
  );
}

function DoctorLayout() {
  return (
    <div style={{ display: "flex" }}>
      <DoctorSidebar />
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path='/' element={<DoctorDashboard />} />
          <Route path='appointments' element={<DoctorAppointments />} />
          <Route path='availability' element={<DoctorAvailability />} />
          <Route path='profile' element={<DoctorProfile />} />
          <Route path='schedule' element={<DoctorSchedule />} /> {/* جديد */}
        </Routes>
      </div>
    </div>
  );
}

function AdminRoutes() {
  return (
    <AdminLayout>
        <Routes>
          <Route path='/' element={<AdminHomePage />} />
          <Route path='doctors' element={<DoctorList />} />
          <Route path='patients' element={<PatientsList />} />
          <Route path='doctors/:id' element={<DoctorDetails />} />
          <Route path='patients/:id' element={<PatientDetails />} />
          <Route path='appointments' element={<AppointmentsList />} />
          <Route path='specialties' element={<SpecialtiesList />} />
          <Route path='notifications' element={<Notifications />} />
          <Route path="/AdminPatientApproval" element={<AdminPatientApproval />} />
          <Route path="/AdminDoctorApproval" element={<AdminDoctorApproval />} />
          <Route path="/AdminProfile" element={<AdminProfile />} />
        </Routes>
      </AdminLayout>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <Routes>
        <Route path="/" element={<MainDashboard />} /> {/* الصفحة الرئيسية الجديدة */}
        <Route path="/home" element={<Home />} />
        <Route path="/doctor/*" element={<DoctorLayout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/patient/*' element={<PatientRoutes />} />
        <Route path='/doctor/*' element={<DoctorLayout />} />
        <Route path='/admin/*' element={<AdminRoutes />} />
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;