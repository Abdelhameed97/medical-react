import { useEffect, useState } from "react";
import {
  Typography, Paper, Box, Button, TextField, Grid,
  Chip, Avatar, Divider, IconButton, Stack, Tabs, Tab, MenuItem,
  Select, InputLabel, FormControl, Pagination
} from "@mui/material";
import axios from "axios";
import {
  CheckCircle, Cancel, AccessTime, Edit,
  CalendarToday, WatchLater, Notes,
  Save, Close, FilterAlt
} from "@mui/icons-material";
import dayjs from "dayjs";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [editingNotes, setEditingNotes] = useState(null);
  const [tempNotes, setTempNotes] = useState("");
  const [tab, setTab] = useState(0);
  const [filterType, setFilterType] = useState("all");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;

  const daysOfWeek = [
    "Sunday", "Monday", "Tuesday", "Wednesday", 
    "Thursday", "Friday", "Saturday"
  ];

  useEffect(() => {
    axios.get("http://localhost:5000/appointments").then(res => {
      setAppointments(res.data);
    });
  }, []);

  const handleStatusChange = (id, status) => {
    axios.patch(`http://localhost:5000/appointments/${id}`, { status })
      .then(() => {
        setAppointments(prev =>
          prev.map(appt =>
            appt.id === id ? { ...appt, status } : appt
          )
        );
      });
  };

  const handleNoteChange = (id, note) => {
    axios.patch(`http://localhost:5000/appointments/${id}`, { notes: note })
      .then(() => {
        setAppointments(prev =>
          prev.map(appt =>
            appt.id === id ? { ...appt, notes: note } : appt
          )
        );
      });
  };

  const startEditing = (appt) => {
    setEditingNotes(appt.id);
    setTempNotes(appt.notes || "");
  };

  const saveNotes = (id) => {
    handleNoteChange(id, tempNotes);
    setEditingNotes(null);
  };

  const cancelEditing = () => {
    setEditingNotes(null);
  };

  const getStatusChip = (status) => {
    switch (status) {
      case "approved":
        return (
          <Chip
            icon={<CheckCircle sx={{ fontSize: 16 }} />}
            label="Approved"
            color="success"
            size="small"
            sx={{
              fontWeight: 600,
              fontSize: "0.75rem",
              backgroundColor: "#10b981",
              color: "#fff",
              "&:hover": { backgroundColor: "#059669" },
              px: 1,
              py: 0.5
            }}
          />
        );
      case "rejected":
        return (
          <Chip
            icon={<Cancel sx={{ fontSize: 16 }} />}
            label="Rejected"
            color="error"
            size="small"
            sx={{
              fontWeight: 600,
              fontSize: "0.75rem",
              backgroundColor: "#ef4444",
              color: "#fff",
              "&:hover": { backgroundColor: "#dc2626" },
              px: 1,
              py: 0.5
            }}
          />
        );
      default:
        return (
          <Chip
            icon={<AccessTime sx={{ fontSize: 16 }} />}
            label="Pending"
            color="warning"
            size="small"
            sx={{
              fontWeight: 600,
              fontSize: "0.75rem",
              backgroundColor: "#f59e0b",
              color: "#fff",
              "&:hover": { backgroundColor: "#d97706" },
              px: 1,
              py: 0.5
            }}
          />
        );
    }
  };

  const now = dayjs();

  const sortByDateDesc = (list) =>
    [...list].sort((a, b) =>
      dayjs(`${b.date} ${b.time}`).valueOf() - dayjs(`${a.date} ${a.time}`).valueOf()
    );

  const filteredAppointments = (status, isPast = false) => {
    let filtered = appointments;
    
    if (isPast) {
      filtered = filtered.filter(appt =>
        dayjs(`${appt.date} ${appt.time}`).isBefore(now)
      );
    } else if (status) {
      filtered = filtered.filter(appt => appt.status === status);
    }
    
    return sortByDateDesc(
      filtered.filter(appt => {
        const appointmentDate = dayjs(`${appt.date} ${appt.time}`);
        const dayName = appointmentDate.format("dddd");
        
        if (filterType === "all") return true;
        if (filterType === "day" && selectedDay) return dayName === selectedDay;
        if (filterType === "date" && selectedDate) return appt.date === selectedDate;
        return false;
      })
    );
  };

  const pendingAppointments = filteredAppointments("pending");
  const acceptedAppointments = filteredAppointments("approved");
  const rejectedAppointments = filteredAppointments("rejected");
  const pastAppointments = filteredAppointments(null, true);

  const paginate = (data) => {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const paginatedData = data.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage
    );
    
    return { data: paginatedData, totalPages };
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderAppointmentCard = (appt) => (
    <Grid item xs={12} sm={6} md={2} key={appt.id}>
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          borderRadius: 1.5,
          borderLeft: `4px solid ${
            appt.status === "approved" ? "#10b981" :
            appt.status === "rejected" ? "#ef4444" : "#f59e0b"
          }`,
          background: "#ffffff",
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
          position: "relative",
          "&:hover": {
            transform: "translateY(-6px)",
            boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
            borderLeftWidth: "5px"
          },
          height: "100%",
          display: "flex",
          flexDirection: "column",
          minWidth: 320,
          "&:before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "8px",
            background: appt.status === "approved"
              ? "linear-gradient(90deg, #10b981, #34d399)"
              : appt.status === "rejected"
              ? "linear-gradient(90deg, #ef4444, #f87171)"
              : "linear-gradient(90deg, #f59e0b, #fbbf24)",
            borderTopLeftRadius: "4px",
            borderTopRightRadius: "4px",
          },
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center" mb={1.5}>
          <Avatar
            sx={{
              bgcolor: appt.status === "approved" ? "#10b981" :
                       appt.status === "rejected" ? "#ef4444" : "#f59e0b",
              width: 36,
              height: 36,
              fontSize: "0.9rem",
            }}
          >
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight={600} color="text.primary" fontSize="1rem">
              {appt.patientName}
            </Typography>
            <Typography variant="body2" color="text.secondary" fontSize="0.9rem">
              ID: {appt.patientId}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ my: 1.5, borderColor: "rgba(0,0,0,0.06)" }} />

        <Box mb={1.5}>
          <Stack direction="row" spacing={0.5} alignItems="center" mb={1}>
            <CalendarToday sx={{ color: "#64748b", fontSize: 18 }} />
            <Typography variant="body2" color="text.secondary" fontSize="0.9rem">
              {dayjs(appt.date).format("DD/MM/YYYY")}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={0.5} alignItems="center" mb={1}>
            <WatchLater sx={{ color: "#64748b", fontSize: 18 }} />
            <Typography variant="body2" color="text.secondary" fontSize="0.9rem">
              {appt.time}
            </Typography>
          </Stack>
          <Box>
            {getStatusChip(appt.status)}
          </Box>
        </Box>

        <Box mt="auto">
          <Typography
            variant="subtitle2"
            fontWeight={600}
            color="text.primary"
            mb={1}
            display="flex"
            alignItems="center"
            fontSize="0.95rem"
          >
            <Notes sx={{ mr: 0.5, color: "#64748b", fontSize: 18 }} />
            Notes
          </Typography>
          {editingNotes === appt.id ? (
            <Box>
              <TextField
                multiline
                rows={2}
                variant="outlined"
                fullWidth
                value={tempNotes}
                onChange={(e) => setTempNotes(e.target.value)}
                size="small"
                sx={{ mb: 1, "& .MuiOutlinedInput-root": { borderRadius: 1 } }}
              />
              <Stack direction="row" spacing={1} justifyContent="flex-end">
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<Save sx={{ fontSize: 18 }} />}
                  onClick={() => saveNotes(appt.id)}
                  sx={{ 
                    minWidth: 95, 
                    backgroundColor: "#10b981", 
                    "&:hover": { backgroundColor: "#059669" },
                    fontSize: "0.8rem",
                    py: 0.5
                  }}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<Close sx={{ fontSize: 18 }} />}
                  onClick={cancelEditing}
                  sx={{ 
                    minWidth: 95,
                    fontSize: "0.8rem",
                    py: 0.5
                  }}
                >
                  Cancel
                </Button>
              </Stack>
            </Box>
          ) : (
            <Paper
              variant="outlined"
              sx={{
                p: 1.5,
                borderRadius: 1,
                minHeight: 80,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                backgroundColor: "#f8fafc",
                borderColor: "rgba(0,0,0,0.06)",
                "&:hover": { backgroundColor: "#f1f5f9" },
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(0,0,0,0.06)" }
              }}
            >
              <Typography variant="body2" color="text.secondary" sx={{ width: "100%", fontSize: "0.9rem" }}>
                {appt.notes || "No notes added"}
              </Typography>
              <IconButton
                size="small"
                onClick={() => startEditing(appt)}
                sx={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  backgroundColor: "rgba(255,255,255,0.9)",
                  "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" },
                  width: 24,
                  height: 24
                }}
              >
                <Edit fontSize="small" sx={{ fontSize: 18 }} />
              </IconButton>
            </Paper>
          )}
        </Box>

        <Stack direction="row" spacing={1} justifyContent="flex-end" mt={1.5}>
          {appt.status !== "approved" && (
            <Button
              variant="contained"
              size="small"
              startIcon={<CheckCircle sx={{ fontSize: 18 }} />}
              onClick={() => handleStatusChange(appt.id, "approved")}
              sx={{
                minWidth: 95,
                backgroundColor: "#10b981",
                "&:hover": { backgroundColor: "#059669" },
                textTransform: "none",
                fontSize: "0.8rem",
                py: 0.5
              }}
            >
              Approve
            </Button>
          )}
          {appt.status !== "rejected" && (
            <Button
              variant="outlined"
              size="small"
              startIcon={<Cancel sx={{ fontSize: 18 }} />}
              onClick={() => handleStatusChange(appt.id, "rejected")}
              sx={{
                minWidth: 95,
                borderColor: "#ef4444",
                color: "#ef4444",
                "&:hover": { borderColor: "#dc2626", color: "#dc2626" },
                textTransform: "none",
                fontSize: "0.8rem",
                py: 0.5
              }}
            >
              Reject
            </Button>
          )}
        </Stack>
      </Paper>
    </Grid>
  );

  const renderAppointments = (data) => {
    const { data: paginatedData, totalPages } = paginate(data);
    
    return (
      <>
        <Grid container spacing={2}>
          {paginatedData.length ? paginatedData.map(renderAppointmentCard) : (
            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 3,
                  textAlign: "center",
                  backgroundColor: "#ffffff",
                  borderRadius: 1.5,
                  boxShadow: "0 2px 6px rgba(0,0,0,0.08)"
                }}
              >
                <Typography variant="h6" color="text.secondary" fontSize="1.1rem">
                  No appointments found
                </Typography>
                <Typography variant="body2" color="text.disabled" sx={{ mt: 1, fontSize: "0.9rem" }}>
                  {tab === 0 && "No pending appointments available"}
                  {tab === 1 && "No accepted appointments available"}
                  {tab === 2 && "No rejected appointments available"}
                  {tab === 3 && "No past appointments available"}
                </Typography>
              </Paper>
            </Grid>
          )}
        </Grid>
        
        {totalPages > 1 && (
          <Box sx={{ 
            display: "flex", 
            justifyContent: "center", 
            mt: 10,
            p: 1.5,
            backgroundColor: "#ffffff",
            borderRadius: 1.5,
            boxShadow: "0 2px 6px rgba(0,0,0,0.08)"
          }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              shape="rounded"
              size="small"
              sx={{
                "& .MuiPaginationItem-root": {
                  fontSize: "0.85rem",
                  minWidth: 30,
                  height: 30,
                  borderRadius: 15,
                  "&.Mui-selected": {
                    backgroundColor: "#10b981",
                    color: "#fff",
                    "&:hover": { backgroundColor: "#059669" }
                  },
                  "&:hover": { backgroundColor: "#e2e8f0" }
                }
              }}
            />
          </Box>
        )}
      </>
    );
  };

  return (
    <Box
      sx={{
        p: { xs: 1.5, sm: 2, md: 3 },
        backgroundColor: "#f9fafb",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <Box sx={{ 
        display: "flex", 
        alignItems: "center", 
        mb: 3,
        p: 2,
        backgroundColor: "#ffffff",
        borderRadius: 1.5,
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)"
      }}>
        <CalendarToday sx={{ 
          fontSize: 28, 
          mr: 1.5, 
          color: "#10b981",
          backgroundColor: "#ecfdf5",
          p: 0.5,
          borderRadius: "50%"
        }} />
        <Box>
          <Typography variant="h5" fontWeight={700} color="text.primary" fontSize="1.25rem">
            Appointments Management
          </Typography>
          <Typography variant="body2" color="text.secondary" fontSize="0.9rem">
            Manage and review all patient appointments
          </Typography>
        </Box>
      </Box>

      <Paper
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 1.5,
          backgroundColor: "#ffffff",
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap" useFlexGap>
          <FilterAlt sx={{ color: "#64748b", fontSize: 20 }} />
          <FormControl size="small" sx={{ minWidth: 130 }}>
            <InputLabel>Filter Type</InputLabel>
            <Select
              value={filterType}
              onChange={(e) => {
                setFilterType(e.target.value);
                setPage(1);
              }}
              label="Filter Type"
              sx={{ fontSize: "0.85rem", "& .MuiOutlinedInput-notchedOutline": { borderRadius: 1 } }}
            >
              <MenuItem value="all" sx={{ fontSize: "0.85rem" }}>All Appointments</MenuItem>
              <MenuItem value="day" sx={{ fontSize: "0.85rem" }}>By Day of Week</MenuItem>
              <MenuItem value="date" sx={{ fontSize: "0.85rem" }}>By Specific Date</MenuItem>
            </Select>
          </FormControl>

          {filterType === "day" && (
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Select Day</InputLabel>
              <Select
                value={selectedDay}
                onChange={(e) => {
                  setSelectedDay(e.target.value);
                  setPage(1);
                }}
                label="Select Day"
                sx={{ fontSize: "0.85rem", "& .MuiOutlinedInput-notchedOutline": { borderRadius: 1 } }}
              >
                {daysOfWeek.map(day => (
                  <MenuItem key={day} value={day} sx={{ fontSize: "0.85rem" }}>{day}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {filterType === "date" && (
            <TextField
              label="Select Date"
              type="date"
              size="small"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setPage(1);
              }}
              InputLabelProps={{ shrink: true }}
              sx={{ width: 160, "& .MuiOutlinedInput-notchedOutline": { borderRadius: 1 } }}
              inputProps={{ style: { fontSize: "0.85rem" } }}
            />
          )}

          {(filterType !== "all" && (selectedDay || selectedDate)) && (
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                setSelectedDay("");
                setSelectedDate("");
                setPage(1);
              }}
              sx={{ 
                ml: "auto", 
                borderColor: "#e2e8f0", 
                color: "#64748b", 
                "&:hover": { 
                  borderColor: "#cbd5e1", 
                  color: "#475569",
                  backgroundColor: "#f1f5f9"
                },
                fontSize: "0.75rem",
                px: 1,
                py: 0.5
              }}
            >
              Clear Filters
            </Button>
          )}
        </Stack>
      </Paper>

      <Paper
        sx={{
          mb: 3,
          borderRadius: 1.5,
          backgroundColor: "#ffffff",
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        }}
      >
        <Tabs
          value={tab}
          onChange={(e, newVal) => {
            setTab(newVal);
            setFilterType("all");
            setSelectedDay("");
            setSelectedDate("");
            setPage(1);
          }}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            "& .MuiTabs-flexContainer": { gap: 0.5 },
            "& .MuiTab-root": { 
              fontWeight: 600, 
              textTransform: "none", 
              fontSize: "0.85rem",
              px: 1.5,
              minHeight: 44,
              borderRadius: 0.5,
              "&.Mui-selected": {
                color: "#10b981",
                backgroundColor: "rgba(16, 185, 129, 0.1)"
              }
            },
            "& .MuiTabs-indicator": {
              height: 3,
              backgroundColor: "#10b981"
            }
          }}
        >
          <Tab label="Pending" />
          <Tab label="Accepted" />
          <Tab label="Rejected" />
          <Tab label="Past Appointments" />
        </Tabs>
      </Paper>

      {tab === 0 && renderAppointments(pendingAppointments)}
      {tab === 1 && renderAppointments(acceptedAppointments)}
      {tab === 2 && renderAppointments(rejectedAppointments)}
      {tab === 3 && renderAppointments(pastAppointments)}
    </Box>
  );
};

export default DoctorAppointments;