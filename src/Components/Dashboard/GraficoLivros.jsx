import React from 'react'
import './GraficoLivros.css'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js'

ChartJS.register(ArcElement, Tooltip)

function GraficoLivros({ livrosFisicos, livrosDigitais }) {
  const total = livrosFisicos + livrosDigitais

  const data = {
    labels: ['Físico', 'Digital'],
    datasets: [
      {
        data: [livrosFisicos, livrosDigitais],
        backgroundColor: ['#402718', '#8C5B30'],
        borderWidth: 0,
        circumference: 180,
        rotation: -90,
        cutout: '60%',
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || ''
            const value = context.raw || 0
            const percent = ((value / total) * 100).toFixed(1)
            return `${label}: ${value} (${percent}%)`
          }
        }
      },
      legend: {
        position: 'bottom'
      }
    }
  }

  return (
    <div className='grafico'>
      <Doughnut data={data} options={options} />
    </div>
  )
}

export default GraficoLivros
