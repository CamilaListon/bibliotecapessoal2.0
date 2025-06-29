import express from 'express'
import conexao from '../conexao/conexao.js';






const app = express()

app.use(express.json())

//criar rota

app.get('/usuario', (req, res) => {
    const sql = "SELECT * FROM usuario"
    conexao.query(sql, (erro, resultado) => {
        if (erro) {
            console.log(erro)
        } else {
            res.status(200).json(resultado)
        }
    })
})

app.post('/usuario', (req, res) => {
    const usuario = req.body
    const sql = "INSERT INTO usuario SET ?"
    conexao.query(sql, usuario, (erro, resultado) => {
        if (erro) {
            console.log(erro)
        } else {
            res.status(200).json(resultado)
        }
    })
})

export default app