import { useState } from 'react'
import './App.css'
import TelaInicial from './Components/TelaInicial/TelaInicial'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TelaInicial />
    </>
  )
}

export default App
