import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
    return (
        <div className="header-superior">
            <div className="superior">
                <Link to="/" id="botao-voltar">
                    <img src="/seta.svg" alt="Ícone de voltar" />
                    <p>Voltar</p>
                </Link>

                <Link to="/" id="botao-saida">
                    <img src="/saida.svg" alt="Ícone de saída" />
                </Link>
            </div>
        </div>
    )
}

export default Header
