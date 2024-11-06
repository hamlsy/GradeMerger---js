export function showTutorial() {
    const tutorialModal = document.createElement('div');
    tutorialModal.classList.add('tutorial-modal');
  
    const tutorialContent = document.createElement('div');
    tutorialContent.classList.add('tutorial-content');
  
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.addEventListener('click', () => {
      tutorialModal.style.display = 'none';
    });
  
    tutorialContent.innerHTML = `
      <h2>Game Rules</h2>
      <p>Use A, S, D to control the fruit.</p>
      <img src="base/F.png" alt="F Grade"> <span>F Grade</span>
      <img src="base/D.png" alt="D Grade"> <span>D Grade</span>
      <img src="base/C.png" alt="C Grade"> <span>C Grade</span>
      <img src="base/B.png" alt="B Grade"> <span>B Grade</span>
      <img src="base/A.png" alt="A Grade"> <span>A Grade</span>
      <img src="base/A_plus.png" alt="A+ Grade"> <span>A+ Grade</span>
    `;
  
    tutorialContent.appendChild(closeButton);
    tutorialModal.appendChild(tutorialContent);
    document.body.appendChild(tutorialModal);
  }
  