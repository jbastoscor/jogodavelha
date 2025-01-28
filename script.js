const board = document. getElementById('board'); // Pega o tabuleiro
const statusText = document. getElementById('status'); // Pega o status
const restartButton = document. getElementById('restartButton');   // Pega o botão de reiniciar

let currentPlayer = 'X'; // Variável que armazena o jogador atual, que é 'X'..
  let isGameActive = true; // Variável que armazena se o jogo está ativo ou não, nesse caso, o jogo está ativo.
  let boardState = new Array(9).fill(''); // Array que armazena o estado do tabuleiro, preenchido com 9 posições vazias.

  const winningCombinations = [ // Array que armazena todas as combinações vencedoras
  [0,1,2], // Linha 1, combinação vencedora
  [3,4,5], // Linha 2, combinação vencedora
  [6,7,8], // Linha 3, combinação vencedora

  [0,3,6], // Coluna 1, combinação vencedora
  [1,4,7], // Coluna 2, combinação vencedora
  [2,5,8], // Coluna 3, combinação vencedora
  
  [0,4,8], // Diagonal 1, combinação vencedora
  [2,4,6], // Diagonal 2, combinação vencedora
  ];

function createdBoard() { // Criando o tabuleiro
  board.innerHTML = ''; // Limpa o tabuleiro
  boardState.forEach((value, index) => { // Cria as células do tabuleiro. ForEach é um método que executa uma função para cada item de um array
    const cell = document.createElement('div'); // Cria a célula do tabuleiro, que será um elemento div, por isso o createElement('div')!
    cell.classList.add('cell'); // Adiciona a classe cell à célula, cell será a classe que estilizará a célula no CSS!
    cell.dataset.index = index; // Adiciona o índice da célula, datasheet é um atributo que permite armazenar dados adicionais em um elemento HTML!!
    cell.addEventListener('click', handleCellClick); // Adiciona um evento de clique à célula, handleCellClick é uma função que será chamada quando a célula for clicada!
    board.appendChild(cell); // Adiciona a célula ao tabuleiro 
});
}

function handleCellClick(event) { // Função que será chamada quando uma célula for clicada. event é o evento que ocorreu, no caso, o clique!
  const cell = event.target; // Pega se a célula clicada, target é o elemento que disparou o evento, no caso, a célula clicada... é o alvo.
  const index = cell.dataset.index; // Pega o índice da célula clicada, que é o índice armazenado no datasheet da célula que fica dentro do tabuleiro! Nisso, sabemos qual célula foi clicada a partir do índice!

  if (boardState[index]  || !isGameActive) return; // Se a célula clicada que é representada pelo índice index,  já estiver preenchida ou o jogo não estiver ativo, a função é encerrada pelo return! 

  boardState[index] = currentPlayer; // currentPlayer é uma variável que armazena o jogador atual, que é 'X' ou 'O'. O índice index da boardState é preenchido com o currentPlayer, ou seja, a célula é preenchida com o currentPlayer!
  cell.textContent = currentPlayer; // textcontent é o texto dentro da célula, que é preenchido com o currentPlayer, ou seja, 'X' ou 'O'. 
  cell.classList.add('taken'); // Adiciona a classe taken à célula, taken é a classe que estilizará a célula preenchida no CSS!

  if (checkWinner()) { // Se houver um vencedor, a função checkWinner() retorna true, então...
    statusText.textContent = `  Jogador ${currentPlayer} venceu a partida!`; // O status é preenchido com a mensagem de vitória do jogador atual!
    isGameActive = false; // O jogo é encerrado. isgameactive é uma variável que armazena se o jogo está ativo ou não, nesse caso, o jogo é encerrado porque já temos um vencedor.
    return; // A função é encerrada pelo return quando há um vencedor.
  }

  if (boardState.every(cell => cell)){ // Se todas as células do tabuleiro estiverem preenchidas e não houver um vencedor, a função checkWinner() retorna false
    statusText.textContent = 'Empate!'; // O status é preenchido com a mensagem de empate!
    isGameActive = false; // O jogo é encerrado. isgameactive é uma variável que armazena se o jogo está ativo ou não, nesse caso, o jogo é encerrado porque já temos um empate.
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Se o currentPlayer for igual a 'X', ele passa a ser 'O', se não, ele passa a ser 'X'. Ou seja, o currentPlayer é alternado entre 'X' e 'O' pelo operador ternário (? ) que é uma forma simplificada de if else. 
  statusText.textContent = `Jogador ${currentPlayer} é o próximo`; // O status é preenchido com a mensagem de que o próximo jogador é o currentPlayer, que é 'X' ou 'O'.
}

  function checkWinner (){ // Função que verifica se há um vencedor
    return winningCombinations.some(combination => { // Retorna true se houver um vencedor, some é um método que verifica se pelo menos um item de um array satisfaz uma condição
     const [a,b,c] = combination; // Destruturação do array combination, a,b e c são as posições do array combination
     return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]; // Retorna true se as posições a, b e c da boardState forem preenchidas e iguais, ou seja, se houver um vencedor
      } );
    
  }

  function restartGame () { // Função que reinicia o jogo
    currentPlayer = 'X'; // O jogador atual é 'X'
    isGameActive = true; // O jogo está ativo
    boardState = new Array(9).fill(''); // O tabuleiro é preenchido com 9 posições vazias
    statusText.textContent = `Jogador ${currentPlayer} é o próximo`; // O status é preenchido com a mensagem de que o jogador atual é 'X'
    createdBoard(); // O tabuleiro é criado
  }

  restart.addEventListener('click', restartGame); // Adiciona um evento de clique ao botão de reiniciar, que chama a função restartGame quando clicado!
  createdBoard(); // O tabuleiro é criado pela primeira vez