import './CadastroUsuario.css'
import React, { useState } from 'react'

function CadastroUsuario() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [mensagem, setMensagem] = useState('')

  const handleCadastro = (e) => {
    e.preventDefault()

    const usuariosExistentes = JSON.parse(localStorage.getItem('usuarios')) || []
    const emailJaCadastrado = usuariosExistentes.find((user) => user.email === email)

    if (emailJaCadastrado) {
      setMensagem('Este e-mail já está cadastrado.')
      return
    }

    // Colocar uma função de "Este nome de usuário já existe" quando o banco de dados for implementado.
    const novoUsuario = { nome, email, senha }
    usuariosExistentes.push(novoUsuario)
    localStorage.setItem('usuarios', JSON.stringify(usuariosExistentes))

    setNome('')
    setEmail('')
    setSenha('')
    setMensagem('Usuário cadastrado com sucesso!')
  }

  return (
    <div className="cadastro-container">
      <h2 id='header-cadastro'>Cadastro de Usuário</h2>
      <form onSubmit={handleCadastro}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
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
        <button type="submit">Cadastrar</button>
      </form>

      {mensagem && <p className='mensagem'>{mensagem}</p>}
    </div>
  )
}

export default CadastroUsuario;