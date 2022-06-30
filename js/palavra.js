const btnSalvarInfo = document.querySelector('.btn-salvar')

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
    palavras.push(palavraNova)
    categorias.push(categoriaNova)
    inputNovaPalvra.value = ''
    inputCategoriaNovaPalavra.value = ''
  }
}
