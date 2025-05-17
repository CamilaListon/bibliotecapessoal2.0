import { useState } from 'react'
import TelaInicial from './components/TelaInicial/TelaInicial'
import CadastroUsuario from './Components/CadastroUsuario/CadastroUsuario'
import LoginUsuario from './Components/LoginUsuario/LoginUsuario'

function App() {
  const [telaAtual, setTelaAtual] = useState('inicio')

  return (
    <>
      {telaAtual === 'inicio' && <TelaInicial mudarTela={setTelaAtual} />}
      {telaAtual === 'cadastro' && <CadastroUsuario />}
      {telaAtual === 'login' && <LoginUsuario />}
    </>
  )
}

export default App