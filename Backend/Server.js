const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // Update with your MySQL username
    password: '',      // Update with your MySQL password
    database: 'task',  // Update with your MySQL database name
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Database.');
});

// POST route to add a new task
app.post('/api/tasks', (req, res) => {
    const { name, description } = req.body;
    const query = 'INSERT INTO tasks (name, description) VALUES (?, ?)';

    db.query(query, [name, description], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Database error' });
        }
        res.status(201).json({ message: 'Task added successfully', taskId: results.insertId });
    });
});


// Endpoint to retrieve all tasks
app.get('/api/gettasks', (req, res) => {
    const query = 'SELECT * FROM tasks ORDER BY created_at DESC';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Database error' });
        }
        res.json(results);
    });
});


// Endpoint to delete a task by id
app.delete('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM tasks WHERE id = ?';
    
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Failed to delete task' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    });
});



// Endpoint to update a task
app.put('/api/updatetasks/:id', (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const query = 'UPDATE tasks SET name = ?, description = ? WHERE id = ?';
    
    db.query(query, [name, description, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Failed to update task' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task updated successfully' });
    });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
