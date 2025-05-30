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
  TextField,
  DialogActions,
  MenuItem,
  Snackbar,
  Alert,
  DialogContentText,
  Box,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import CustomPagination from "../../CustomPagination.jsx";

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 6;
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    specialtyId: "",
    bio: "",
    image: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const fetchDoctors = () => {
    fetch("http://localhost:5000/doctors")
      .then((res) => res.json())
      .then((data) => setDoctors(data))
      .catch(() =>
        setSnackbar({
          open: true,
          severity: "error",
          message: "Failed to load doctors",
        })
      );
  };

  const fetchSpecialties = () => {
    fetch("http://localhost:5000/specialties")
      .then((res) => res.json())
      .then((data) => setSpecialties(data))
      .catch(() =>
        setSnackbar({
          open: true,
          severity: "error",
          message: "Failed to load specialties",
        })
      );
  };

  useEffect(() => {
    fetchDoctors();
    fetchSpecialties();
  }, []);

  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = doctors.slice(indexOfFirstDoctor, indexOfLastDoctor);
  const totalPages = Math.ceil(doctors.length / doctorsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleOpenAdd = () => {
    setEditingDoctor(null);
    setForm({
      fullName: "",
      email: "",
      phone: "",
      specialtyId: "",
      bio: "",
      image: "",
    });
    setOpenDialog(true);
  };

  const handleOpenEdit = (doctor) => {
    setEditingDoctor(doctor);
    setForm({
      fullName: doctor.fullName || "",
      email: doctor.email || "",
      phone: doctor.phone || "",
      specialtyId: doctor.specialtyId || "",
      bio: doctor.bio || "",
      image: doctor.image || "",
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
    const method = editingDoctor ? "PUT" : "POST";
    const url = editingDoctor
      ? `http://localhost:5000/doctors/${editingDoctor.id}`
      : "http://localhost:5000/doctors";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error saving doctor");
        return res.json();
      })
      .then(() => {
        fetchDoctors();
        handleClose();
        setSnackbar({
          open: true,
          severity: "success",
          message: editingDoctor
            ? "Doctor updated successfully"
            : "Doctor added successfully",
        });
      })
      .catch(() =>
        setSnackbar({
          open: true,
          severity: "error",
          message: "Failed to save doctor",
        })
      );
  };

  const handleDeleteClick = (doctor) => {
    setDoctorToDelete(doctor);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    fetch(`http://localhost:5000/doctors/${doctorToDelete.id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Delete failed");
        fetchDoctors();
        setConfirmOpen(false);
        setDoctorToDelete(null);
        setSnackbar({
          open: true,
          severity: "success",
          message: "Doctor deleted successfully",
        });
      })
      .catch(() =>
        setSnackbar({
          open: true,
          severity: "error",
          message: "Failed to delete doctor",
        })
      );
  };

  const handleCancelDelete = () => {
    setConfirmOpen(false);
    setDoctorToDelete(null);
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
          Doctors
        </Typography>
        <Box textAlign="center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenAdd}
            sx={{ mb: 3 }}
          >
            Add Doctor
          </Button>
        </Box>

        <Grid container spacing={2}>
          {currentDoctors.map((doc) => (
            <Grid item xs={12} sm={6} md={4} key={doc.id}>
              <Card>
                <CardContent
                  sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                >
                  <Typography variant="h6">{doc.fullName}</Typography>
                  <Typography color="text.secondary">
                    {specialties.find((s) => s.id === doc.specialtyId)?.name ||
                      "No Specialty"}
                  </Typography>
                  <Typography>{doc.email}</Typography>
                  <Typography>{doc.phone}</Typography>
                  <Typography>{doc.bio}</Typography>
                  <div
                    style={{ display: "flex", gap: "8px", marginTop: "8px" }}
                  >
                    <Button
                      variant="outlined"
                      size="small"
                      color="primary"
                      component={Link}
                      to={`/admin/doctors/${doc.id}`}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleOpenEdit(doc)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      onClick={() => handleDeleteClick(doc)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {doctors.length > doctorsPerPage && (
          <CustomPagination
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}

        <Dialog open={openDialog} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>
            {editingDoctor ? "Edit Doctor" : "Add Doctor"}
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
              select
              label="Specialty"
              name="specialtyId"
              value={form.specialtyId}
              onChange={handleChange}
              fullWidth
            >
              {specialties.map((spec) => (
                <MenuItem key={spec.id} value={spec.id}>
                  {spec.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Bio"
              name="bio"
              value={form.bio}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
            />
            <TextField
              label="Image URL"
              name="image"
              value={form.image}
              onChange={handleChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={handleSave}>
              {editingDoctor ? "Update" : "Add"}
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
              Are you sure you want to delete doctor{" "}
              <strong>{doctorToDelete?.fullName}</strong>?
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

export default DoctorsList;
