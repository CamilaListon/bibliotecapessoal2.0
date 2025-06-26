import React from 'react'
import { Link } from 'react-router-dom'
import './TelaInicial.css'

function TelaInicial() {
  return (
    <div className="container">
      <div className="grand">
        <img src="/principal.jpg" alt="..." id="telainicialA" />
      </div>

      <div className="direita">
        <div className="topo">
          <label id="titulo">Sua Biblioteca Pessoal</label>
          <div>
            <label htmlFor="" id="textinho">Sua Biblioteca Pessoal é uma maneira simples,
              rápida e organizada de registrar suas leituras. Com ele, você acompanha seus livros,
              avalia suas experiências e mantém sua jornada literária sempre atualizada.</label>
          </div>
        </div>
        <div className="botoes">
          <Link to="/login">
            <button className="faca">FAÇA SEU LOGIN</button>
          </Link>

          <Link to="/cadastro">
            <button className="crie">CRIE SUA CONTA</button>
          </Link>

        </div>
      </div>
    </div>
  )
}

export default TelaInicial
