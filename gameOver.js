// gameOver.js
export function showGameOverModal() {
    const gameOverModal = document.createElement('div');
    gameOverModal.classList.add('game-over-modal');
  
    const gameOverContent = document.createElement('div');
    gameOverContent.classList.add('game-over-content');
  
    const retryButton = document.createElement('button');
    retryButton.textContent = 'Retry';
    retryButton.addEventListener('click', () => {
      gameOverModal.style.display = 'none';
      // Reset game state
      startGame();
    });
  
    const exitButton = document.createElement('button');
    exitButton.textContent = 'Exit';
    exitButton.addEventListener('click', () => {
      gameOverModal.style.display = 'none';
      gameStarted = false;
      showMainMenu();
    });
  
    gameOverContent.innerHTML = `
      <h2>Game Over</h2>
      <p>Your score didn't make the grade. Try again?</p>
    `;
  
    gameOverContent.appendChild(retryButton);
    gameOverContent.appendChild(exitButton);
    gameOverModal.appendChild(gameOverContent);
    document.body.appendChild(gameOverModal);
  }