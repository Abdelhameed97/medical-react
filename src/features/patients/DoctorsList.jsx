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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

const DoctorsList = () => {
  // Mock static data
  const doctorData = [
    {
      id: 1,
      name: "Dr. Amina Khaled",
      specialty: "Cardiology",
      bio: "Specialist in cardiovascular diseases with 10 years of experience.",
      email: "amina.khaled@example.com",
    },
    {
      id: 2,
      name: "Dr. Omar Tarek",
      specialty: "Dermatology",
      bio: "Expert in skincare and laser treatments.",
      email: "omar.tarek@example.com",
    },
    {
      id: 3,
      name: "Dr. Fatma Adel",
      specialty: "Pediatrics",
      bio: "Caring pediatrician for children’s health and wellbeing.",
      email: "fatma.adel@example.com",
    },
    {
      id: 4,
      name: "Dr. Youssef Hassan",
      specialty: "Neurology",
      bio: "Consultant neurologist with deep expertise in brain and nerve disorders.",
      email: "youssef.hassan@example.com",
    },
  ];

  const specialtyOptions = [
    "Cardiology",
    "Dermatology",
    "Pediatrics",
    "Neurology",
  ];

  const [doctors, setDoctors] = useState(doctorData);
  const [filteredDoctors, setFilteredDoctors] = useState(doctorData);
  const [searchName, setSearchName] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("");

  useEffect(() => {
    const filtered = doctors.filter((doctor) => {
      const matchesName = doctor.name
        .toLowerCase()
        .includes(searchName.toLowerCase());
      const matchesSpecialty =
        !specialtyFilter ||
        doctor.specialty.toLowerCase() === specialtyFilter.toLowerCase();
      return matchesName && matchesSpecialty;
    });
    setFilteredDoctors(filtered);
  }, [searchName, specialtyFilter, doctors]);

  return (
    <Box p={3}>
      <Typography variant='h4' gutterBottom>
        Find a Doctor
      </Typography>

      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label='Search by name'
            variant='outlined'
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant='outlined'>
            <InputLabel>Specialty</InputLabel>
            <Select
              value={specialtyFilter}
              onChange={(e) => setSpecialtyFilter(e.target.value)}
              label='Specialty'
            >
              <MenuItem value=''>All Specialties</MenuItem>
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
          <Typography variant='body1' color='text.secondary' m={2}>
            No doctors found.
          </Typography>
        ) : (
          filteredDoctors.map((doctor) => (
            <Grid item xs={12} sm={6} md={4} key={doctor.id}>
              <Link
                to={`/patient/doctors/${doctor.id}`}
                style={{ textDecoration: "none" }}
              >
                <Card
                  sx={{
                    cursor: "pointer",
                    transition: "0.3s",
                    "&:hover": { boxShadow: 6 },
                  }}
                >
                  <CardContent>
                    <Typography variant='h6'>{doctor.name}</Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {doctor.specialty}
                    </Typography>
                    <Typography variant='body2'>{doctor.bio}</Typography>
                    <Typography variant='body2' color='primary'>
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
