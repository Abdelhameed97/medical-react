import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Grid,
  Card,
  CardContent,
  Typography,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import axios from "axios";

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const specialtyOptions = ["Cardiology", "Dermatology", "Pediatrics", "Neurology"];

  useEffect(() => {
    axios.get("http://localhost:5000/doctors")
      .then((res) => {
        setDoctors(res.data);
        setFilteredDoctors(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching doctors:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = doctors.filter((doctor) => {
      const matchesName = doctor.fullName.toLowerCase().includes(searchName.toLowerCase());
      const matchesSpecialty =
        !specialtyFilter ||
        doctor.specialty?.toLowerCase() === specialtyFilter.toLowerCase();
      return matchesName && matchesSpecialty;
    });
    setFilteredDoctors(filtered);
  }, [searchName, specialtyFilter, doctors]);

  if (loading) return <Box p={3}><CircularProgress /></Box>;

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>Find a Doctor</Typography>

      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Search by name"
            variant="outlined"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Specialty</InputLabel>
            <Select
              value={specialtyFilter}
              onChange={(e) => setSpecialtyFilter(e.target.value)}
              label="Specialty"
            >
              <MenuItem value="">All Specialties</MenuItem>
              {specialtyOptions.map((spec) => (
                <MenuItem key={spec} value={spec}>
                  {spec}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {filteredDoctors.length === 0 ? (
          <Typography variant="body1" color="text.secondary" m={2}>
            No doctors found.
          </Typography>
        ) : (
          filteredDoctors.map((doctor) => (
            <Grid item xs={12} sm={6} md={4} key={doctor.id}>
              <Link
                to={`/patient/doctors/${doctor.id}`}
                style={{ textDecoration: "none" }}
              >
                <Card sx={{ cursor: "pointer", "&:hover": { boxShadow: 6 } }}>
                  <CardContent>
                    <Typography variant="h6">{doctor.fullName}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {doctor.specialty}
                    </Typography>
                    <Typography variant="body2">{doctor.bio}</Typography>
                    <Typography variant="body2" color="primary">
                      {doctor.email}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default DoctorsList;
