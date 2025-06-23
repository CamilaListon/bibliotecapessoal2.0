import React from 'react'
import { useNavigate } from 'react-router-dom'
import './SuasSecoes.css'

function SuasSecoes() {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('usuarioLogado')
    navigate('/')
  }

  return (
    <div className="secoes-container">
      <div className="topo-sair">
        <button className="botao-sair" onClick={logout}>Sair</button>
      </div>

      <h1>Suas Seções</h1>

      <div className="grid-secoes">
        <div className="painel" style={{ backgroundColor: '#d0f0c0' }}>
          <h2>LIVROS</h2>
          <button className="botao-acessar" onClick={() => navigate('/listalivros')}>
            ACESSAR
          </button>
        </div>

        <div className="painel" style={{ backgroundColor: '#d0e1f9' }}>
          <h2>LISTA DE DESEJOS</h2>
          <button className="botao-acessar" onClick={() => navigate('/listadesejos')}>
            ACESSAR
          </button>
        </div>

        <div className="painel" style={{ backgroundColor: '#fcebbd' }}>
          <h2>DASHBOARD</h2>
          <button className="botao-acessar" onClick={() => navigate('/dashboard')}>
            ACESSAR
          </button>
        </div>
      </div>

      <button className="botao-adicionar" onClick={() => navigate('/cadastrolivro')}>
        + Adicionar novo livro
      </button>
    </div>
  )
}

export default SuasSecoes
