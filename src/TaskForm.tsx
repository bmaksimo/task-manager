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

type Task = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
};

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
            const response = await axios.get(
                `https://jsonplaceholder.typicode.com/todos/${id}`
            );
            const task: Task = response.data;
            setTitle(task.title);
            setCompleted(task.completed);
        } catch (err) {
            setError("Failed to fetch task. Please try again later.");
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
        } catch (err) {
            setError(`Failed to edit task. Please try again.`);
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
