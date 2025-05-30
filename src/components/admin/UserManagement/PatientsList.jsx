import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import CustomPagination from "../../CustomPagination.jsx";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    age: "",
    gender: "",
    notes: "",
  });
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 6;
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const fetchPatients = () => {
    fetch("http://localhost:5000/patients")
      .then((res) => res.json())
      .then((data) => setPatients(data))
      .catch(() =>
        setSnackbar({
          open: true,
          severity: "error",
          message: "Failed to load patients",
        })
      );
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = patients.slice(
    indexOfFirstPatient,
    indexOfLastPatient
  );
  const totalPages = Math.ceil(patients.length / patientsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleOpenAdd = () => {
    setEditingPatient(null);
    setForm({
      fullName: "",
      email: "",
      phone: "",
      address: "",
      age: "",
      gender: "",
      notes: "",
    });
    setOpenDialog(true);
  };

  const handleOpenEdit = (patient) => {
    setEditingPatient(patient);
    setForm({
      fullName: patient.fullName || "",
      email: patient.email || "",
      phone: patient.phone || "",
      address: patient.address || "",
      age: patient.age || "",
      gender: patient.gender || "",
      notes: patient.notes || "",
    });
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    const method = editingPatient ? "PUT" : "POST";
    const url = editingPatient
      ? `http://localhost:5000/patients/${editingPatient.id}`
      : "http://localhost:5000/patients";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error saving patient");
        return res.json();
      })
      .then(() => {
        fetchPatients();
        handleClose();
        setSnackbar({
          open: true,
          severity: "success",
          message: editingPatient
            ? "Patient updated successfully"
            : "Patient added successfully",
        });
      })
      .catch(() =>
        setSnackbar({
          open: true,
          severity: "error",
          message: "Failed to save patient",
        })
      );
  };

  const handleDeleteClick = (patient) => {
    setPatientToDelete(patient);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    fetch(`http://localhost:5000/patients/${patientToDelete.id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Delete failed");
        fetchPatients();
        setConfirmOpen(false);
        setPatientToDelete(null);
        setSnackbar({
          open: true,
          severity: "success",
          message: "Patient deleted successfully",
        });
      })
      .catch(() =>
        setSnackbar({
          open: true,
          severity: "error",
          message: "Failed to delete patient",
        })
      );
  };

  const handleCancelDelete = () => {
    setConfirmOpen(false);
    setPatientToDelete(null);
  };

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <>
      <Container sx={{ py: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          color="primary"
          textAlign="center"
        >
          Patients
        </Typography>
        <Box textAlign="center" sx={{ mb: 3 }}>

          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenAdd}
            sx={{ mb: 3 }}
          >
            Add Patient
          </Button>
        </Box>
        <Grid container spacing={2}>
          {currentPatients.map((patient) => (
            <Grid item xs={12} sm={6} md={4} key={patient.id}>
              <Card>
                <CardContent
                  sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                >
                  <Typography variant="h6">{patient.fullName}</Typography>
                  <Typography color="text.secondary">
                    {patient.email}
                  </Typography>
                  <Typography>{patient.phone}</Typography>
                  <Typography>{patient.address}</Typography>
                  <Typography>Age: {patient.age}</Typography>
                  <Typography>Gender: {patient.gender}</Typography>
                  <Typography>{patient.notes}</Typography>
                  <div
                    style={{ display: "flex", gap: "8px", marginTop: "8px" }}
                  >
                    <Button
                      variant="outlined"
                      size="small"
                      color="primary"
                      component={Link}
                      to={`/admin/patients/${patient.id}`}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleOpenEdit(patient)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      onClick={() => handleDeleteClick(patient)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {patients.length > patientsPerPage && (
          <CustomPagination
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}

        <Dialog open={openDialog} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>
            {editingPatient ? "Edit Patient" : "Add Patient"}
          </DialogTitle>
          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
          >
            <TextField
              label="Full Name"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Address"
              name="address"
              value={form.address}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Age"
              name="age"
              type="number"
              value={form.age}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Gender"
              name="gender"
              value={form.gender}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Notes"
              name="notes"
              multiline
              rows={3}
              value={form.notes}
              onChange={handleChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={handleSave}>
              {editingPatient ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={confirmOpen}
          onClose={handleCancelDelete}
          aria-labelledby="confirm-dialog-title"
          aria-describedby="confirm-dialog-description"
        >
          <DialogTitle id="confirm-dialog-title">Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText id="confirm-dialog-description">
              Are you sure you want to delete patient{" "}
              <strong>{patientToDelete?.fullName}</strong>?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelDelete} color="primary">
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDelete}
              color="error"
              variant="contained"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>

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
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Button variant="contained" onClick={() => navigate("/admin")}>
          Back to Dashboard
        </Button>
      </Box>
    </>
  );
};

export default PatientList;
