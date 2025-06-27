import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TelaInicial from './Components/TelaInicial/TelaInicial'
import CadastroUsuario from './Components/CadastroUsuario/CadastroUsuario'
import LoginUsuario from './components/LoginUsuario/LoginUsuario'
import SuasSecoes from './Components/SuasSecoes/SuasSecoes'
import CadastroLivro from './Components/CadastroLivro/CadastroLivro'
import ListaLivros from './Components/ListaLivros/ListaLivros'
import ListaDesejos from './Components/ListaDesejos/ListaDesejos'
import Dashboard from './Components/Dashboard/Dashboard'
import RotaProtegida from './Components/RotaProtegida/RotaProtegida'
import Header from './Components/Header/Header'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TelaInicial />} />
        <Route path="/cadastro" element={<CadastroUsuario />} />
        <Route path="/login" element={<LoginUsuario />} />
        <Route
          path="/secoes"
          element={
            <RotaProtegida>
              <SuasSecoes />
            </RotaProtegida>} />
        <Route
          path="/cadastrolivro"
          element={
            <RotaProtegida>
              <CadastroLivro />
            </RotaProtegida>} />
        <Route
          path="/listalivros"
          element={
            <RotaProtegida>
              <ListaLivros />
            </RotaProtegida>} />
        <Route
          path="/listadesejos"
          element={
            <RotaProtegida>
              <ListaDesejos />
            </RotaProtegida>} />
        <Route
          path="/dashboard"
          element={
            <RotaProtegida>
              <Dashboard />
            </RotaProtegida>} />
        <Route
          path="/header"
          element={
            <RotaProtegida>
              <Header />
            </RotaProtegida>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
