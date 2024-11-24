const symbols = ['👦', '🧝‍♂️', '🧙‍♂️', '👸', '👑']; // Símbolos para as slots
const spinSound = document.getElementById('spinSound');
const winSound = document.getElementById('winSound'); // Som de vitória

// Inicializa o valor do depósito
let deposit = 0;
const depositElement = document.getElementById('deposit-value'); // Verifique se esse ID está correto no HTML

function startSpin() {
  let slot1 = document.getElementById('slot1');
  let slot2 = document.getElementById('slot2');
  let slot3 = document.getElementById('slot3');
  const winMessage = document.getElementById("win-message");

  // Duração do giro da roleta (2 segundos)
  const spinDuration = 2000; // 2 segundos
  const startTime = Date.now();

  // Reproduzir o som de girar
  spinSound.currentTime = 0; // Reinicia o áudio para garantir que comece do início
  spinSound.play();

  // Função para girar as slots até o tempo acabar
  function spinAnimation() {
    let currentTime = Date.now();
    let elapsedTime = currentTime - startTime;

    if (elapsedTime < spinDuration) {
      // Girar as slots com símbolos aleatórios durante o giro
      slot1.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      slot2.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      slot3.textContent = symbols[Math.floor(Math.random() * symbols.length)];

      // Continuar a animação
      requestAnimationFrame(spinAnimation);
    } else {
      // Após 2 segundos, exibe a mensagem de vitória se os três símbolos forem iguais
      stopSpin();
    }
  }

  // Iniciar a animação de girar
  spinAnimation();
}

function stopSpin() {
  let slot1 = document.getElementById('slot1');
  let slot2 = document.getElementById('slot2');
  let slot3 = document.getElementById('slot3');
  const winMessage = document.getElementById("win-message");

  // Parar o som
  spinSound.pause();
  spinSound.currentTime = 0; // Reinicia o áudio para garantir que comece do início

  // **Aumentando as chances de vitória**: Se a combinação de slots não for igual, ajustamos para sempre dar uma probabilidade maior de vencer.
  if (Math.random() < 0.8) { // 80% de chance de vitória
    // Se a condição de ganhar for atingida, as slots ficam iguais
    let randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
    slot1.textContent = randomSymbol;
    slot2.textContent = randomSymbol;
    slot3.textContent = randomSymbol;

    // Aumentar o depósito quando o jogador ganhar
    deposit += 10; // Exemplo: aumento de 10 no depósito
    depositElement.textContent = `$${deposit}`; // Atualiza a exibição do valor

    // Exibir a mensagem de vitória
    winMessage.style.display = 'block';

    // Tocar o som de vitória
    winSound.currentTime = 0; // Reinicia o áudio para garantir que ele comece do início
    winSound.play(); // Toca o som de vitória
  } else {
    // Se não ganhar, escolher símbolos aleatórios como resultado
    slot1.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    slot2.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    slot3.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    // Ocultar a mensagem de vitória
    winMessage.style.display = 'none';
  }

  // Habilitar o botão novamente após o giro
  const spinButton = document.querySelector('.spin-button');
  spinButton.disabled = false;
}

// Quando o botão for clicado, começa o giro
const spinButton = document.querySelector('.spin-button');
spinButton.addEventListener('click', () => {
  spinButton.disabled = true; // Desabilita o botão para evitar múltiplos cliques
  startSpin(); // Chama a função para iniciar o giro
});
