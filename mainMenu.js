export function showMainMenu() {
    const mainMenu = document.createElement('div');
    mainMenu.classList.add('main-menu');
  
    const startButton = document.createElement('button');
    startButton.textContent = 'Start Game';
    startButton.addEventListener('click', () => {
      mainMenu.style.display = 'none';
      startGame();
    });
  
    const tutorialButton = document.createElement('button');
    tutorialButton.textContent = 'Tutorial';
    tutorialButton.id = "tutorial";
    tutorialButton.addEventListener('click', () => {
        console.log("??")
        showTutorial();
    });
  
    const exitButton = document.createElement('button');
    exitButton.textContent = 'Exit';
    exitButton.addEventListener('click', () => {
      window.close();
    });
  
    mainMenu.appendChild(startButton);
    mainMenu.appendChild(tutorialButton);
    mainMenu.appendChild(exitButton);
  
    document.body.appendChild(mainMenu);
  }

function showTutorial(){
    console.log("??")
    tutorialModal = document.getElementById("tutorial");
    if(tutorialModal.style.display === "none"){
        tutorialModal.style.display = "block";
    }else{
        tutorialModal.style.display = "none";
    }
}
  