import React, { useState } from 'react'
import './LoginUsuario.css'

function LoginUsuario() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [mensagem, setMensagem] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []

    const usuarioValido = usuarios.find(
      (user) => user.email === email && user.senha === senha
    )

    if (usuarioValido) {
      localStorage.setItem('usuarioLogado', JSON.stringify(usuarioValido))
      setMensagem('Login realizado com sucesso!')
    } else {
      setMensagem('E-mail ou senha inválidos.')
    }
  }

  return (
    <div className="login-container">
      <h2 id='header-login'>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>

      {mensagem && (
        <p id='mensagem' className={mensagem.includes('sucesso') ? 'mensagem-sucesso' : 'mensagem-erro'}>
          {mensagem}
        </p>
      )}
    </div>
  )
}

export default LoginUsuario