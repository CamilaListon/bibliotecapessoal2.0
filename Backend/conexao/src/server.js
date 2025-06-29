import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';

const app = express();

const pool = mysql.createPool({
    host: 'shinkansen.proxy.rlwy.net',
    user: 'root',
    password: 'PuIeBxBGrsthFvEYMJVoKknkkhBFbHRi',
    database: 'railway',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    port: 11131
});

app.use(cors());
app.use(express.json());

app.get('/usuario', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM usuario');
        res.json(rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao buscar usuario' });
    }
});

app.get('/usuario/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM usuario WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.json(rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao buscar Usuário' });
    }
});

app.post('/usuario', async (req, res) => {
    const { nome, email, senha } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)',
            [nome, email, senha]
        );
        const [novoUsuario] = await pool.query('SELECT * FROM usuario WHERE id = ?', [result.insertId]);
        res.status(201).json(novoUsuario[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao adicionar Usuário' });
    }
});

app.put('/usuario/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE usuario SET nome = ?, email = ?, senha = ? WHERE id = ?',
            [nome, email, senha, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        const [usuarioAtualizado] = await pool.query('SELECT * FROM usuario WHERE id = ?', [id]);
        res.json(usuarioAtualizado[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao atualizar Usuário' });
    }
});

app.delete('/usuario/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM usuario WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.json({ message: 'Usuário deletado com sucesso' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao deletar Usuário' });
    }
});

// Rota fallback para rotas não encontradas
app.all('*', (req, res) => {
    res.status(404).send(`Rota não encontrada: ${req.method} ${req.url}`);
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
