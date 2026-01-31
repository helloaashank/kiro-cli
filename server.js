const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('.'));
app.use(express.json());

let storage = [];

app.post('/upload', upload.single('file'), (req, res) => {
    const item = {
        type: 'file',
        name: req.file.originalname,
        path: req.file.path,
        timestamp: new Date().toISOString()
    };
    storage.push(item);
    res.json({ success: true });
});

app.post('/text', (req, res) => {
    const item = {
        type: 'text',
        content: req.body.content,
        timestamp: new Date().toISOString()
    };
    storage.push(item);
    res.json({ success: true });
});

app.get('/storage', (req, res) => {
    res.json(storage);
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
