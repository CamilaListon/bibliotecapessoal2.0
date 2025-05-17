import React from 'react'
import './TelaInicial.css'

function TelaInicial({ mudarTela }) {
  return (
    <div className="container">
      <div className="grand">
        <img src="/telainicialA.png" alt="Ilustração de um menino sorridente aparecendo por trás de uma pilha de livros coloridos." id="telainicialA" />
        <div className="topo">
          <label>Sua Biblioteca Pessoal</label>
          <img src="/telainicialB.png" alt="Ilustração de livros coloridos empilhados atrás de um caderno de anotações postado na vertical, ao lado de um tinteiro com uma pena dentro." id="telainicialB" />
        </div>
      </div>

      <div className="botoes">
        <button className="crie" onClick={() => mudarTela('cadastro')}>
          CRIE SUA CONTA
        </button>
        <span className="ou">OU</span>
        <button className="faca" onClick={() => mudarTela('login')}>
            FAÇA SEU LOGIN
        </button>
      </div>
    </div>
  )
}

export default TelaInicial


// Ilustração de um menino sorridente aparecendo por trás de uma pilha de livros coloridos.

// Ilustração de livros coloridos empilhados atrás de um caderno de anotações postado na vertical, ao lado de um tinteiro com uma pena dentro.