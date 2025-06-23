import React, { useState } from 'react'
import './CadastroLivro.css'
import { useNavigate } from 'react-router-dom'

function CadastroLivro() {
  const [formData, setFormData] = useState({
    nome: '',
    isbn: '',
    genero: '',
    autor: '',
    editora: '',
    tipoLeitura: '',
    valor: '',
    status: '',
    nota: '',
    comentario: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const navigate = useNavigate()

  const voltar = () => {
    navigate('/secoes')
  }

  const logout = () => {
    localStorage.removeItem('usuarioLogado')
  navigate('/')
  }


  const handleSubmit = (e) => {
  e.preventDefault()

  const livros = JSON.parse(localStorage.getItem('livros')) || []

  const novoLivro = { ...formData }

  livros.push(novoLivro)

  localStorage.setItem('livros', JSON.stringify(livros))

  navigate('/listalivros')
}


  return (
    <div className="cadastro-livro-container">
        <div className="topo-sair">
            <button className="botao-sair" onClick={logout}>Sair</button>
        </div>
      <h1>Cadastro de Livro</h1>
      <form className="form-livro" onSubmit={handleSubmit}>
        <div className="coluna">
          <label>
            Título do Livro
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder='Ex.: Harry Potter'
              required
            />
          </label>

          <label>
            ISBN
            <input
              type="text"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              placeholder='Ex.: 978-3-16-148410-0'
            />
          </label>

          <label>
            Gênero
            <input
              type="text"
              name="genero"
              value={formData.genero}
              onChange={handleChange}
              placeholder='Suspense, romance...'
            />
          </label>

          <label>
            Autor
            <input
              type="text"
              name="autor"
              value={formData.autor}
              onChange={handleChange}
              placeholder='Nome do(s) Autor(es)'
              required
            />
          </label>

          <label>
            Editora
            <input
              type="text"
              name="editora"
              value={formData.editora}
              onChange={handleChange}
              placeholder='Nome da Editora'
              required
            />
          </label>
        </div>

        <div className="coluna">
            <label>
            Tipo de Leitura
            <select
                name="tipoLeitura"
                value={formData.tipoLeitura}
                onChange={handleChange}
                required
            >
                <option value="">Selecione...</option>
                <option value="Físico">Físico</option>
                <option value="Digital">Digital</option>
            </select>
            </label>
          <label>
            Valor
            <input
              type="number"
              name="valor"
              step="0.01"
              value={formData.valor}
              onChange={handleChange}
              placeholder='50'
            />
          </label>

          <label>
            Status
            <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
            >
                <option value="">Selecione</option>
                <option value="Lido">Lido</option>
                <option value="Não Lido">Não Lido</option>
                <option value="Abandonado">Abandonado</option>
                <option value="Lista de Desejos">Lista de Desejos</option>
            </select>
            </label>

          <label>
            Nota
            <input
              type="number"
              name="nota"
              min="0"
              max="10"
              step="0.1"
              value={formData.nota}
              onChange={handleChange}
            />
          </label>

          <label>
            Comentário
            <textarea
              name="comentario"
              value={formData.comentario}
              onChange={handleChange}
              rows="3"
              placeholder='O que você achou do livro?'
            />
          </label>
        </div>

        <div className="botao-voltar">
            <button type="button" onClick={voltar}>VOLTAR</button>
        </div>

        <div className="botao-cadastrar">
          <button type="submit">CADASTRAR</button>
        </div>
      </form>
    </div>
  )
}

export default CadastroLivro
