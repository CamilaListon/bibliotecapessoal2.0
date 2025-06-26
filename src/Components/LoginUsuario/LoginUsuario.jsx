import React, { useState } from 'react'
import './LoginUsuario.css'
import { useNavigate } from 'react-router-dom'

function LoginUsuario() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [mensagem, setMensagem] = useState('')

  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []

    const usuarioValido = usuarios.find(
      (user) => user.email === email && user.senha === senha
    )

    if (usuarioValido) {
      localStorage.setItem('usuarioLogado', JSON.stringify(usuarioValido))
      navigate('/secoes')
    } else {
      setMensagem('E-mail ou senha inválidos.')
    }
  }

  const handleEsqueciSenha = () => {
    if (!email) {
      setMensagem('Digite seu e-mail para recuperar a senha.')
      return
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []
    const usuarioEncontrado = usuarios.find((user) => user.email === email)

    if (usuarioEncontrado) {
      setMensagem(`Olá, ${usuarioEncontrado.nome}. Sua senha é: ${usuarioEncontrado.senha}`)
    } else {
      setMensagem('E-mail não encontrado.')
    }
  }


  return (
    <div className="login-container">

      <div className="esqer">
        <h1>image</h1>
      </div>

      <div className="log">
        <h2 id='header-login'>Login</h2>
        <p className="nao-tem-cadastro">
          Ainda não possui cadastro?{' '}
          <span className="link-cadastro" onClick={() => navigate('/cadastro')}>
            Cadastre-se aqui!
          </span>
        </p>
        <form onSubmit={handleLogin}>
          <input className="inp-log"
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input className="inp-log"
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <button type="submit">Entrar</button>
          <p className="esqueci-senha" onClick={handleEsqueciSenha}>
            Esqueci minha senha
          </p>
        </form>

        {mensagem && (
          <p id='mensagem' className={mensagem.includes('sucesso') ? 'mensagem-sucesso' : 'mensagem-erro'}>
            {mensagem}
          </p>
        )}
      </div>
    </div>
  )
}

export default LoginUsuario