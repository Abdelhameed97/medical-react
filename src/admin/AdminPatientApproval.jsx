import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Paper,
  Button,
  Chip,
  Stack,
} from "@mui/material";
import axios from "axios";

const API_URL = "http://localhost:5000";

export default function AdminPatientApproval() {
  const [patients, setPatients] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await axios.get(`${API_URL}/patients`);
      const updatedPatients = res.data.map((p) => ({
        ...p,
        approved: p.approved ?? false,
      }));
      setPatients(updatedPatients);
    } catch (err) {
      console.error("Error fetching patients", err);
    }
  };

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedPatients = patients.slice(startIndex, endIndex);
  const totalPages = Math.ceil(patients.length / pageSize);

  const toggleApproval = async (id, currentStatus) => {
    try {
      await axios.patch(`${API_URL}/patients/${id}`, {
        approved: !currentStatus,
      });
      fetchPatients();
    } catch (err) {
      console.error("Error updating approval", err);
    }
  };

  return (
    <Box sx={{ backgroundColor: "#F5F8FF", minHeight: "100vh", p: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: "24px" }}>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", mb: 3, color: "#199A8E", fontWeight: "bold" }}
        >
          Approve / Block Patients
        </Typography>

        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#199A8E" }}>
              <TableCell sx={{ color: "#fff" }}>Full Name</TableCell>
              <TableCell sx={{ color: "#fff" }}>Email</TableCell>
              <TableCell sx={{ color: "#fff" }}>Phone</TableCell>
              <TableCell sx={{ color: "#fff" }}>Status</TableCell>
              <TableCell sx={{ color: "#fff" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedPatients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell>{patient.fullName}</TableCell>
                <TableCell>{patient.email || patient.contact}</TableCell>
                <TableCell>{patient.phone || patient.contact}</TableCell>
                <TableCell>
                  <Chip
                    label={patient.approved ? "Approved" : "Blocked"}
                    color={patient.approved ? "success" : "error"}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => toggleApproval(patient.id, patient.approved)}
                    sx={{
                      backgroundColor: patient.approved ? "#FF4D4D" : "#199A8E",
                      "&:hover": {
                        backgroundColor: patient.approved ? "#d13232" : "#157f76",
                      },
                    }}
                  >
                    {patient.approved ? "Block" : "Approve"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 3 }}>
          <Button
            variant="outlined"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
          >
            Previous
          </Button>
          <Typography variant="body1" sx={{ alignSelf: "center" }}>
            Page {page} of {totalPages}
          </Typography>
          <Button
            variant="outlined"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          >
            Next
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
