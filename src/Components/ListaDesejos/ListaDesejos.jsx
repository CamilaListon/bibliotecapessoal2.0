import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './ListaDesejos.css'

function ListaDesejos() {
  const [livros, setLivros] = useState([])
  const [abertos, setAbertos] = useState({})
  const [pesquisa, setPesquisa] = useState('')
  const navigate = useNavigate()
  const [paginaAtual, setPaginaAtual] = useState(1)
  const livrosPorPagina = 5

  useEffect(() => {
    const livrosSalvos = JSON.parse(localStorage.getItem('livros')) || []
    setLivros(livrosSalvos)
  }, [])

  const livrosFiltrados = livros.filter((livro) => {
    const statusOk = livro.status === 'Lista de Desejos'
    const textoBusca = pesquisa.toLowerCase()

    const nomeMatch = livro.nome?.toLowerCase().includes(textoBusca)
    const autorMatch = livro.autor?.toLowerCase().includes(textoBusca)
    const generoMatch = livro.genero?.toLowerCase().includes(textoBusca)
    const editoraMatch = livro.editora?.toLowerCase().includes(textoBusca)
    const isbnMatch = livro.isbn?.toLowerCase().includes(textoBusca)

    const contemTermo = nomeMatch || autorMatch || generoMatch || editoraMatch || isbnMatch

    return statusOk && contemTermo
  })

  const indiceInicio = (paginaAtual - 1) * livrosPorPagina
  const indiceFim = indiceInicio + livrosPorPagina
  const livrosPaginados = livrosFiltrados.slice(indiceInicio, indiceFim)

  const togglePainel = (index) => {
    setAbertos((prev) => ({ ...prev, [index]: !prev[index] }))
  }

  const voltar = () => navigate('/secoes')

  const logout = () => {
    localStorage.removeItem('usuarioLogado')
    navigate('/')
  }

  const totalPaginas = Math.ceil(livrosFiltrados.length / livrosPorPagina)
  const irParaPagina = (numPagina) => {
    if (numPagina >= 1 && numPagina <= totalPaginas) {
      setPaginaAtual(numPagina)
    }
  }

  return (
    <div className="lista-livros-container">
      <div className="topo-sair">
        <button className="botao-sair" onClick={logout}>Sair</button>
      </div>

      <h1>Lista de Desejos</h1>

      <input
        type="text"
        placeholder="Pesquisar por nome, autor, gênero, editora ou ISBN..."
        value={pesquisa}
        onChange={(e) => setPesquisa(e.target.value)}
        className="barra-pesquisa"
      />

      {livrosPaginados.length === 0 ? (
        <p className="sem-livros">Nenhum livro encontrado na sua lista de desejos.</p>
      ) : (
        livrosPaginados.map((livro, index) => (
          <div className="livro-painel" key={index}>
            <button className="toggle-btn" onClick={() => togglePainel(index)}>
              <span>{livro.nome || 'Livro sem título'}</span>
              <span>{abertos[index] ? '▲' : '▼'}</span>
            </button>
            {abertos[index] && (
              <div className="livro-detalhes">
                <p><strong>ISBN:</strong> {livro.isbn}</p>
                <p><strong>Gênero:</strong> {livro.genero}</p>
                <p><strong>Autor:</strong> {livro.autor}</p>
                <p><strong>Editora:</strong> {livro.editora}</p>
                <p><strong>Tipo de Leitura:</strong> {livro.tipoLeitura}</p>
                <p><strong>Valor:</strong> {livro.valor}</p>
                <p><strong>Status:</strong> {livro.status}</p>
                <p><strong>Nota:</strong> {livro.nota}</p>
                <p><strong>Comentário:</strong> {livro.comentario}</p>
              </div>
            )}
          </div>
        ))
      )}

      <div className="paginacao">
        <button onClick={() => irParaPagina(paginaAtual - 1)} disabled={paginaAtual === 1}>
          Anterior
        </button>
        <span>Página {paginaAtual} de {totalPaginas}</span>
        <button onClick={() => irParaPagina(paginaAtual + 1)} disabled={paginaAtual === totalPaginas}>
          Próxima
        </button>
      </div>

      <div className="botao-voltar-container">
        <button className="botao-voltar" onClick={voltar}>Voltar</button>
      </div>
    </div>
  )
}

export default ListaDesejos
