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
  }

  return (
    <div className="cadastro-container">
      <div className="cont-esq">
        <label htmlFor="">image</label>
      </div>
      <div className="cad">
        <h2 id='header-cadastro'>Cadastre-se</h2>
        <p className="ja-tem-cadastro">
          Já possui cadastro?{' '}
          <span className="link-login" onClick={() => navigate('/login')}>
            Faça seu login!
          </span>
        </p>
        <form onSubmit={handleCadastro} className='for-cad'>
          <label htmlFor="">Nome</label>
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <label htmlFor="">E-mail</label>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="">Senha</label>
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <label htmlFor="">Confirme sua senha</label>
          <input
            type="password"
            placeholder="Confirmar senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
          />
          <button type="submit">Cadastrar</button>
        </form>

        {mensagem && <p className='mensagem'>{mensagem}</p>}
      </div>
    </div>
  )
}

export default CadastroUsuario
