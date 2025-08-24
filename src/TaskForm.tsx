import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
    Paper,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
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

const TaskForm: React.FC = () => {
    const [title, setTitle] = useState<string>("");
    const [completed, setCompleted] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);

    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) {
            setIsEditMode(true);
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
                console.error("Invalid task ID:", id);
                return;
            }

            const response = await axios.get(
                `https://jsonplaceholder.typicode.com/todos/${id}`
            );

            if (!response.data || !response.data.id) {
                setError("Task not found. The task may have been deleted or doesn't exist.");
                console.error("Task not found:", response.data);
                return;
            }

            const task: TaskWithUserId = response.data;
            setTitle(task.title);
            setCompleted(task.completed);
        } catch (err: any) {
            if (err.response?.status === 404) {
                setError("Task not found. The task may have been deleted or doesn't exist.");
                console.error("Task not found (404):", err);
            } else if (err.response?.status >= 500) {
                setError("Server error. Please try again later.");
                console.error("Server error (500+):", err);
            } else if (err.code === 'NETWORK_ERROR' || !err.response) {
                setError("Network error. Please check your internet connection and try again.");
                console.error("Network error:", err);
            } else {
                setError("Failed to fetch task. Please try again later.");
                console.error("Failed to fetch task:", err);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        console.log("Save clicked");
        if (!title.trim()) {
            setError("Title is required");
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const taskData = {
                title: title.trim(),
                completed,
                userId: 1
            };


            await axios.post(
                `https://jsonplaceholder.typicode.com/todos`,
                taskData
            );
            navigate("/");
        } catch (err: any) {
            if (err.response?.status >= 500) {
                setError(`Server error. Failed to ${isEditMode ? 'update' : 'create'} task. Please try again later.`);
            } else if (err.code === 'NETWORK_ERROR' || !err.response) {
                setError(`Network error. Failed to ${isEditMode ? 'update' : 'create'} task. Please check your internet connection and try again.`);
            } else {
                setError(`Failed to ${isEditMode ? 'update' : 'create'} task. Please try again.`);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate("/");
        console.log("Cancel clicked");
    };

    const isTitleEmpty = !title.trim();

    if (loading && isEditMode && !title) {
        return (
            <Paper sx={{ padding: 2, fontFamily: 'Roboto, sans-serif' }}>
                <CircularProgress />
            </Paper>
        );
    }

    return (
        <Paper sx={{ padding: 2, fontFamily: 'Roboto, sans-serif' }}>
            <Typography variant="h4" gutterBottom>
                {isEditMode ? 'Edit Task' : 'Add New Task'}
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    fullWidth
                    error={isTitleEmpty && error === "Title is required"}
                    helperText={isTitleEmpty && error === "Title is required" ? "Title is required" : ""}
                />

                <FormControl fullWidth>
                    <InputLabel>Completed Status</InputLabel>
                    <Select
                        value={completed ? "Yes" : "No"}
                        label="Completed Status"
                        onChange={(e) => setCompleted(e.target.value === "Yes")}
                    >
                        <MenuItem value="No">No</MenuItem>
                        <MenuItem value="Yes">Yes</MenuItem>
                    </Select>
                </FormControl>

                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <Button
                        variant="contained"
                        onClick={handleSave}
                        disabled={isTitleEmpty || loading}
                        sx={{
                            background: 'linear-gradient(315deg, #2a2a72, #009ffd)',
                            '&:hover': {
                                background: 'linear-gradient(315deg, #1e1e5c, #007acc)',
                            },
                            '&:disabled': {
                                background: '#ccc',
                            },
                        }}
                    >
                        {loading ? <CircularProgress size={20} /> : 'Save'}
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleCancel}
                        sx={{
                            background: 'linear-gradient(315deg, #2a2a72, #009ffd)',
                            '&:hover': {
                                background: 'linear-gradient(315deg, #1e1e5c, #007acc)',
                            },
                        }}
                    >
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
};

export default TaskForm;
