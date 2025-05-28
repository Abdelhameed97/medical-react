import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
import DoctorAvailability from "./pages/Doctor/DoctorAvailability";
import DoctorProfile from "./pages/Doctor/DoctorProfile";
import DoctorSidebar from "./components/DoctorSidebar";
import Home from "./pages/Home";
import DoctorSchedule from "./pages/Doctor/DoctorSchedule"; // جديد
// patient
import PatientLayout from "./layouts/PatientLayout";
import DoctorList from "./features/patients/DoctorList";
import DoctorDetails from "./features/patients/DoctorDetails";
import AppointmentBooking from "./features/patients/AppointmentBooking";
import MyAppointments from "./features/patients/MyAppointments";
import Profile from "./features/patients/Profile";

function DoctorLayout() {
  // تصميم لوحة تحكم الدكتور فقط
  return (
    <div style={{ display: "flex" }}>
      <DoctorSidebar />
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path='dashboard' element={<DoctorDashboard />} />
          <Route path='appointments' element={<DoctorAppointments />} />
          <Route path='availability' element={<DoctorAvailability />} />
          <Route path='profile' element={<DoctorProfile />} />
          <Route path='schedule' element={<DoctorSchedule />} /> {/* جديد */}
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/doctor/*' element={<DoctorLayout />} />
        {/* Patient area */}
        <Route path='/patient' element={<PatientLayout />}>
          <Route path='doctors-list' element={<DoctorList />} />
          <Route path='doctors/:doctorId' element={<DoctorDetails />} />
          <Route
            path='book-appointment/:doctorId'
            element={<AppointmentBooking />}
          />
          <Route path='my-appointments' element={<MyAppointments />} />
          <Route path='profile' element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
