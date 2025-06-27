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

  // Somar apenas páginas dos livros lidos
  const totalPaginas = lidos.reduce((total, livro) => {
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

        <h3>Estatísticas</h3>

        <div className="dashboard-grid">

          {/* Segmento 1 */}
          <div className="card-total-livros">
            <div className='direcao-icon'>
              <span className='circulo'>
                <img className="icons" src="/livros-registrados.svg" alt="" />
              </span>
              <div>
                <p>Livros Registrados</p>
                <div className='numeros-informativos'>{totalLivros}</div>
              </div>
            </div>

            <div className='direcao-icon' id="borda-lidos">
              <span className='circulo'>
                <img className="icons" src="/lidos.svg" alt="" />
              </span>
              <div>
                <p>Lidos</p>
                <div className='numeros-informativos'>{lidos.length}</div>
              </div>
            </div>

            <div className='direcao-icon' id="borda-nao-lidos">
              <span className='circulo'>
                <img className="icons" src="nao-lidos.svg" alt="" />
              </span>
              <div>
                <p>Não Lidos</p>
                <div className='numeros-informativos'>{naoLidos.length}</div>
              </div>
            </div>

            <div className='direcao-icon'>
              <span className='circulo'>
                <img className="icons" src="/abandonados.svg" alt="" />
              </span>
              <div>
                <p>Abandonados</p>
                <div className='numeros-informativos'>{abandonados.length}</div>
              </div>
            </div>
          </div>

          <div className="segunda-linha">
            {/* Segmento 2 */}
            <div className="card linha-dois">
              <span className='sem-circulo'>
                <img src="/pagina-lidas.svg" alt="" />
              </span>
              <div className='separar-linha'>
                <p className='numeros-informativos'><strong>{totalPaginas}</strong></p>
                <p>Total de Páginas Lidas</p>
              </div>
            </div>

            {/* Segmento 4 */}
            <div className="card linha-dois">
              <span className='sem-circulo'>
                <img src="/lista-desejos.svg" alt="" />
              </span>
              <div className='separar-linha'>
                <p className='numeros-informativos'><strong>{desejos.length}</strong></p>
                <p>Lista de Desejos</p>
              </div>
            </div>

            {/* Segmento 3 */}
            <div className="card-grafico">
              <p>Porcentagem de tipo de leitura (Lidos)</p>
              <GraficoLivros livrosFisicos={fisicosLidos} livrosDigitais={digitaisLidos} />
            </div>
          </div>

          <div className="terceira-linha">
            {/* Segmento 6 */}
            <div className="card linha-dois valores">
              <span className='sem-circulo'>
                <img src="/total-gasto.svg" alt="" />
              </span>
              <div className='separar-linha'>
                <p className='numeros-informativos'>R${totalGasto.toFixed(2)}</p>
                <p>Total Gasto</p>
              </div>
            </div>

            {/* Segmento 5 */}
            <div className="top-generos">
              <p>Top 3 Gêneros</p>
              <ol>
                {topGeneros.map(([genero, qtd]) => (
                  <li key={genero}>
                    {genero.charAt(0).toUpperCase() + genero.slice(1)} — {qtd}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
