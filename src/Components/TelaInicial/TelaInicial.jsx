import './TelaInicial.css'

function TelaInicial() {
  return (
    <div className="container-inicial">
      <div className="coluna-esquerda"></div>

      <div className="coluna-direita">
        <h1 className="titulo">Sua Biblioteca Pessoal</h1>
        <p className="descricao-inicial">Sua Biblioteca Pessoal é uma maneira simples,
          rápida e organizada de registrar suas leituras. Com ele, você acompanha seus livros,
          avalia suas experiências e mantém sua jornada literária sempre atualizada.</p>
        <div className="botoes">
          <a className='link-login' href="/login">Faça seu login</a>
          <a className='link-cad' href="/cadastro">Crie sua conta</a>
        </div>
      </div>
    </div>
  )
}

export default TelaInicial
