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
} from "@mui/material";

type Task = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
};

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
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
            } catch (err) {
                setError("Failed to fetch tasks. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    function handleView(id: number) {
        navigate(`/task/${id}`);
    }

    async function handleDelete(id: number) {
        try {
            setLoading(true);
            setError(null);
            await axios.delete(
                `https://jsonplaceholder.typicode.com/todos/${id}`
            );
            setTasks(tasks.filter(task => task.id !== id));
            console.log("Task deleted:", id);
        } catch (err) {
            setError("Failed to delete task. Please try again.");
            console.log("Error whith task delete id: ", id);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    return (
        <Paper sx={{ padding: 2, fontFamily: 'Roboto, sans-serif' }}>
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
                        {tasks.map((task) => (
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
                                        color="error"
                                        size="small"
                                        onClick={() => handleDelete(task.id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default TaskList;

