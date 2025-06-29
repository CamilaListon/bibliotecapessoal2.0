import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './SuasSecoes.css'
import Header from '../Header/Header'

function SuasSecoes() {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState(null)

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem('usuarioLogado')
    if (usuarioSalvo) {
      setUsuario(JSON.parse(usuarioSalvo))
    }
  }, [])

  return (
    <>
    <Header semBotaoVoltar />

    <div className="secoes-container">
      <div className="nome-grid">
        <h1 className="nome">Olá, {usuario?.nome || 'usuário'}!</h1>

        <div className="grid-secoes">
          <div className="painel" id="image-livro" onClick={() => navigate('/listalivros')}>
            <h2>Livros</h2>
            <p className="frases-card">Cadastre, visualize e organize todos os seus livros em um só lugar.</p>
          </div>

          <div className="painel" id="image-lista-desejo" onClick={() => navigate('/listadesejos')}>
            <h2>Lista de Desejos</h2>
            <p className="frases-card">Adicione títulos à sua lista de desejos e acompanhe suas futuras leituras.</p>
          </div>

          <div className="painel" id="image-estatistica" onClick={() => navigate('/dashboard')}>
            <h2>Estatísticas</h2>
            <p className="frases-card">Veja estatísticas detalhadas dos seus livros, metas e hábitos literários.</p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default SuasSecoes
