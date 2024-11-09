// 튜토리얼 팝업 관련 코드
const tutorialButton = document.querySelector('.tutorial-button');
const tutorialPopup = document.querySelector('.tutorial-popup');
const closeButton = document.querySelector('.close-button');

tutorialButton.addEventListener('click', () => {
  tutorialPopup.style.display = 'block';
});

closeButton.addEventListener('click', () => {
  tutorialPopup.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target == tutorialPopup) {
    tutorialPopup.style.display = 'none';
  }
});

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