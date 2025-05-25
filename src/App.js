import { useState } from "react";
import DoctorSidebar from "./components/DoctorSidebar";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments";
import DoctorAvailability from "./pages/Doctor/DoctorAvailability";
import DoctorProfile from "./pages/Doctor/DoctorProfile";


function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <div style={{ display: "flex" }}>
      <DoctorSidebar onSelect={setPage} />
      <div style={{ flex: 1,   marginLeft: 'auto', 
 }}>
        {page === "dashboard" && <DoctorDashboard />}
        {page === "appointments" && <DoctorAppointments />}
        {page === "availability" && <DoctorAvailability />}
        {page === "profile" && <DoctorProfile />}




      </div>
    </div>
  );
}

export default App;
