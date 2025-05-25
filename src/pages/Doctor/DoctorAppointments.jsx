// import { useEffect, useState } from "react";
// import {
//   Typography, Paper, Box, Button, TextField, Grid,
//   Chip, Avatar, Divider, IconButton, Stack
// } from "@mui/material";
// import axios from "axios";
// import {
//   CheckCircle, Cancel, AccessTime, Edit, 
//   Person, CalendarToday, WatchLater, Notes,
//   Save, Close
// } from "@mui/icons-material";

// const DoctorAppointments = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [editingNotes, setEditingNotes] = useState(null);
//   const [tempNotes, setTempNotes] = useState("");

//   useEffect(() => {
//     axios.get("http://localhost:5000/appointments").then(res => {
//       setAppointments(res.data);
//     });
//   }, []);

//   const handleStatusChange = (id, status) => {
//     axios.patch(`http://localhost:5000/appointments/${id}`, { status })
//       .then(() => {
//         setAppointments(prev =>
//           prev.map(appt =>
//             appt.id === id ? { ...appt, status } : appt
//           )
//         );
//       });
//   };

//   const handleNoteChange = (id, note) => {
//     axios.patch(`http://localhost:5000/appointments/${id}`, { notes: note })
//       .then(() => {
//         setAppointments(prev =>
//           prev.map(appt =>
//             appt.id === id ? { ...appt, notes: note } : appt
//           )
//         );
//       });
//   };

//   const startEditing = (appt) => {
//     setEditingNotes(appt.id);
//     setTempNotes(appt.notes || "");
//   };

//   const saveNotes = (id) => {
//     handleNoteChange(id, tempNotes);
//     setEditingNotes(null);
//   };

//   const cancelEditing = () => {
//     setEditingNotes(null);
//   };

//   const getStatusChip = (status) => {
//     switch (status) {
//       case "approved":
//         return <Chip icon={<CheckCircle />} label="Approved" color="success" />;
//       case "rejected":
//         return <Chip icon={<Cancel />} label="Rejected" color="error" />;
//       default:
//         return <Chip icon={<AccessTime />} label="Pending" color="warning" />;
//     }
//   };

//   return (
//     <Box p={3} sx={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
//       <Typography variant="h4" gutterBottom sx={{ 
//         fontWeight: 'bold', 
//         color: '#1e293b',
//         mb: 4,
//         display: 'flex',
//         alignItems: 'center',
//         gap: 1
//       }}>
//         <CalendarToday fontSize="large" />
//         Appointments Management
//       </Typography>
      
//       <Grid container spacing={3}>
//         {appointments.map(appt => (
//           <Grid item xs={12} md={6} lg={4} key={appt.id}>
//             <Paper elevation={3} sx={{ 
//               p: 2.5, 
//               borderRadius: '12px',
//               borderLeft: `4px solid ${
//                 appt.status === 'approved' ? '#10b981' : 
//                 appt.status === 'rejected' ? '#ef4444' : '#f59e0b'
//               }`,
//               height: '100%'
//             }}>
//               <Stack direction="row" spacing={2} alignItems="center" mb={2}>
//                 <Avatar sx={{ bgcolor: '#3b82f6' }}>
//                   <Person />
//                 </Avatar>
//                 <Box>
//                   <Typography variant="h6" fontWeight="600">
//                     {appt.patientName}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Patient ID: {appt.patientId}
//                   </Typography>
//                 </Box>
//               </Stack>
              
//               <Divider sx={{ my: 2 }} />
              
//               <Box mb={2}>
//                 <Stack direction="row" spacing={1} alignItems="center" mb={1}>
//                   <CalendarToday color="primary" fontSize="small" />
//                   <Typography><strong>Date:</strong> {appt.date}</Typography>
//                 </Stack>
                
//                 <Stack direction="row" spacing={1} alignItems="center" mb={1}>
//                   <WatchLater color="primary" fontSize="small" />
//                   <Typography><strong>Time:</strong> {appt.time}</Typography>
//                 </Stack>
                
//                 <Stack direction="row" spacing={1} alignItems="center">
//                   {getStatusChip(appt.status)}
//                 </Stack>
//               </Box>
              
//               <Divider sx={{ my: 2 }} />
              
//               <Box mb={3}>
//                 <Typography variant="subtitle2" fontWeight="600" mb={1}>
//                   <Notes fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
//                   Doctor's Notes
//                 </Typography>
//                 {editingNotes === appt.id ? (
//                   <Box>
//                     <TextField
//                       multiline
//                       rows={3}
//                       variant="outlined"
//                       fullWidth
//                       value={tempNotes}
//                       onChange={(e) => setTempNotes(e.target.value)}
//                       autoFocus
//                       sx={{ mb: 1 }}
//                     />
//                     <Stack direction="row" spacing={1} justifyContent="flex-end">
//                       <Button
//                         variant="contained"
//                         size="small"
//                         startIcon={<Save />}
//                         onClick={() => saveNotes(appt.id)}
//                       >
//                         Save
//                       </Button>
//                       <Button
//                         variant="outlined"
//                         size="small"
//                         startIcon={<Close />}
//                         onClick={cancelEditing}
//                       >
//                         Cancel
//                       </Button>
//                     </Stack>
//                   </Box>
//                 ) : (
//                   <Paper variant="outlined" sx={{ p: 1.5, borderRadius: '8px' }}>
//                     <Typography>
//                       {appt.notes || "No notes added"}
//                     </Typography>
//                     <IconButton 
//                       size="small" 
//                       onClick={() => startEditing(appt)}
//                       sx={{ float: 'right', mt: -1, mr: -1 }}
//                     >
//                       <Edit fontSize="small" />
//                     </IconButton>
//                   </Paper>
//                 )}
//               </Box>
              
//               <Stack direction="row" spacing={1} justifyContent="flex-end">
//                 <Button
//                   variant="contained"
//                   color="success"
//                   startIcon={<CheckCircle />}
//                   onClick={() => handleStatusChange(appt.id, "approved")}
//                   sx={{ textTransform: 'none' }}
//                 >
//                   Approve
//                 </Button>
//                 <Button
//                   variant="outlined"
//                   color="error"
//                   startIcon={<Cancel />}
//                   onClick={() => handleStatusChange(appt.id, "rejected")}
//                   sx={{ textTransform: 'none' }}
//                 >
//                   Reject
//                 </Button>
//               </Stack>
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default DoctorAppointments;


import { useEffect, useState } from "react";
import {
  Typography, Paper, Box, Button, TextField, Grid,
  Chip, Avatar, Divider, IconButton, Stack, Tabs, Tab
} from "@mui/material";
import axios from "axios";
import {
  CheckCircle, Cancel, AccessTime, Edit,
  Person, CalendarToday, WatchLater, Notes,
  Save, Close
} from "@mui/icons-material";
import dayjs from "dayjs";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [editingNotes, setEditingNotes] = useState(null);
  const [tempNotes, setTempNotes] = useState("");
  const [tab, setTab] = useState(0);

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
        return <Chip icon={<CheckCircle />} label="Approved" color="success" size="small" sx={{ fontSize: '0.8rem' }} />;
      case "rejected":
        return <Chip icon={<Cancel />} label="Rejected" color="error" size="small" sx={{ fontSize: '0.8rem' }} />;
      default:
        return <Chip icon={<AccessTime />} label="Pending" color="warning" size="small" sx={{ fontSize: '0.8rem' }} />;
    }
  };

  const now = dayjs();
  const upcomingAppointments = appointments.filter(appt =>
    dayjs(`${appt.date} ${appt.time}`).isAfter(now)
  );
  const pastAppointments = appointments.filter(appt =>
    dayjs(`${appt.date} ${appt.time}`).isBefore(now)
  );

  const renderAppointmentCard = (appt) => (
    <Grid item xs={12} sm={6} md={4} key={appt.id}>
      <Paper elevation={2} sx={{
        p: 2,
        borderRadius: '8px',
        borderLeft: `3px solid ${
          appt.status === 'approved' ? '#10b981' :
            appt.status === 'rejected' ? '#ef4444' : '#f59e0b'
        }`,
        height: '100%',
        position: 'relative'
      }}>
        <Stack direction="row" spacing={1.5} alignItems="center" mb={1.5}>
          <Avatar sx={{ 
            width: 40, 
            height: 40,
            bgcolor: '#3b82f6',
            fontSize: '1rem'
          }}>
            <Person fontSize="small" />
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight="600" sx={{ fontSize: '0.9rem' }}>
              {appt.patientName}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
              Patient ID: {appt.patientId}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ my: 1.5 }} />

        <Box mb={1.5}>
          <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
            <CalendarToday color="primary" fontSize="small" sx={{ fontSize: '0.8rem' }} />
            <Typography variant="body2" sx={{ fontSize: '0.85rem' }}><strong>Date:</strong> {appt.date}</Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
            <WatchLater color="primary" fontSize="small" sx={{ fontSize: '0.8rem' }} />
            <Typography variant="body2" sx={{ fontSize: '0.85rem' }}><strong>Time:</strong> {appt.time}</Typography>
          </Stack>
          <Box sx={{ mt: 1 }}>
            {getStatusChip(appt.status)}
          </Box>
        </Box>

        <Divider sx={{ my: 1.5 }} />

        <Box mb={2}>
          <Typography variant="subtitle2" fontWeight="600" mb={0.5} sx={{ fontSize: '0.8rem' }}>
            <Notes fontSize="small" sx={{ 
              verticalAlign: 'middle', 
              mr: 0.5,
              fontSize: '0.8rem'
            }} />
            Doctor's Notes
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
                autoFocus
                size="small"
                sx={{ mb: 1 }}
              />
              <Stack direction="row" spacing={1} justifyContent="flex-end">
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<Save fontSize="small" />}
                  onClick={() => saveNotes(appt.id)}
                  sx={{ fontSize: '0.75rem' }}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<Close fontSize="small" />}
                  onClick={cancelEditing}
                  sx={{ fontSize: '0.75rem' }}
                >
                  Cancel
                </Button>
              </Stack>
            </Box>
          ) : (
            <Paper variant="outlined" sx={{ p: 1, borderRadius: '6px' }}>
              <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                {appt.notes || "No notes added"}
              </Typography>
              <IconButton
                size="small"
                onClick={() => startEditing(appt)}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  fontSize: '0.8rem'
                }}
              >
                <Edit fontSize="small" />
              </IconButton>
            </Paper>
          )}
        </Box>

        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <Button
            variant="contained"
            color="success"
            size="small"
            startIcon={<CheckCircle fontSize="small" />}
            onClick={() => handleStatusChange(appt.id, "approved")}
            sx={{ 
              textTransform: 'none',
              fontSize: '0.75rem',
              px: 1,
              py: 0.5
            }}
          >
            Approve
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            startIcon={<Cancel fontSize="small" />}
            onClick={() => handleStatusChange(appt.id, "rejected")}
            sx={{ 
              textTransform: 'none',
              fontSize: '0.75rem',
              px: 1,
              py: 0.5
            }} >
            Reject
          </Button>
        </Stack>
      </Paper>
    </Grid>
  );

  return (
    <Box p={2} sx={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <Typography variant="h5" gutterBottom sx={{
        fontWeight: 'bold',
        color: '#1e293b',
        mb: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}>
        <CalendarToday fontSize="medium" />
        Appointments Management
      </Typography>

      <Tabs
        value={tab}
        onChange={(e, newVal) => setTab(newVal)}
        indicatorColor="primary"
        textColor="primary"
        sx={{ 
          mb: 3,
          '& .MuiTab-root': {
            fontSize: '0.9rem',
            minHeight: 48,
            padding: '6px 12px'
          }
        }}
      >
        <Tab label="Upcoming" />
        <Tab label="Past" />
      </Tabs>

      {tab === 0 && (
        <Grid container spacing={2}>
          {upcomingAppointments.length ? (
            upcomingAppointments.map(renderAppointmentCard)
          ) : (
            <Typography variant="body2" sx={{ ml: 2, mt: 1 }}>
              No upcoming appointments.
            </Typography>
          )}
        </Grid>
      )}

      {tab === 1 && (
        <Grid container spacing={2}>
          {pastAppointments.length ? (
            pastAppointments.map(renderAppointmentCard)
          ) : (
            <Typography variant="body2" sx={{ ml: 2, mt: 1 }}>
              No past appointments.
            </Typography>
          )}
        </Grid>
      )}
    </Box>
  );
};

export default DoctorAppointments;