
// 게임 시작 버튼 관련 코드
const gameButton = document.querySelector('.game-button');
gameButton.addEventListener('click', () => {
  window.location.href = 'game-select.html';
});

// 나가기 버튼 관련 코드
const exitButton = document.querySelector('.exit-button');
exitButton.addEventListener('click', () => {
  if (confirm('정말 나가시겠습니까?')) {
    window.close();
  }
});