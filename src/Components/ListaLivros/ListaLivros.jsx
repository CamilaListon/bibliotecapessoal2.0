import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './ListaLivros.css'

function ListaLivros() {
  const [livros, setLivros] = useState([])
  const [filtro, setFiltro] = useState('Todos')
  const [abertos, setAbertos] = useState({})
  const [pesquisa, setPesquisa] = useState('')
  const [paginaAtual, setPaginaAtual] = useState(1)
  const livrosPorPagina = 5

  const navigate = useNavigate()

  useEffect(() => {
    const livrosSalvos = JSON.parse(localStorage.getItem('livros')) || []
    setLivros(livrosSalvos)
  }, [])

  const livrosFiltrados = livros.filter((livro) => {
    const statusOk = filtro === 'Todos' || livro.status?.toLowerCase() === filtro.toLowerCase()
    const textoBusca = pesquisa.toLowerCase()

    const nomeMatch = livro.nome?.toLowerCase().includes(textoBusca)
    const autorMatch = livro.autor?.toLowerCase().includes(textoBusca)
    const generoMatch = livro.genero?.toLowerCase().includes(textoBusca)
    const editoraMatch = livro.editora?.toLowerCase().includes(textoBusca)
    const isbnMatch = livro.isbn?.toLowerCase().includes(textoBusca)

    const contemTermo = nomeMatch || autorMatch || generoMatch || editoraMatch || isbnMatch

    return statusOk && contemTermo
  })

  // Paginação
  const indiceInicio = (paginaAtual - 1) * livrosPorPagina
  const indiceFim = indiceInicio + livrosPorPagina
  const livrosPaginados = livrosFiltrados.slice(indiceInicio, indiceFim)
  const totalPaginas = Math.ceil(livrosFiltrados.length / livrosPorPagina)

  const togglePainel = (index) => {
    setAbertos((prev) => ({ ...prev, [index]: !prev[index] }))
  }

  const voltar = () => navigate('/secoes')

  const logout = () => {
    localStorage.removeItem('usuarioLogado')
    navigate('/')
  }

  const irParaCadastro = () => {
    navigate('/cadastrolivro')
  }

  return (
    <div className="lista-livros-container">
      <div className="topo-sair">
        <button className="botao-sair" onClick={logout}>Sair</button>
      </div>

      <h1>Lista de Livros</h1>

      <input
        type="text"
        placeholder="Pesquisar por nome, autor, gênero, editora ou ISBN..."
        value={pesquisa}
        onChange={(e) => setPesquisa(e.target.value)}
        className="barra-pesquisa"
      />

      <div className="filtros">
        {['Todos', 'Lido', 'Não Lido', 'Abandonado'].map((opcao) => (
          <button
            key={opcao}
            className={`filtro-btn ${filtro === opcao ? 'ativo' : ''}`}
            onClick={() => {
              setFiltro(opcao)
              setPaginaAtual(1) // reinicia na primeira página ao trocar o filtro
            }}
          >
            {opcao}
          </button>
        ))}
      </div>

      {livrosFiltrados.length === 0 ? (
        <p className="sem-livros">Nenhum livro encontrado para o filtro: {filtro}</p>
      ) : (
        livrosPaginados.map((livro, index) => (
          <div className="livro-painel" key={indiceInicio + index}>
            <button className="toggle-btn" onClick={() => togglePainel(indiceInicio + index)}>
              <span>{livro.nome || 'Livro sem título'}</span>
              <span>{abertos[indiceInicio + index] ? '▲' : '▼'}</span>
            </button>
            {abertos[indiceInicio + index] && (
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

      {totalPaginas > 1 && (
        <div className="paginacao">
          <button
            onClick={() => setPaginaAtual((prev) => Math.max(prev - 1, 1))}
            disabled={paginaAtual === 1}
          >
            Anterior
          </button>

          <span>Página {paginaAtual} de {totalPaginas}</span>

          <button
            onClick={() => setPaginaAtual((prev) => Math.min(prev + 1, totalPaginas))}
            disabled={paginaAtual === totalPaginas}
          >
            Próxima
          </button>
        </div>
      )}

      <div className="botoes-inferiores">
        <button className="botao-voltar" onClick={voltar}>Voltar</button>
        <button className="botao-adicionar" onClick={irParaCadastro}>+ Adicionar Livro</button>
      </div>
    </div>
  )
}

export default ListaLivros
