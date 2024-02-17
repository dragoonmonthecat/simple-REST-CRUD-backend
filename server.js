const express = require('express');
const pool = require('./connection');

const app = express();
const PORT = 8080;

app.use(express.json());

/**
 * GET /
 * GET /:id
 * POST /
 * PUT /:id
 * DELETE /:id
 */

// GET /
app.get('/', async (req, res) => {
    const data = await pool.query('SELECT * FROM test_table');
    res.send(data.rows);
});

// GET /:id
app.get('/:id', async (req, res) => {
    console.log(req.params);
    const { id } = req.params;
    const data = await pool.query('SELECT * FROM test_table WHERE id=$1', [id]);
    res.send(data.rows);
});

// POST /
app.post('/', async (req, res) => {
    const { description } = req.body;
    console.log(description)
    await pool.query('INSERT INTO test_table (description) VALUES ($1)', [description]);
    res.send(`sent value ${description}`);
});

// PUT /:id
app.put('/:id', async (req, res) => {
    console.log(req.params);
    const { id } = req.params;
    const { description } = req.body;
    await pool.query('UPDATE test_table SET description=$1 WHERE id=$2', [description, id]);

    res.send('updated');
});

// DELETE /:id
app.delete('/:id', async (req, res) => {
    console.log(req.params);
    const { id } = req.params;
    await pool.query('DELETE FROM test_table WHERE id=$1', [id]);

    res.send('deleted');
});


app.listen(PORT, () => console.log('listening on port' + PORT));