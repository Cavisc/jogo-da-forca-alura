const btnSalvarInfo = document.querySelector('.btn-salvar')

let colocaPalavrasNovas = JSON.parse(localStorage.getItem('novasPalavras'))
let colocaCategoriasNovas = JSON.parse(localStorage.getItem('novasCategorias'))

btnSalvarInfo.addEventListener('click', () => {
  salvarInfo()
})

function salvarInfo() {
  const inputNovaPalvra = document.querySelector('.nova-palavra')
  const palavraNova = inputNovaPalvra.value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

  const inputCategoriaNovaPalavra = document.querySelector(
    '.categoria-palavra-nova'
  )
  const categoriaNova = inputCategoriaNovaPalavra.value.toUpperCase()

  if (palavraNova == '' || categoriaNova == '') {
    alert('Por favor, preencha os campos.')
  } else {
    if (
      localStorage.getItem('novasPalavras') == null &&
      localStorage.getItem('novasCategorias') == null
    ) {
      let novasPalavras = [palavraNova]
      localStorage.setItem('novasPalavras', JSON.stringify(novasPalavras))
      inputNovaPalvra.value = ''
      colocaPalavrasNovas = JSON.parse(localStorage.getItem('novasPalavras'))

      let novasCategorias = [categoriaNova]
      localStorage.setItem('novasCategorias', JSON.stringify(novasCategorias))
      inputCategoriaNovaPalavra.value = ''
      colocaCategoriasNovas = JSON.parse(
        localStorage.getItem('novasCategorias')
      )
    } else {
      let novasPalavras = JSON.parse(localStorage.getItem('novasPalavras'))
      novasPalavras.push(palavraNova)
      localStorage.setItem('novasPalavras', JSON.stringify(novasPalavras))
      inputNovaPalvra.value = ''
      colocaPalavrasNovas = JSON.parse(localStorage.getItem('novasPalavras'))
      let novasCategorias = JSON.parse(localStorage.getItem('novasCategorias'))
      novasCategorias.push(categoriaNova)
      localStorage.setItem('novasCategorias', JSON.stringify(novasCategorias))
      inputCategoriaNovaPalavra.value = ''
      colocaCategoriasNovas = JSON.parse(
        localStorage.getItem('novasCategorias')
      )
    }
    console.log(palavras)
  }
}
