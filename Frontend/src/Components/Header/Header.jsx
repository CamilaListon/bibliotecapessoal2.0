import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

function Header({ semBotaoVoltar = false }) {
    return (
        <div className="header-superior">
            <div className="superior">
                {semBotaoVoltar ? (
                    <div className="espaco-vazio" />
                ) : (
                    <Link to="/secoes" className="botao-voltar">
                        <img src="/seta.svg" alt="Ícone de voltar" />
                        <p>Voltar</p>
                    </Link>
                )}

                <Link to="/" className="botao-saida">
                    <img className="icon-sair" src="/saida.svg" alt="Ícone de saída" />
                </Link>
            </div>
        </div>
    )
}

export default Header
