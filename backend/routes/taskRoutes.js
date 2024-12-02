const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM tasks ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single task
router.get('/:id', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM tasks WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create task
router.post('/', async (req, res) => {
    const { title, description, status } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)',
            [title, description, status]
        );
        const [newTask] = await db.query('SELECT * FROM tasks WHERE id = ?', [result.insertId]);
        res.status(201).json(newTask[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update task
router.put('/:id', async (req, res) => {
    const { title, description, status } = req.body;
    try {
        const [result] = await db.query(
            'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?',
            [title, description, status, req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }
        const [updatedTask] = await db.query('SELECT * FROM tasks WHERE id = ?', [req.params.id]);
        res.json(updatedTask[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete task
router.delete('/:id', async (req, res) => {
    try {
        const [result] = await db.query('DELETE FROM tasks WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
