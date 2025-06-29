import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './ListaLivros.css'
import Header from '../Header/Header'

function ListaLivros() {
  const [livros, setLivros] = useState([])
  const [filtro, setFiltro] = useState('Todos')
  const [abertos, setAbertos] = useState({})
  const [pesquisa, setPesquisa] = useState('')
  const [paginaAtual, setPaginaAtual] = useState(1)
  const livrosPorPagina = 5
  const [livroEditando, setLivroEditando] = useState(null)
  const [mostrarModalEdicao, setMostrarModalEdicao] = useState(false)
  const [livroParaExcluir, setLivroParaExcluir] = useState(null)
  const [mostrarConfirmacaoExclusao, setMostrarConfirmacaoExclusao] = useState(false)
  const [mensagemSucesso, setMensagemSucesso] = useState('')

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

  const indiceInicio = (paginaAtual - 1) * livrosPorPagina
  const indiceFim = indiceInicio + livrosPorPagina
  const livrosPaginados = livrosFiltrados.slice(indiceInicio, indiceFim)
  const totalPaginas = Math.ceil(livrosFiltrados.length / livrosPorPagina)

  const togglePainel = (index) => {
    setAbertos((prev) => ({ ...prev, [index]: !prev[index] }))
  }

  const irParaCadastro = () => {
    navigate('/cadastrolivro')
  }

  const excluirLivroConfirmado = () => {
    const novaLista = livros.filter(l => l.isbn !== livroParaExcluir.isbn)
    setLivros(novaLista)
    localStorage.setItem('livros', JSON.stringify(novaLista))
    setLivroParaExcluir(null)
    setMostrarConfirmacaoExclusao(false)
    setMensagemSucesso('Livro excluído com sucesso!')
    setTimeout(() => setMensagemSucesso(''), 3000)
  }

  const abrirEdicao = (livro) => {
    setLivroEditando({ ...livro })
    setMostrarModalEdicao(true)
  }

  const salvarEdicao = (e) => {
    e.preventDefault()

    const novaLista = livros.map((livro) =>
      livro.isbn === livroEditando.isbn ? livroEditando : livro
    )

    setLivros(novaLista)
    localStorage.setItem('livros', JSON.stringify(novaLista))
    setMostrarModalEdicao(false)
    setMensagemSucesso('Livro editado com sucesso!')
    setTimeout(() => setMensagemSucesso(''), 3000)
  }


  return (
    <>
      <div className="container-livros">
        <Header />
        <h1 className='titulo-livros'>Livros</h1>

        <section className="section-livros">
          <div className="group-input">
            <label htmlFor="">Pesquise por um livro</label>
            <input
              type="text"
              placeholder="Pesquisar por nome, autor, gênero, editora ou ISBN..."
              value={pesquisa}
              onChange={(e) => setPesquisa(e.target.value)}
            />
          </div>

          <div className="filtros-livros">
            <div className="filtro-wrapper-livros">
              <div
                className="pill-livros"
                style={{
                  transform: `translateX(${['Todos', 'Lido', 'Não Lido', 'Abandonado'].indexOf(filtro) * 100}%)`,
                }}
              />
              {['Todos', 'Lido', 'Não Lido', 'Abandonado'].map((opcao) => (
                <button
                  key={opcao}
                  className={`filtro-btn-livros ${filtro === opcao ? 'ativo-livros' : ''}`}
                  onClick={() => {
                    setFiltro(opcao);
                    setPaginaAtual(1);
                  }}
                >
                  {opcao}
                </button>
              ))}
            </div>
          </div>


          {livrosFiltrados.length === 0 ? (
            <p className="sem-livros-livros">Nenhum livro encontrado para o filtro: {filtro}</p>
          ) : (
            livrosPaginados.map((livro, index) => (
              <div className="livro-livros" key={indiceInicio + index}>
                <button className="toggle-btn-livros" onClick={() => togglePainel(indiceInicio + index)}>
                  <span>{livro.nome || 'Livro sem título'}</span>
                  <span className='icon-livro'>{abertos[indiceInicio + index] ?
                    <img src="arrow-up.svg" alt="Seta" /> :
                    <img src="arrow-down.svg" alt="Seta" />}</span>
                </button>
                {abertos[indiceInicio + index] && (
                  <div className="livro-detalhes-livros">
                    <p><strong>ISBN:</strong> {livro.isbn}</p>
                    <p><strong>Gênero:</strong> {livro.genero}</p>
                    <p><strong>Autor:</strong> {livro.autor}</p>
                    <p><strong>Editora:</strong> {livro.editora}</p>
                    <p><strong>Tipo de Leitura:</strong> {livro.tipoLeitura}</p>
                    <p><strong>Valor:</strong> {livro.valor}</p>
                    <p><strong>Status:</strong> {livro.status}</p>
                    <p><strong>Nota:</strong> {livro.nota}</p>
                    <p><strong>Comentário:</strong> {livro.comentario}</p>
                    <div className='opcoes-livro'>
                      <button className='botao-acao' onClick={() => abrirEdicao(livro)}>
                        <img src="editar.svg" alt="Editar livro" />
                      </button>
                      <button className='botao-acao' onClick={() => {
                          setLivroParaExcluir(livro)
                          setMostrarConfirmacaoExclusao(true)
                        }}>
                        <img src="excluir.svg" alt="Excluir livro" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}

          <button className="button-primary" onClick={irParaCadastro}>Adicionar Livro</button>

          {mostrarModalEdicao && livroEditando && (
            <div className="modal-edicao">
              <div className="conteudo-modal">
                <h2 className='titulo-modal'>Editar Livro</h2>
                <form onSubmit={salvarEdicao}>
                  <div className="group-input">
                    <label>Status</label>
                    <select
                      name="status"
                      value={livroEditando.status}
                      onChange={(e) => setLivroEditando({ ...livroEditando, status: e.target.value })}
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
                      min="0"
                      max="10"
                      value={livroEditando.nota}
                      onChange={(e) => setLivroEditando({ ...livroEditando, nota: e.target.value })}
                    />
                  </div>

                  <div className="group-input">
                    <label>Comentário</label>
                    <textarea
                      name="comentario"
                      value={livroEditando.comentario}
                      onChange={(e) => setLivroEditando({ ...livroEditando, comentario: e.target.value })}
                      rows="3"
                      placeholder="O que você achou do livro?"
                    />
                  </div>

                  <div className="botoes-modal">
                    <button className='button-primary' type="submit">Salvar</button>
                    <button className='button-outline' type="button" onClick={() => setMostrarModalEdicao(false)}>Cancelar</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {mensagemSucesso && (
            <div className="modal-confirmacao">
              <div className="mensagem-sucesso">
                <div className='conteudo-modal'>
                  <img src="check.svg" alt="Ícone de confirmação" />
                  <span className='titulo-modal'>{mensagemSucesso}</span>
                </div>
              </div>
            </div>
          )}

          {mostrarConfirmacaoExclusao && (
            <div className="modal-confirmacao">
              <div className="conteudo-modal">
                <h3 className='titulo-modal'>Tem certeza que deseja excluir este livro?</h3>
                <p className='titulo-livro-modal'><strong>{livroParaExcluir?.nome}</strong></p>
                <div className="botoes-modal">
                  <button className='button-primary' onClick={excluirLivroConfirmado}>Sim, excluir</button>
                  <button className='button-outline' onClick={() => setMostrarConfirmacaoExclusao(false)}>Cancelar</button>
                </div>
              </div>
            </div>
          )}

        </section>

        {totalPaginas > 1 && (
          <div className="paginacao-livros">
            <button
              onClick={() => setPaginaAtual((prev) => Math.max(prev - 1, 1))}
              disabled={paginaAtual === 1}
              className='botao-anterior-livros'
            >
              Anterior
            </button>

            <span className='total-paginacao-livros'>Página {paginaAtual} de {totalPaginas}</span>

            <button
              onClick={() => setPaginaAtual((prev) => Math.min(prev + 1, totalPaginas))}
              disabled={paginaAtual === totalPaginas}
              className='botao-proxima-livros'
            >
              Próxima
            </button>
          </div>
        )}

      </div>
    </>
  )
}

export default ListaLivros
