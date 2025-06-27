import './CadastroUsuario.css'
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'

function CadastroUsuario() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [mensagem, setMensagem] = useState('')

  const navigate = useNavigate()

  const handleCadastro = (e) => {
    e.preventDefault()

    if (senha !== confirmarSenha) {
      setMensagem('As senhas não coincidem.')
      return
    }

    const usuariosExistentes = JSON.parse(localStorage.getItem('usuarios')) || []
    const emailJaCadastrado = usuariosExistentes.find((user) => user.email === email)

    if (emailJaCadastrado) {
      setMensagem('Este e-mail já está cadastrado.')
      return
    }

    const novoUsuario = { nome, email, senha }
    usuariosExistentes.push(novoUsuario)
    localStorage.setItem('usuarios', JSON.stringify(usuariosExistentes))

    setNome('')
    setEmail('')
    setSenha('')
    setConfirmarSenha('')
    setMensagem('Usuário cadastrado com sucesso!')
    navigate('/secoes');
  }

  return (
    <div className="container-cadastro">
      <div className="coluna-esquerda-cadastro"></div>

      <div className="coluna-direita-cadastro">
        <h1 className='titulo-cadastro'>Cadastre-se</h1>
        <p className='descricao-cadastro'>
          Cadastre-se para continuar
        </p>

        <form onSubmit={handleCadastro} className='formulario-cadastro'>
          <div className="group-input">
            <label htmlFor="">Nome</label>
            <input
              className='input-form'
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          <div className="group-input">
            <label htmlFor="">E-mail</label>
            <input
              className='input-form'
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="group-input">
            <label htmlFor="">Senha</label>
            <input
              className='input-form'
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          <div className="group-input">
            <label htmlFor="">Confirme sua senha</label>
            <input
              className='input-form'
              type="password"
              placeholder="Confirmar senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required
            />
          </div>

          <button className='button-primary' type="submit">Cadastrar</button>
        </form>

        <p className="texto-cadastrado">
          Já possui cadastro?
          <span className="link-cadastrado" onClick={() => navigate('/login')}>
            Faça seu login!
          </span>
        </p>

        {mensagem && <p className='mensagem'>{mensagem}</p>}
      </div>
    </div>
  )
}

export default CadastroUsuario
