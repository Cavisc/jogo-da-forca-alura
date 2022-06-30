let palavraSorteada
let categoriaSorteada
let arrErradas = []
let letrasPalavraSorteada = []
let erros = 6
let listaDinamica = []

const btnAdd = document.querySelector('.btn-add')

const btnVoltarJogo = document.querySelector('.btn-voltar')

const btnReset = document.querySelector('.btn-reset')

const btnResetModalVitoria = document.querySelector('#btn-reset-modal-vitoria')

const btnResetModalDerrota = document.querySelector('#btn-reset-modal-derrota')

const palavras = [
  'Aviao',
  'Elefante',
  'Bola',
  'Bebe',
  'Peixe',
  'Futebol',
  'Basquete',
  'Triste',
  'Gato',
  'Golfe',
  'Tesoura',
  'Colher',
  'Pular',
  'Galinha',
  'Sapo',
  'Martelo',
  'Violao',
  'Chifres',
  'Pinguim',
  'Rabo',
  'Escova',
  'Celular',
  'Cachorro',
  'Pato',
  'Sofa',
  'Fotografo',
  'Bale',
  'Pipa',
  'Cafe',
  'Taxi',
  'Cadeira',
  'Onibus',
  'Elevador',
  'Bicicleta',
  'Fogao',
  'Copo',
  'Orelhas',
  'Chocolate',
  'Pescador',
  'Notebook',
  'Lapis'
]

const categorias = [
  'VEÍCULO',
  'ANIMAL',
  'OBJETO',
  'PESSOA',
  'ANIMAL',
  'ESPORTE',
  'ESPORTE',
  'EMOÇÃO',
  'ANIMAL',
  'ESPORTE',
  'OBJETO',
  'OBJETO',
  'AÇÃO',
  'ANIMAL',
  'ANIMAL',
  'FERRAMENTA',
  'INSTRUMENTO',
  'ANIMAL',
  'ANIMAL',
  'ANIMAL',
  'OBJETO',
  'TECNOLOGIA',
  'ANIMAL',
  'ANIMAL',
  'MOVÉIS',
  'PROFISSÃO',
  'DANÇA',
  'BRINQUEDO',
  'BEBIDA',
  'TRANSPORTE',
  'MOVÉIS',
  'TRANSPORTE',
  'TRANSPORTE',
  'TRANSPORTE',
  'ELETRODOMÉSTICO',
  'OBJETO',
  'CORPO',
  'ALIMENTO',
  'PROFISSÃO',
  'TECNOLOGIA',
  'OBJETO'
]

desenhoDaForca()
verificaTeclado()

btnAdd.addEventListener('click', () => {
  trocaTelaAdd()
})

btnVoltarJogo.addEventListener('click', () => {
  trocaTelaJogo()
})

btnReset.addEventListener('click', () => {
  location.reload()
})

btnResetModalVitoria.addEventListener('click', () => {
  location.reload()
})

btnResetModalDerrota.addEventListener('click', () => {
  location.reload()
})

sortearPalavra()
function sortearPalavra() {
  var index = Math.floor(Math.random() * palavras.length)
  palavraSorteada = palavras[index].toUpperCase()
  categoriaSorteada = categorias[index].toUpperCase()
}

montarPalavra()
function montarPalavra() {
  const divCategoria = document.querySelector('.categoria')
  divCategoria.innerHTML = categoriaSorteada

  const divPalavra = document.querySelector('.palavra')

  for (let i = 0; i < palavraSorteada.length; i++) {
    const divLetra = document.createElement('p')
    divLetra.classList.add('letra')
    divLetra.textContent = 'ㅤ'
    divPalavra.appendChild(divLetra)
    letrasPalavraSorteada.push(palavraSorteada[i])
  }
}

function verificaLetraEscolhida(letra) {
  if (erros > 0) {
    mudaEstilo('tecla-' + letra)
    comparaLetra(letra)
  }
}

function mudaEstilo(tecla) {
  const el = document.getElementById(tecla)

  el.style.background = '#757575'
}

function desenhoDaForca() {
  const quadro = document.querySelector('.quadro-forca')
  const pincel = quadro.getContext('2d')

  pincel.fillStyle = '#ccccf5'
  pincel.fillRect(0, 0, 300, 160)
  pincel.lineWidth = 2
  pincel.lineCap = 'round'
  pincel.strokeStyle = '#313168'
  pincel.stroke()

  //chão
  pincel.beginPath()
  pincel.moveTo(0, 120)
  pincel.lineTo(300, 120)
  pincel.stroke()
  pincel.closePath()

  //forca
  pincel.beginPath()
  pincel.moveTo(30, 120)
  pincel.lineTo(30, 20)
  pincel.lineTo(80, 20)
  pincel.lineTo(80, 30)
  pincel.stroke()
  pincel.closePath()

  //sol
  pincel.beginPath()
  pincel.fillStyle = '#fafafa'
  pincel.arc(280, 20, 20, 0, 2 * Math.PI)
  pincel.fill()
  pincel.closePath()
}

function comparaLetra(letra) {
  const posicao = letrasPalavraSorteada.indexOf(letra)

  if (posicao < 0) {
    if (!arrErradas.includes(letra)) {
      arrErradas.push(letra)
      erros--
      colocaLetraErrada()
      if (erros == 5) {
        desenhaCabeca()
      } else if (erros == 4) {
        desenhaTronco()
      } else if (erros == 3) {
        desenhaBracoDireito()
      } else if (erros == 2) {
        desenhaBracoEsquerdo()
      } else if (erros == 1) {
        desenhaPernaEsquerda()
      } else if (erros == 0) {
        desenhaPernaDireita()
      }
      //verifica tentativas
    }
  } else {
    for (let i = 0; i < letrasPalavraSorteada.length; i++) {
      if (letrasPalavraSorteada[i] == letra) {
        listaDinamica[i] = letra
        const divLetra = document.querySelectorAll('.letra')
        divLetra[i].textContent = letra
      }
    }
  }
  verificaStatus()
}

function verificaTeclado() {
  document.addEventListener('keydown', function (evento) {
    const codigo = evento.keyCode
    if (eLetra(codigo)) {
      const letraDigitada = evento.key.toUpperCase()
      if (erros > 0) {
        comparaLetra(letraDigitada)
        mudaEstilo('tecla-' + letraDigitada)
      }
    }
  })
}

function eLetra(codigo) {
  return codigo == 186 || (codigo >= 65 && codigo <= 90)
}

function verificaStatus() {
  let vitoria = true

  for (let i = 0; i < letrasPalavraSorteada.length; i++) {
    if (letrasPalavraSorteada[i] != listaDinamica[i]) {
      vitoria = false
    }
  }

  if (vitoria) {
    ganhar()
    erros = 0
  } else if (arrErradas.length == 6) {
    perder()
  }
}

function colocaLetraErrada() {
  const localLetrasErradas = document.querySelector('.letras-erradas')
  if (erros >= 0) {
    localLetrasErradas.textContent = arrErradas
  }
}

function desenhaCabeca() {
  const quadro = document.querySelector('.quadro-forca')
  const pincel = quadro.getContext('2d')

  pincel.beginPath()
  pincel.fillStyle = '#313168'
  pincel.lineWidth = 2
  pincel.lineCap = 'round'
  pincel.arc(80, 40, 10, 0, 2 * Math.PI)
  pincel.fill()
  pincel.closePath()
}

function desenhaTronco() {
  const quadro = document.querySelector('.quadro-forca')
  const pincel = quadro.getContext('2d')

  pincel.beginPath()
  pincel.lineWidth = 2
  pincel.lineCap = 'round'
  pincel.moveTo(80, 50)
  pincel.lineTo(80, 85)
  pincel.stroke()
  pincel.closePath()
}

function desenhaBracoDireito() {
  const quadro = document.querySelector('.quadro-forca')
  const pincel = quadro.getContext('2d')

  pincel.beginPath()
  pincel.lineWidth = 2
  pincel.lineCap = 'round'
  pincel.moveTo(80, 54)
  pincel.lineTo(70, 74)
  pincel.stroke()
  pincel.closePath()
}

function desenhaBracoEsquerdo() {
  const quadro = document.querySelector('.quadro-forca')
  const pincel = quadro.getContext('2d')

  pincel.beginPath()
  pincel.lineWidth = 2
  pincel.lineCap = 'round'
  pincel.moveTo(80, 54)
  pincel.lineTo(90, 74)
  pincel.stroke()
  pincel.closePath()
}

function desenhaPernaEsquerda() {
  const quadro = document.querySelector('.quadro-forca')
  const pincel = quadro.getContext('2d')

  pincel.beginPath()
  pincel.lineWidth = 2
  pincel.lineCap = 'round'
  pincel.moveTo(80, 85)
  pincel.lineTo(90, 105)
  pincel.stroke()
  pincel.closePath()
}

function desenhaPernaDireita() {
  const quadro = document.querySelector('.quadro-forca')
  const pincel = quadro.getContext('2d')

  pincel.beginPath()
  pincel.lineWidth = 2
  pincel.lineCap = 'round'
  pincel.moveTo(80, 85)
  pincel.lineTo(70, 105)
  pincel.stroke()
  pincel.closePath()
}

function trocaTelaJogo() {
  location.reload()
}

function trocaTelaAdd() {
  const areaAddPalavra = document.querySelector('.add-palavra')
  areaAddPalavra.classList.remove('desaparece')

  const areaForca = document.querySelector('.area-forca')
  areaForca.classList.add('desaparece')
}

function ganhar() {
  const divModal = document.querySelector('.modal-container')

  const modalVitoria = document.querySelector('.modal-vitoria')

  divModal.classList.add('mostrar')

  modalVitoria.classList.remove('desaparece')

  fechaModal()
}

function perder() {
  const divModal = document.querySelector('.modal-container')

  const modalDerrota = document.querySelector('.modal-derrota')

  const palavraCerta = document.querySelector('.palavra-certa')

  divModal.classList.add('mostrar')

  modalDerrota.classList.remove('desaparece')

  palavraCerta.textContent = palavraSorteada

  fechaModal()
}

function fechaModal() {
  const divModal = document.querySelector('.modal-container')
  const btnFecharVitoria = document.querySelector('#fechar-vitoria')
  const btnFecharDerrota = document.querySelector('#fechar-derrota')

  btnFecharVitoria.addEventListener('click', evento => {
    divModal.classList.remove('mostrar')
  })

  btnFecharDerrota.addEventListener('click', evento => {
    divModal.classList.remove('mostrar')
  })
}
