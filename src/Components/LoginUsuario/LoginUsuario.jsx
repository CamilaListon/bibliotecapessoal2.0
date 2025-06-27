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
    <div className="container-login">
      <div className="coluna-esquerda"></div>

      <div className="coluna-direita">
        <h1 className='titulo'>Sua Biblioteca Pessoal</h1>
        <p className='descricao-login'>
          Entre para continuar
        </p>

        <form onSubmit={handleLogin} className='formulario-login'>
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
            <a className="esqueci-senha" onClick={handleEsqueciSenha}>
              Esqueci minha senha
            </a>
          </div>
          <button className='button-primary' type="submit">Login</button>
          <p className="texto-cadastro">
            Ainda não possui cadastro?
            <a className="link-cadastro" onClick={() => navigate('/cadastro')}>
              Cadastre-se aqui!
            </a>
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