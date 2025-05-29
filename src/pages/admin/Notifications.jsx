import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Divider,
    Paper,
    CircularProgress,
    Button,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:5000/notifications")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch notifications");
                return res.json();
            })
            .then((data) => {
                setNotifications(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading)
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                <CircularProgress color="primary" />
            </Box>
        );

    if (error)
        return (
            <Typography
                variant="h6"
                color="error"
                sx={{ textAlign: "center", mt: 5 }}
            >
                {error}
            </Typography>
        );

    return (
        <>
            <Paper
                elevation={6}
                sx={{
                    p: 3,
                    maxWidth: 650,
                    mx: "auto",
                    mt: 4,
                    borderRadius: 3,
                    bgcolor: "background.paper",
                }}
            >
                <Typography
                    variant="h5"
                    gutterBottom
                    fontWeight="bold"
                    color="primary"
                    sx={{ mb: 2 }}
                >
                    Notifications
                </Typography>

                <List>
                    {notifications.map(({ id, message, email, status }) => (
                        <React.Fragment key={id}>
                            <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                                <ListItemAvatar>
                                    <Avatar
                                        sx={{
                                            bgcolor:
                                                status === "confirmed" ? "success.main" : "info.main",
                                        }}
                                    >
                                        {status === "confirmed" ? (
                                            <CheckCircleOutlineIcon />
                                        ) : (
                                            <EmailIcon />
                                        )}
                                    </Avatar>
                                </ListItemAvatar>

                                <ListItemText
                                    primary={
                                        <Typography
                                            variant="body1"
                                            sx={{ fontWeight: "600" }}
                                            color="text.primary"
                                        >
                                            {message}
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mt: 0.5 }}
                                        >
                                            Email: {email}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                            {id !== notifications.length && <Divider component="li" />}
                        </React.Fragment>
                    ))}
                </List>
            </Paper>

            <Box sx={{ mt: 3, textAlign: "center" }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate("/admin")}
                >
                    Back to Dashboard
                </Button>
            </Box>
        </>
    );
};

export default Notifications;
