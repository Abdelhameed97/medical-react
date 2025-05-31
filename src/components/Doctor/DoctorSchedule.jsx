import { useEffect, useState } from "react";
import { Typography, Box, Grid, Paper, Pagination } from "@mui/material";
import { CheckCircle, CalendarToday } from "@mui/icons-material";
import axios from "axios";
import dayjs from "dayjs";

const DoctorSchedule = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const doctorId = 1;

  useEffect(() => {
    axios
      .get("http://localhost:5000/appointments")
      .then((res) => setAppointments(res.data || []))
      .catch((err) => console.error("Error fetching appointments:", err));

    axios
      .get("http://localhost:5000/patients")
      .then((res) => setPatients(res.data || []))
      .catch((err) => console.error("Error fetching patients:", err));
  }, []);

  const todayApprovedAppointments = appointments
    .filter(
      (appt) =>
        appt.doctorId === doctorId &&
        appt.status === "approved" &&
        dayjs(appt.date).isSame(dayjs(), "day")
    )
    .sort(
      (a, b) =>
        dayjs(a.time, "HH:mm").valueOf() - dayjs(b.time, "HH:mm").valueOf()
    );

  const getPatientFullName = (patientId) => {
    const patient = patients.find((p) => +p.id === +patientId);
    return patient ? patient.fullName : "Unknown Patient";
  };

  const totalPages = Math.ceil(todayApprovedAppointments.length / itemsPerPage);
  const paginatedAppointments = todayApprovedAppointments.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const renderCard = (appt) => (
    <Grid item xs={12} sm={6} md={4} key={appt.id}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 3,
          borderLeft: "4px solid #10b981",
          background: "#ffffff",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
          transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
            borderLeft: "4px solid #059669"
          },
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "4px",
            background: "linear-gradient(90deg, #10b981, #a7f3d0)"
          }
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Box>
            <Typography 
              variant="subtitle1" 
              fontWeight="600" 
              color="text.primary"
              sx={{ mb: 0.5 }}
            >
              {getPatientFullName(appt.patientId)}
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ 
                display: "flex",
                alignItems: "center",
                gap: 1
              }}
            >
              <CalendarToday sx={{ fontSize: 16, color: "#10b981" }} />
              {dayjs(appt.date).format("DD/MM/YYYY")} - {appt.time}
            </Typography>
          </Box>
          <CheckCircle sx={{ color: "#10b981", fontSize: 28 }} />
        </Box>
        
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mt: 2,
            borderRadius: 2,
            backgroundColor: "#f8fafc",
            border: "1px solid #e2e8f0"
          }}
        >
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{
              fontStyle: appt.notes ? "normal" : "italic",
              color: appt.notes ? "#64748b" : "#94a3b8"
            }}
          >
            {appt.notes || "No additional notes"}
          </Typography>
        </Paper>
      </Paper>
    </Grid>
  );

  return (
    <Box sx={{ p: 4, maxWidth: "1400px", mx: "auto" }}>





      <Box sx={{ 
        mb: 4,
        display: "flex",
        alignItems: "center",
        gap: 2,
        p: 3,
        backgroundColor: "#ffffff",
        borderRadius: 3,
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)"
      }}>
        <CalendarToday sx={{ color: "#10b981", fontSize: 32 }} />
        <Box>
          <Typography variant="h5" fontWeight="700" color="text.primary">
            Today's Approved Appointments
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {dayjs().format("dddd, MMMM D, YYYY")}
          </Typography>
        </Box>
      </Box>

      {paginatedAppointments.length === 0 ? (
        <Box sx={{
          p: 6,
          textAlign: "center",
          backgroundColor: "#ffffff",
          borderRadius: 3,
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)"
        }}>
          <Typography variant="h6" color="text.secondary">
            No appointments scheduled for today
          </Typography>
          <Typography variant="body2" color="text.disabled" sx={{ mt: 1 }}>
            All approved appointments will appear here
          </Typography>
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {paginatedAppointments.map(renderCard)}
          </Grid>

          {totalPages > 1 && (
            <Box sx={{ 
              mt: 4,
              p: 3,
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#ffffff",
              borderRadius: 3,
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)"
            }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                shape="rounded"
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: "#64748b",
                    "&.Mui-selected": {
                      backgroundColor: "#10b981",
                      color: "#ffffff",
                      "&:hover": {
                        backgroundColor: "#059669"
                      }
                    },
                    "&:hover": {
                      backgroundColor: "#e2e8f0"
                    }
                  }
                }}
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default DoctorSchedule;