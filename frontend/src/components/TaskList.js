import React, { useState, useEffect } from 'react';
import { 
    Container, 
    Box,
    Paper,
    IconButton, 
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    Card,
    CardContent,
    Grid,
    Select,
    FormControl,
    InputLabel
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Add as AddIcon } from '@mui/icons-material';
import * as taskService from '../services/taskService';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState({ title: '', description: '', status: 'pending' });
    const [isEditing, setIsEditing] = useState(false);

    const fetchTasks = async () => {
        try {
            const response = await taskService.getAllTasks();
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleOpen = (task = { title: '', description: '', status: 'pending' }) => {
        setCurrentTask(task);
        setIsEditing(!!task.id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentTask({ title: '', description: '', status: 'pending' });
        setIsEditing(false);
    };

    const handleSubmit = async () => {
        try {
            if (isEditing) {
                await taskService.updateTask(currentTask.id, currentTask);
            } else {
                await taskService.createTask(currentTask);
            }
            fetchTasks();
            handleClose();
        } catch (error) {
            console.error('Error saving task:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await taskService.deleteTask(id);
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleChange = (e) => {
        setCurrentTask({
            ...currentTask,
            [e.target.name]: e.target.value
        });
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'completed': return '#4caf50';
            case 'in_progress': return '#FF6B00';
            default: return '#1E3A8A';
        }
    };

    return (
        <Box sx={{ 
            minHeight: '100vh', 
            backgroundColor: '#f5f5f5', 
            py: 4 
        }}>
            <Container maxWidth="md">
                <Paper elevation={0} sx={{ 
                    p: 4, 
                    backgroundColor: 'transparent'
                }}>
                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        mb: 4 
                    }}>
                        <Typography variant="h4" sx={{ 
                            fontWeight: 'bold',
                            color: '#1E3A8A'
                        }}>
                            Task Manager
                        </Typography>
                        <Button 
                            variant="contained" 
                            startIcon={<AddIcon />}
                            onClick={() => handleOpen()}
                            sx={{
                                backgroundColor: '#FF8534',
                                '&:hover': {
                                    backgroundColor: '#FF6B00'
                                }
                            }}
                        >
                            Add Task
                        </Button>
                    </Box>

                    <Grid container spacing={3}>
                        {tasks.map((task) => (
                            <Grid item xs={12} key={task.id}>
                                <Card sx={{ 
                                    borderRadius: 2,
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                    '&:hover': {
                                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                                    }
                                }}>
                                    <CardContent>
                                        <Box sx={{ 
                                            display: 'flex', 
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start'
                                        }}>
                                            <Box sx={{ flex: 1, pr: 2 }}>
                                                <Typography variant="h6" sx={{ mb: 1, color: '#1E3A8A' }}>
                                                    {task.title}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {task.description}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                gap: 1,
                                                flexShrink: 0
                                            }}>
                                                <Typography 
                                                    variant="caption" 
                                                    noWrap
                                                    sx={{ 
                                                        px: 2,
                                                        py: 0.5,
                                                        borderRadius: '20px',
                                                        backgroundColor: getStatusColor(task.status),
                                                        color: 'white',
                                                        minWidth: '90px',
                                                        textAlign: 'center',
                                                        display: 'inline-block',
                                                        textTransform: 'capitalize'
                                                    }}
                                                >
                                                    {task.status.replace('_', ' ')}
                                                </Typography>
                                                <IconButton 
                                                    onClick={() => handleOpen(task)}
                                                    size="small"
                                                    sx={{ 
                                                        color: '#757575',
                                                        '&:hover': {
                                                            color: '#424242'
                                                        }
                                                    }}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton 
                                                    onClick={() => handleDelete(task.id)}
                                                    size="small"
                                                    sx={{ 
                                                        color: '#757575',
                                                        '&:hover': {
                                                            color: '#424242'
                                                        }
                                                    }}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
            </Container>

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ color: '#1E3A8A' }}>
                    {isEditing ? 'Edit Task' : 'Add New Task'}
                </DialogTitle>
                <DialogContent sx={{ pt: 2 }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="title"
                        label="Task Title"
                        type="text"
                        fullWidth
                        value={currentTask.title}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        margin="dense"
                        name="description"
                        label="Description"
                        type="text"
                        fullWidth
                        multiline
                        rows={4}
                        value={currentTask.description}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />
                    <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select
                            name="status"
                            value={currentTask.status}
                            onChange={handleChange}
                            label="Status"
                        >
                            <MenuItem value="pending">Pending</MenuItem>
                            <MenuItem value="in_progress">In Progress</MenuItem>
                            <MenuItem value="completed">Completed</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 3 }}>
                    <Button onClick={handleClose} sx={{ color: '#1E3A8A' }}>
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleSubmit} 
                        variant="contained"
                        sx={{
                            backgroundColor: '#FF8534',
                            '&:hover': {
                                backgroundColor: '#FF6B00'
                            }
                        }}
                    >
                        {isEditing ? 'Update' : 'Create'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default TaskList;
