import React, { useState } from 'react'
import './CadastroLivro.css'
import { useNavigate } from 'react-router-dom'
import Header from '../Header/Header'

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
    comentario: '',
    paginas: ''  // <-- ADICIONE ISSO
  })


  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const navigate = useNavigate()

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
      <Header />
      <h1 className='titulo-cad-livro'>Cadastro de Livro</h1>

      <form className="form-livro" onSubmit={handleSubmit}>
        <div className="colunas">
          <div className="coluna">
            <div className="group-input">
              <label>Título do Livro</label>
              <input
                className="input-outline"
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Ex.: Harry Potter"
                required
              />
            </div>

            <div className="group-input">
              <label>ISBN</label>
              <input
                type="text"
                name="isbn"
                value={formData.isbn}
                onChange={handleChange}
                placeholder="Ex.: 978-3-16-148410-0"
              />
            </div>

            <div className="group-input">
              <label>Gênero</label>
              <input
                type="text"
                name="genero"
                value={formData.genero}
                onChange={handleChange}
                placeholder="Suspense, romance..."
              />
            </div>

            <div className="group-input">
              <label>Autor</label>
              <input
                type="text"
                name="autor"
                value={formData.autor}
                onChange={handleChange}
                placeholder="Nome do(s) Autor(es)"
                required
              />
            </div>

            <div className="group-input">
              <label>Editora</label>
              <input
                type="text"
                name="editora"
                value={formData.editora}
                onChange={handleChange}
                placeholder="Nome da Editora"
                required
              />
            </div>

            <div className="group-input">
              <label>Quantidade de Páginas</label>
              <input
                type="number"
                name="paginas"
                min="1"
                value={formData.paginas}
                onChange={handleChange}
                placeholder="Ex.: 320"
                required
              />
            </div>
          </div>

          <div className="coluna">
            <div className="group-input">
              <label>Tipo de Leitura</label>
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
            </div>

            <div className="group-input">
              <label>Valor</label>
              <input
                type="number"
                name="valor"
                step="0.01"
                value={formData.valor}
                onChange={handleChange}
                placeholder="50"
              />
            </div>

            <div className="group-input">
              <label>Status</label>
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
            </div>

            <div className="group-input">
              <label>Nota</label>
              <input
                type="number"
                name="nota"
                min="0"
                max="10"
                step="0.1"
                value={formData.nota}
                onChange={handleChange}
              />
            </div>



            <div className="group-input">
              <label>Comentário</label>
              <textarea
                name="comentario"
                value={formData.comentario}
                onChange={handleChange}
                rows="3"
                placeholder="O que você achou do livro?"
              />
            </div>

          </div>
        </div>


        <button className="button-primary" type="submit">Cadastrar Livro</button>


      </form>
    </div>
  )
}

export default CadastroLivro
