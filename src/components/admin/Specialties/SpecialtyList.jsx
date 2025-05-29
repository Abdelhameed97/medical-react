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
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const SpecialtiesList = () => {
  const [specialties, setSpecialties] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingSpecialty, setEditingSpecialty] = useState(null);
  const [name, setName] = useState("");

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);

  const fetchSpecialties = () => {
    fetch("http://localhost:5000/specialties")
      .then((res) => res.json())
      .then((data) => setSpecialties(data));
  };

  useEffect(() => {
    fetchSpecialties();
  }, []);

  const handleOpenAdd = () => {
    setEditingSpecialty(null);
    setName("");
    setOpenDialog(true);
  };

  const handleOpenEdit = (specialty) => {
    setEditingSpecialty(specialty);
    setName(specialty.name);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSave = () => {
    const method = editingSpecialty ? "PUT" : "POST";
    const url = editingSpecialty
      ? `http://localhost:5000/specialties/${editingSpecialty.id}`
      : "http://localhost:5000/specialties";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error saving specialty");
        return res.json();
      })
      .then(() => {
        fetchSpecialties();
        handleClose();
        showSnackbar(
          editingSpecialty
            ? "Specialty updated successfully!"
            : "Specialty added successfully!"
        );
      })
      .catch((err) => {
        showSnackbar(err.message, "error");
      });
  };

  const handleDeleteClick = (specialty) => {
    setSelectedSpecialty(specialty);
    setOpenConfirmDialog(true);
  };

  const handleConfirmDelete = () => {
    fetch(`http://localhost:5000/specialties/${selectedSpecialty.id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error deleting specialty");
        fetchSpecialties();
        setOpenConfirmDialog(false);
        showSnackbar("Specialty deleted successfully!");
      })
      .catch((err) => {
        showSnackbar(err.message, "error");
        setOpenConfirmDialog(false);
      });
  };

  const handleCancelDelete = () => {
    setOpenConfirmDialog(false);
    setSelectedSpecialty(null);
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Specialties
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenAdd}
        sx={{ mb: 3 }}
      >
        Add Specialty
      </Button>
      <Grid container spacing={2}>
        {specialties.map((spec) => (
          <Grid item xs={12} sm={6} md={4} key={spec.id}>
            <Card>
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography>{spec.name}</Typography>
                <div>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenEdit(spec)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteClick(spec)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>
          {editingSpecialty ? "Edit Specialty" : "Add Specialty"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Specialty Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            {editingSpecialty ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog open={openConfirmDialog} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this specialty?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
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

export default SpecialtiesList;
