var word = 'MUNDO'
var keyEmpty = '#fff'
var keyWrong = '#787c7f'
var keyRight = '#6ca965'
var keyRightPositionWrong = '#c8b653'
var buttons = document.getElementsByTagName('button');

//Váriavel para pegar todos os botões e adicionar no tabuleiro, ela funciona utilizando o event listener, botão i comçea o primeiro botão e atribui isso para todos os botões seguintes
for (var i = 0, len = buttons.length; i < len; ++i){
    buttons[i].addEventListener("click", function() {
        processKey(this.id);
  })}

// criou variaveis, percorre as divs e substitui nas que começam com cj. for criando um id para cada div.
// key valor zero na primeira vez que passa, for sempre começa no zero.
// pega os elemntos do teclado e salva nas divs
var divs = document.getElementsByTagName('div');
var caixas_jogo = [];
for (div of divs){
    if (div.id && div.id.startsWith("cj"))
        caixas_jogo.push(div)
}

// pegar a primeira caixa jogo vazia, com indice zero, percorre a partir de zeo na caixa jogo.
// se caixa jogo estiver vazio no html retorna
const getFirstEmpty = function(){
    let i = 0;
    for (key in caixas_jogo)
    {
        if (caixas_jogo[key].innerHTML == "")
            return i
        else
            i++
    }
    return 30;
}

// função para deletrar a letra , com a condição de que o primeiro vazio seja equivalente a zero, vai fazer com que a caixa jogo,
// pegue a primeira vazia menos uma para apagar a que estiver preenchida
function deletaLetra() {
        if (firstEmpty == 0)
            return;
        caixas_jogo[firstEmpty - 1].innerHTML = "";
        caixas_jogo[firstEmpty - 1].style.backgroundColor = keyEmpty
    }

// pegar a palavra do dia e e compara com a palavra digitada
function getCurrentWord(){
    let word = ''
    for (let i=firstEmpty - 5; i < firstEmpty; i++)
        word = word + caixas_jogo[i].innerHTML;
    return word

}

// pegar a palavra e pintar com a respectiva ordem estabelecida pela palavra do dia
//e comprar os valores atribuídos acima e de acordo com a posição pintar o quadrado
function paintWord(currentWord){
    for (let i = 0; i < 5; i++){
        let key = document.getElementById(currentWord[i])
        if (currentWord[i] == word[i])
        {
            caixas_jogo[firstEmpty - 5 + i].style.backgroundColor = keyRight
            key.style.backgroundColor = keyRight

        }
        else if (word.indexOf(currentWord[i]) > -1)
        {
            caixas_jogo[firstEmpty - 5 + i].style.backgroundColor = keyRightPositionWrong
            key.style.backgroundColor = keyRightPositionWrong
        }
        else
        {
            caixas_jogo[firstEmpty - 5 + i].style.backgroundColor = keyWrong;
            key.style.backgroundColor = keyWrong
        }
    }
}

//validar a palavra acima, se for igual 1 a primeira vazia ela retorna e não continua, agora se o resto da divisão por 5 for igual a zero
// da divisão por
function validateTry(){
    if (firstEmpty == 0)
        return;

    if ((firstEmpty % 5) == 0){
        let currentWord = getCurrentWord()

        paintWord(currentWord)
        if (currentWord == word){
            startConfetti();
            alert('Você acertou!')

            //document.location.reload(true)
        }
    }

    return true
}

//função que processa a chave( o valor que eu quero) considerando as funções pre estabelecidas
//

function processKey(key){

    let validated = false

    firstEmpty = getFirstEmpty();
    if (key == "BACKSPACE"){
        deletaLetra()
        return
    }
    if (key == "ENTER"){
        validated = validateTry()
        return

    }
    /*if ((firstEmpty > 0) && (firstEmpty % 5 == 0) && !validated)
        return*/

    console.log(key)

    if (firstEmpty <= 29) {
        caixas_jogo[firstEmpty].innerHTML = key;
    }
}

// para processar as letras do teclado de acordo com a tabela ascii
document.addEventListener('keydown', function (e) {
    let key = e.key.toLocaleUpperCase()
    if ((key=='ENTER') || (key=='BACKSPACE') || (key.length == 1 && key >= 'A' && key <= 'Z'))  {
        processKey(e.key.toUpperCase())
    }
})

// limitar as letras por linha