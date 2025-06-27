import React, { useEffect, useState } from 'react'
import './ListaDesejos.css'

function ListaDesejos() {
  const [livros, setLivros] = useState([])
  const [abertos, setAbertos] = useState({})
  const [pesquisa, setPesquisa] = useState('')
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

  const totalPaginas = Math.ceil(livrosFiltrados.length / livrosPorPagina)
  const irParaPagina = (numPagina) => {
    if (numPagina >= 1 && numPagina <= totalPaginas) {
      setPaginaAtual(numPagina)
    }
  }

  return (
    <div className="container-desejos">
      <h1 className='titulo-desejos'>Lista de Desejos</h1>

      <section className="section-livros">
        <div className="group-input  margin-pesquisar">
          <label htmlFor="">Pesquise por um livro</label>
          <input
            type="text"
            placeholder="Pesquisar por nome, autor, gênero, editora ou ISBN..."
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
          />
        </div>

        {livrosPaginados.length === 0 ? (
          <p className="sem-livros-desejos">Nenhum livro encontrado na sua lista de desejos.</p>
        ) : (
          livrosPaginados.map((livro, index) => (
            <div className="livro-desejos" key={index}>
              <button className="toggle-btn-desejos" onClick={() => togglePainel(index)}>
                <span>{livro.nome || 'Livro sem título'}</span>
                <span className='icon-livro'>{abertos[index] ? 
                  <img src="arrow-up.svg" alt="Seta" /> : 
                  <img src="arrow-down.svg" alt="Seta" />}</span>
              </button>
              {abertos[index] && (
                <div className="livro-detalhes-desejos">
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
      </section>

      {totalPaginas > 1 && (
        <div className="paginacao-desejos">
          <button className='botao-anterior-desejos' onClick={() => irParaPagina(paginaAtual - 1)} disabled={paginaAtual === 1}>
            Anterior
          </button>
          <span>Página {paginaAtual} de {totalPaginas}</span>
          <button className='botao-proxima-desejos' onClick={() => irParaPagina(paginaAtual + 1)} disabled={paginaAtual === totalPaginas}>
            Próxima
          </button>
        </div>
      )}
    </div>
  )
}

export default ListaDesejos
