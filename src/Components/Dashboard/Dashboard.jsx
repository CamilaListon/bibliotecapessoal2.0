import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import GraficoLivros from './GraficoLivros'
import Header from '../Header/Header'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const [livros, setLivros] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem('livros')) || []
    setLivros(dados)
  }, [])

  const totalLivros = livros.length
  const lidos = livros.filter(l => l.status?.toLowerCase() === 'lido')
  const naoLidos = livros.filter(l => l.status?.toLowerCase() === 'não lido')
  const abandonados = livros.filter(l => l.status?.toLowerCase() === 'abandonado')
  const desejos = livros.filter(l => l.status?.toLowerCase() === 'lista de desejos')

  const totalPaginas = livros.reduce((total, livro) => {
    const paginas = parseInt(livro.paginas)
    return total + (isNaN(paginas) ? 0 : paginas)
  }, 0)

  const fisicosLidos = lidos.filter(l => l.tipoLeitura?.toLowerCase() === 'físico').length
  const digitaisLidos = lidos.filter(l => l.tipoLeitura?.toLowerCase() === 'digital').length

  const totalGasto = livros.reduce((total, livro) => {
    const valor = parseFloat(livro.valor)
    return total + (isNaN(valor) ? 0 : valor)
  }, 0)

  const contagemGeneros = {}
  livros.forEach((l) => {
    const genero = l.genero?.toLowerCase()
    if (genero) {
      contagemGeneros[genero] = (contagemGeneros[genero] || 0) + 1
    }
  })

  const topGeneros = Object.entries(contagemGeneros)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)

  const logout = () => {
    localStorage.removeItem('usuarioLogado')
    navigate('/')
  }

  const voltar = () => {
    navigate('/secoes')
  }

  return (
    <div className="container-max">
      <Header />
      <div className="dashboard-container">

        <h3>Dashboard</h3>

        <div className="dashboard-grid">
          {/* Segmento 1 */}
          <div id="card-total-livros" className="card">
            <h3>Livros Registrados</h3>
            <p><strong>{totalLivros}</strong> </p>
            <ul>
              <p>📘 Lidos: {lidos.length}</p>
              <p>📕 Não Lidos: {naoLidos.length}</p>
              <p>📙 Abandonados: {abandonados.length}</p>
            </ul>
          </div>

          {/* Segmento 2 */}
          <div className="card">
            <h2>Total de Páginas Lidas</h2>
            <p><strong>{totalPaginas}</strong> páginas</p>
          </div>

          {/* Segmento 3 */}
          <div className="card">
            <h2>Físico vs Digital (Lidos)</h2>
            <GraficoLivros livrosFisicos={fisicosLidos} livrosDigitais={digitaisLidos} />
          </div>

          {/* Segmento 4 */}
          <div className="card">
            <h2>Total Gasto</h2>
            <p><strong>R${totalGasto.toFixed(2)}</strong></p>
          </div>

          {/* Segmento 5 */}
          <div className="card">
            <h2>Top 3 Gêneros</h2>
            <ol>
              {topGeneros.map(([genero, qtd]) => (
                <li key={genero}>
                  {genero.charAt(0).toUpperCase() + genero.slice(1)} — {qtd}
                </li>
              ))}
            </ol>
          </div>

          {/* Segmento 6 */}
          <div className="card">
            <h2>Lista de Desejos</h2>
            <p><strong>{desejos.length}</strong> livros na lista</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
