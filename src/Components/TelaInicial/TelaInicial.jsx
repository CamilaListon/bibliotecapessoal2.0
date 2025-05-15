import React from 'react'
import './TelaInicial.css'

function TelaInicial() {
    return (
        <div className="container">

            <div className="grand">
            <img src="./public/telainicialA.png" alt="" id="telainicialA"/>
            <div className="topo"><label>Sua Biblioteca Pessoal</label>
            <img src="./public/telainicialB.png" alt="" id="telainicialB"/>
            </div>
            
        </div>
        <div className="botoes">
                <label htmlFor="" className='crie'>CRIE SUA CONTA</label>
                <label htmlFor="" className='ou'>OU</label>
                <label htmlFor="" className='faca'>FAÇA SEU LOGIN</label>
        </div>
        </div>

    )
}

export default TelaInicial