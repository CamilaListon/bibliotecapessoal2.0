import React from 'react'
import { Link } from 'react-router-dom'
import './TelaInicial.css'

function TelaInicial() {
  return (
    <div className="container">
      <div className="grand">
        <img src="/telainicialA.png" alt="..." id="telainicialA" />
        <div className="topo">
          <label>Sua Biblioteca Pessoal</label>
          <img src="/telainicialB.png" alt="..." id="telainicialB" />
        </div>
      </div>

      <div className="botoes">
        <Link to="/cadastro">
          <button className="crie">CRIE SUA CONTA</button>
        </Link>
        <span className="ou">OU</span>
        <Link to="/login">
          <button className="faca">FAÇA SEU LOGIN</button>
        </Link>
      </div>
    </div>
  )
}

export default TelaInicial
