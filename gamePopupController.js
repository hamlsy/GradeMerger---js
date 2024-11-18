export default class GamePopupController {
    constructor() {
      this.initializeElements();
      this.initializeEventListeners();
    }
  
    initializeElements() {
      // 팝업 요소들
      this.gameOverPopup = document.querySelector('.game-over-popup');
      this.quitConfirmPopup = document.querySelector('.quit-confirm-popup');
      this.winPopup = document.getElementById('winPopup');
  
      // 버튼 요소들
      this.backButton = document.querySelector('.back-button');
      this.retryButton = document.querySelector('.retry-button');
      this.quitButtons = document.querySelectorAll('.quit-button');
      this.cancelButton = document.getElementById('cancelQuit');
      this.closeWinButton = document.querySelector('.win-popup .close-button');
      this.nextStageButton = document.querySelector('.next-button');
    }
  
    initializeEventListeners() {
      // 뒤로가기 버튼
      this.backButton?.addEventListener('click', (e) => {
        e.preventDefault();
        this.showQuitConfirm();
      });
  
      // 게임오버 팝업 버튼들
      this.retryButton?.addEventListener('click', () => this.retryGame());
      this.quitButtons.forEach(button => {
        button.addEventListener('click', () => this.quitGame());
      });
  
      // 취소 버튼
      this.cancelButton?.addEventListener('click', () => this.hideQuitConfirm());
  
      // 승리 팝업 버튼들
      this.closeWinButton?.addEventListener('click', () => this.hideWinPopup());
      this.nextStageButton?.addEventListener('click', () => this.goToNextStage());
    }
  
    // 게임오버 팝업 표시
    showGameOver() {
      this.gameOverPopup.classList.add('active');
    }
  
    // 게임오버 팝업 숨기기
    hideGameOver() {
      this.gameOverPopup.classList.remove('active');
    }
  
    // 나가기 확인 팝업 표시
    showQuitConfirm() {
      this.quitConfirmPopup.classList.add('active');
    }
  
    // 나가기 확인 팝업 숨기기
    hideQuitConfirm() {
      this.quitConfirmPopup.classList.remove('active');
    }
  
    // 승리 팝업 표시
    showWinPopup() {
      this.winPopup.classList.add('show');
      this.createFireworks();
    }
  
    // 승리 팝업 숨기기
    hideWinPopup() {
      this.winPopup.classList.remove('show');
    }
  
    // 폭죽 효과 생성
    createFireworks() {
      const popup = this.winPopup;
      
      const createFirework = () => {
        const firework = document.createElement('div');
        firework.className = 'firework';
        
        const colors = ['#ffd700', '#ff4444', '#44ff44', '#4444ff'];
        const left = Math.random() * 100;
        firework.style.left = `${left}%`;
        firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        popup.appendChild(firework);
        
        firework.addEventListener('animationend', () => {
          firework.remove();
        });
      };
      
      let fireworksCount = 0;
      const fireworksInterval = setInterval(() => {
        createFirework();
        fireworksCount++;
        
        if (fireworksCount >= 15) {
          clearInterval(fireworksInterval);
        }
      }, 300);
    }
  
    // 게임 재시작
    retryGame() {
      location.reload();
    }
  
    // 게임 종료
    quitGame() {
      window.location.href = 'game-select.html';
    }
  
  }
  
  // 팝업 컨트롤러 인스턴스 생성
const popupController = new GamePopupController();

// 외부에서 사용할 수 있도록 전역으로 내보내기
window.popupController = popupController;