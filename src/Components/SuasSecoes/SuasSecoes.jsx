import React from 'react'
import { useNavigate } from 'react-router-dom'
import './SuasSecoes.css'
import Header from '../Header/Header'


function SuasSecoes() {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('usuarioLogado')
    navigate('/')
  }

  return (
    <div className="secoes-container">

      <div>
        <Header />
      </div>
      <div className="fulano-grid">
        <div className="fulano">
          <h1>Olá, Fulano!</h1>
        </div>
        <div className="grid-secoes">
          <div className="painel" id="image-livro" onClick={() => navigate('/listalivros')}>
            <h2>Livros</h2>

          </div>

          <div className="painel" id="image-lista-desejo" onClick={() => navigate('/listadesejos')}>
            <h2>Lista de Desejos</h2>

          </div>

          <div className="painel" id="image-estatistica" onClick={() => navigate('/dashboard')}>
            <h2>Estatísticas</h2>
          </div>
        </div>
      </div>
      {/* <button className="botao-adicionar" onClick={() => navigate('/cadastrolivro')}>
        + Adicionar novo livro
      </button> */}
    </div>
  )
}

export default SuasSecoes
