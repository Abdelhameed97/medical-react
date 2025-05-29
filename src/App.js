import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
import DoctorAvailability from "./pages/Doctor/DoctorAvailability";
import DoctorProfile from "./pages/Doctor/DoctorProfile";
import DoctorSidebar from "./components/DoctorSidebar";
import Home from "./pages/Home";
import DoctorSchedule from "./pages/Doctor/DoctorSchedule";

// patient
import PatientLayout from "./layouts/PatientLayout";
import DoctorsList from "./features/patients/DoctorsList";
import Doctor_Details from "./features/patients/Doctor_Details";
import AppointmentBooking from "./features/patients/AppointmentBooking";
import MyAppointments from "./features/patients/MyAppointments";
import Profile from "./features/patients/Profile";

// Add these new imports for patients and admin
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
        <Route path='/home' element={<Home />} />

        {/* Patient Routes */}
        <Route path='/patient' element={<PatientLayout />}>
          <Route path='doctors' element={<DoctorsList />} />
          <Route path='doctors/:doctorId' element={<Doctor_Details />} />
          <Route
            path='book-appointment/:doctorId'
            element={<AppointmentBooking />}
          />
          <Route path='my-appointments' element={<MyAppointments />} />
          <Route path='profile' element={<Profile />} />
        </Route>

        {/* Doctor Routes */}
        <Route path='/doctor/*' element={<DoctorLayout />} />

        {/* Admin Routes */}
        <Route path='/admin/*' element={<AdminRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
