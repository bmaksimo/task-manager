import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Paper,
    CircularProgress,
    Alert,
    TextField,
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import { Task } from "./types/Task";

interface TaskWithUserId extends Task {
    userId: number;
}

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<TaskWithUserId[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchFilter, setSearchFilter] = useState<string>("");
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
    const [taskToDelete, setTaskToDelete] = useState<number | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await axios.get(
                    "https://jsonplaceholder.typicode.com/todos?_limit=10"
                );
                setTasks(response.data);
                console.log("Tasks fetched: " + response.data);
            } catch (err: any) {
                if (err.response?.status >= 500) {
                    setError("Server error. Please try again later.");
                } else if (err.code === 'NETWORK_ERROR' || !err.response) {
                    setError("Network error. Please check your internet connection and try again.");
                } else {
                    setError("Failed to fetch tasks. Please try again later.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    function handleView(id: number) {
        navigate(`/task/${id}`);
    }

    const handleDeleteClick = (id: number) => {
        setTaskToDelete(id);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (taskToDelete === null) return;

        try {
            setLoading(true);
            setError(null);
            await axios.delete(
                `https://jsonplaceholder.typicode.com/todos/${taskToDelete}`
            );
            setTasks(tasks.filter(task => task.id !== taskToDelete));
            console.log("Task deleted:", taskToDelete);
        } catch (err: any) {
            if (err.response?.status === 404) {
                setError("Task not found. It may have already been deleted.");
            } else if (err.response?.status >= 500) {
                setError("Server error. Failed to delete task. Please try again later.");
            } else if (err.code === 'NETWORK_ERROR' || !err.response) {
                setError("Network error. Failed to delete task. Please check your internet connection and try again.");
            } else {
                setError("Failed to delete task. Please try again.");
            }
            console.log("Error with task delete id: ", taskToDelete);
        } finally {
            setLoading(false);
            setDeleteDialogOpen(false);
            setTaskToDelete(null);
        }
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setTaskToDelete(null);
    };

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchFilter.toLowerCase())
    );

    return (
        <Paper sx={{ padding: 2, fontFamily: 'Roboto, sans-serif' }}>
            <Box sx={{ mb: 2 }}>
                <TextField
                    label="Search tasks by title"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    fullWidth
                    variant="outlined"
                />
            </Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ borderBottom: '1px solid #e0e0e0' }}>ID</TableCell>
                            <TableCell sx={{ borderBottom: '1px solid #e0e0e0' }}>Title</TableCell>
                            <TableCell sx={{ borderBottom: '1px solid #e0e0e0' }}>Status</TableCell>
                            <TableCell sx={{ borderBottom: '1px solid #e0e0e0' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredTasks.map((task) => (
                            <TableRow key={task.id}>
                                <TableCell sx={{ borderBottom: '1px solid #e0e0e0' }}>{task.id}</TableCell>
                                <TableCell sx={{ borderBottom: '1px solid #e0e0e0' }}>{task.title}</TableCell>
                                <TableCell sx={{ borderBottom: '1px solid #e0e0e0' }}>{task.completed ? "Yes" : "No"}</TableCell>
                                <TableCell sx={{ borderBottom: '1px solid #e0e0e0' }}>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={() => handleView(task.id)}
                                        sx={{ mr: 1 }}
                                    >
                                        View
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={() => navigate(`/task/${task.id}/edit`)}
                                        sx={{ mr: 1 }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        size="small"
                                        onClick={() => handleDeleteClick(task.id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog
                open={deleteDialogOpen}
                onClose={handleDeleteCancel}
            >
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this task?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleDeleteCancel}
                        sx={{
                            background: 'linear-gradient(315deg, #2a2a72, #009ffd)',
                            color: 'white',
                            '&:hover': {
                                background: 'linear-gradient(315deg, #1e1e5c, #007acc)',
                            },
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDeleteConfirm}
                        color="error"
                        variant="contained"
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={20} /> : 'Delete'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default TaskList;

