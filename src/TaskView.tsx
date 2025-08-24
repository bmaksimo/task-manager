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

type Task = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
};

const TaskView: React.FC = () => {
    const [task, setTask] = useState<Task | null>(null);
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
            const response = await axios.get(
                `https://jsonplaceholder.typicode.com/todos/${id}`
            );
            setTask(response.data);
        } catch (err) {
            setError("Failed to fetch task. Please try again later.");
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
