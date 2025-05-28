import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [formData, setFormData] = useState({
    doctorName: "",
    patientName: "",
    date: "",
    time: "",
    notes: "",
  });
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const fetchAppointments = () => {
    fetch("http://localhost:3030/appointments")
      .then((res) => res.json())
      .then((data) => setAppointments(data))
      .catch((err) =>
        showSnackbar("Failed to fetch appointments: " + err.message, "error")
      );
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // تم توحيد showSnackbar لتظهر رسائل مثل الـ SpecialtiesList
  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleOpenAdd = () => {
    setEditingAppointment(null);
    setFormData({
      doctorName: "",
      patientName: "",
      date: "",
      time: "",
      notes: "",
    });
    setOpenDialog(true);
  };

  const handleOpenEdit = (appointment) => {
    setEditingAppointment(appointment);
    setFormData({
      doctorName: appointment.doctorName || appointment.doctor || "",
      patientName: appointment.patientName || appointment.patient || "",
      date: appointment.date || "",
      time: appointment.time || "",
      notes: appointment.notes || "",
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (
      !formData.doctorName ||
      !formData.patientName ||
      !formData.date ||
      !formData.time
    ) {
      showSnackbar("Please fill in all required fields", "error");
      return;
    }

    const method = editingAppointment ? "PUT" : "POST";
    const url = editingAppointment
      ? `http://localhost:3030/appointments/${editingAppointment.id}`
      : "http://localhost:3030/appointments";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error saving appointment");
        return res.json();
      })
      .then(() => {
        fetchAppointments();
        setOpenDialog(false);
        showSnackbar(
          editingAppointment
            ? "Appointment updated successfully!"
            : "Appointment added successfully!"
        );
      })
      .catch((err) => showSnackbar(err.message, "error"));
  };

  const handleDelete = (appointment) => {
    setSelectedAppointment(appointment);
    setOpenConfirmDialog(true);
  };

  const handleConfirmDelete = () => {
    fetch(`http://localhost:3030/appointments/${selectedAppointment.id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error deleting appointment");
        fetchAppointments();
        setOpenConfirmDialog(false);
        showSnackbar("Appointment deleted successfully!");
      })
      .catch((err) => {
        showSnackbar(err.message, "error");
        setOpenConfirmDialog(false);
      });
  };

  const handleCancelDelete = () => {
    setOpenConfirmDialog(false);
    setSelectedAppointment(null);
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        All Appointments
      </Typography>

      <Box textAlign="center" sx={{ mb: 3 }}>
        <Button variant="contained" color="primary" onClick={handleOpenAdd}>
          Add Appointment
        </Button>
      </Box>

      <Grid container spacing={3}>
        {appointments.map((appointment) => (
          <Grid item xs={12} sm={6} md={4} key={appointment.id}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    Appointment #{appointment.id}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Doctor:</strong>{" "}
                    {appointment.doctorName || appointment.doctor || "N/A"}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Patient:</strong>{" "}
                    {appointment.patientName || appointment.patient || "N/A"}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Date:</strong> {appointment.date || "N/A"}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Time:</strong> {appointment.time || "N/A"}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    {appointment.notes || ""}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenEdit(appointment)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(appointment)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add/Edit Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingAppointment ? "Edit Appointment" : "Add Appointment"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Doctor Name"
            name="doctorName"
            fullWidth
            value={formData.doctorName}
            onChange={handleInputChange}
            required
          />
          <TextField
            margin="dense"
            label="Patient Name"
            name="patientName"
            fullWidth
            value={formData.patientName}
            onChange={handleInputChange}
            required
          />
          <TextField
            margin="dense"
            label="Date"
            name="date"
            type="date"
            fullWidth
            value={formData.date}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            margin="dense"
            label="Time"
            name="time"
            type="time"
            fullWidth
            value={formData.time}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            margin="dense"
            label="Notes"
            name="notes"
            fullWidth
            multiline
            rows={3}
            value={formData.notes}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            {editingAppointment ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog open={openConfirmDialog} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete appointment #
          <strong>{selectedAppointment?.id}</strong>?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AppointmentsList;
