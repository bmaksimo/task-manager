import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
    Paper,
    Button,
    Alert,
    Box,
    Typography,
    CircularProgress,
} from "@mui/material";
import { Task } from "./types/Task";

interface TaskWithUserId extends Task {
    userId: number;
}

const TaskView: React.FC = () => {
    const [task, setTask] = useState<TaskWithUserId | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) {
            fetchTask();
        }
    }, [id]);

    const fetchTask = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Validate ID
            if (!id || isNaN(Number(id))) {
                setError("Invalid task ID. Please check the URL and try again.");
                return;
            }
            
            const response = await axios.get(
                `https://jsonplaceholder.typicode.com/todos/${id}`
            );
            
            if (!response.data || !response.data.id) {
                setError("Task not found. The task may have been deleted or doesn't exist.");
                return;
            }
            
            setTask(response.data);
        } catch (err: any) {
            if (err.response?.status === 404) {
                setError("Task not found. The task may have been deleted or doesn't exist.");
            } else if (err.response?.status >= 500) {
                setError("Server error. Please try again later.");
            } else if (err.code === 'NETWORK_ERROR' || !err.response) {
                setError("Network error. Please check your internet connection and try again.");
            } else {
                setError("Failed to fetch task. Please try again later.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        navigate("/");
    };

    const handleEdit = () => {
        navigate(`/task/${id}/edit`);
    };

    if (loading) {
        return (
            <Paper sx={{ padding: 2, fontFamily: 'Roboto, sans-serif' }}>
                <CircularProgress />
            </Paper>
        );
    }

    if (error) {
        return (
            <Paper sx={{ padding: 2, fontFamily: 'Roboto, sans-serif' }}>
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
                <Button
                    variant="contained"
                    onClick={handleBack}
                    sx={{
                        background: 'linear-gradient(315deg, #2a2a72, #009ffd)',
                        '&:hover': {
                            background: 'linear-gradient(315deg, #1e1e5c, #007acc)',
                        },
                    }}
                >
                    Back
                </Button>
            </Paper>
        );
    }

    if (!task) {
        return (
            <Paper sx={{ padding: 2, fontFamily: 'Roboto, sans-serif' }}>
                <Alert severity="error">Task not found</Alert>
            </Paper>
        );
    }

    return (
        <Paper sx={{ padding: 2, fontFamily: 'Roboto, sans-serif' }}>
            <Typography variant="h4" gutterBottom>
                Task Details
            </Typography>

            <Box sx={{ mb: 3 }}>
                <Typography variant="body1" sx={{ mb: 2 }}>
                    <strong>ID:</strong> {task.id}
                </Typography>
                
                <Typography variant="body1" sx={{ mb: 2 }}>
                    <strong>Title:</strong> {task.title}
                </Typography>
                
                <Typography variant="body1" sx={{ mb: 2 }}>
                    <strong>Status:</strong> {task.completed ? "Yes" : "No"}
                </Typography>
                
                <Typography variant="body1" sx={{ mb: 2 }}>
                    <strong>User ID:</strong> {task.userId}
                </Typography>
                
                <Typography variant="body1" sx={{ mb: 2 }}>
                    <strong>Created At:</strong> {new Date().toLocaleString()}
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                    variant="contained"
                    onClick={handleBack}
                    sx={{
                        background: 'linear-gradient(315deg, #2a2a72, #009ffd)',
                        '&:hover': {
                            background: 'linear-gradient(315deg, #1e1e5c, #007acc)',
                        },
                    }}
                >
                    Back
                </Button>
                
                <Button
                    variant="contained"
                    onClick={handleEdit}
                    sx={{
                        background: 'linear-gradient(315deg, #2a2a72, #009ffd)',
                        '&:hover': {
                            background: 'linear-gradient(315deg, #1e1e5c, #007acc)',
                        },
                    }}
                >
                    Edit
                </Button>
            </Box>
        </Paper>
    );
}

export default TaskView;
