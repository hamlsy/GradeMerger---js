import { Bodies, Body, Engine, Events, Render, Runner, World } from "matter-js";
import { GRADES_BASE } from "./grades";
import { ITEMS_BASE } from "./items";
import "./dark.css";

let GRADES = GRADES_BASE;
let ITEMS = ITEMS_BASE;
const engine = Engine.create();
const render = Render.create({
  engine,
  element: document.body,
  options: {
    wireframes: false,
    background: "white",
    width: 620,
    height: 850,
    textAlign: "center"
  }
});

//지진 효과
// 타이머 UI 생성
const timerDiv = document.createElement('div');
timerDiv.style.position = 'fixed';
timerDiv.style.top = '80px';
timerDiv.style.right = '20px';
timerDiv.style.fontSize = '24px';
timerDiv.style.fontWeight = 'bold';
timerDiv.style.color = 'red';
timerDiv.style.zIndex = '1000';
document.body.appendChild(timerDiv);

let timeLeft = 20;
let groundHeight = 820; // 초기 지면 높이


let isEarthquaking = false; // 지진/지면 상승 진행 중 여부
const GROUND_RISE_AMOUNT = 20; // 한 번에 올라갈 높이
const GROUND_RISE_DURATION = 2000; // 지면 상승에 걸리는 시간 (ms)

// 타이머 업데이트 함수
function updateTimer() {
  timerDiv.textContent = `Next Earthquak.. ${timeLeft}sec`;
}

// 지진 효과 함수
function createEarthquakeEffect(duration = 1000, intensity = 5) {
  const startTime = Date.now();
  const originalPositions = {
    leftWall: { x: leftWall.position.x, y: leftWall.position.y },
    rightWall: { x: rightWall.position.x, y: rightWall.position.y },
    ground: { x: ground.position.x, y: ground.position.y }
  };

  function shake() {
    const elapsed = Date.now() - startTime;
    if (elapsed < duration) {
      const progress = elapsed / duration;
      // 시간이 지날수록 강도가 감소하는 효과
      const currentIntensity = intensity * (1 - progress);
      
      const offsetX = (Math.random() - 0.5) * currentIntensity;
      const offsetY = (Math.random() - 0.5) * currentIntensity;

      Body.setPosition(leftWall, {
        x: originalPositions.leftWall.x + offsetX,
        y: originalPositions.leftWall.y + offsetY
      });
      Body.setPosition(rightWall, {
        x: originalPositions.rightWall.x + offsetX,
        y: originalPositions.rightWall.y + offsetY
      });
      Body.setPosition(ground, {
        x: originalPositions.ground.x + offsetX,
        y: originalPositions.ground.y + offsetY
      });

      requestAnimationFrame(shake);
    } else {
      // 원래 위치로 복귀 후 지면 상승 시작
      Body.setPosition(leftWall, originalPositions.leftWall);
      Body.setPosition(rightWall, originalPositions.rightWall);
      Body.setPosition(ground, originalPositions.ground);
      smoothGroundRise();
    }
  }

  shake();
}

// 부드러운 지면 상승 함수
function smoothGroundRise() {
  const startHeight = groundHeight;
  const targetHeight = groundHeight - GROUND_RISE_AMOUNT;
  const startTime = Date.now();
   // 벽의 초기 위치 저장
   const leftWallStartY = leftWall.position.y;
   const rightWallStartY = rightWall.position.y;
  function animate() {
    const currentTime = Date.now();
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / GROUND_RISE_DURATION, 1);

    // easeOutQuad 이징 함수 사용
    const easeProgress = 1 - (1 - progress) * (1 - progress);
    
    const currentHeight = startHeight - (GROUND_RISE_AMOUNT * easeProgress);
    const wallOffset = (GROUND_RISE_AMOUNT * easeProgress) / 2;

    // 땅과 벽 위치 업데이트
    Body.setPosition(ground, {
      x: ground.position.x,
      y: currentHeight
    });

    // 벽도 함께 이동
    Body.setPosition(leftWall, {
      x: leftWall.position.x,
      y: leftWallStartY - wallOffset
    });
    
    Body.setPosition(rightWall, {
      x: rightWall.position.x,
      y: rightWallStartY - wallOffset
    });

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      groundHeight = targetHeight;
      isEarthquaking = false; // 모든 동작 완료
    }
  }

  animate();
}


// 20초마다 실행되는 지진 + 땅 상승 효과
function startEarthquakeTimer() {
  timeLeft = 2;
  updateTimer();

  const timer = setInterval(() => {
    timeLeft--;
    updateTimer();

    if (timeLeft <= 0 && !isEarthquaking) {
      isEarthquaking = true;
      createEarthquakeEffect(2000, 8);
      timeLeft = 2;
    }
  }, 1000);

  return timer;
}
const world = engine.world;

const leftWall = Bodies.rectangle(15, 395, 30, 790, {
  isStatic: true,
  render: { fillStyle: "#4E3629" },
  isItem: false,
});

const rightWall = Bodies.rectangle(605, 395, 30, 790, {
  isStatic: true,
  render: { fillStyle: "#4E3629" },
  isItem: false,
});

const ground = Bodies.rectangle(310, 820, 620, 60, {
  isStatic: true,
  render: { fillStyle: "#4E3629" },
  isItem: false,
});

const topLine = Bodies.rectangle(310, 150, 620, 2, {
  name: "topLine",
  isStatic: true,
  isSensor: true,
  render: { fillStyle: "red" },
  isItem: false,
})
// 폭탄 충돌 효과 (더 짧고 약한 지진)
function createBombEffect() {
  const startTime = Date.now();
  const duration = 500; // 더 짧은 지진
  const intensity = 4; // 더 약한 강도
  
  const originalPositions = {
    leftWall: { x: leftWall.position.x, y: leftWall.position.y },
    rightWall: { x: rightWall.position.x, y: rightWall.position.y },
    ground: { x: ground.position.x, y: ground.position.y }
  };

  function shake() {
    if (Date.now() - startTime < duration) {
      const offsetX = (Math.random() - 0.5) * intensity;
      const offsetY = (Math.random() - 0.5) * intensity;

      Body.setPosition(leftWall, {
        x: originalPositions.leftWall.x + offsetX,
        y: originalPositions.leftWall.y + offsetY
      });
      Body.setPosition(rightWall, {
        x: originalPositions.rightWall.x + offsetX,
        y: originalPositions.rightWall.y + offsetY
      });
      Body.setPosition(ground, {
        x: originalPositions.ground.x + offsetX,
        y: originalPositions.ground.y + offsetY
      });

      requestAnimationFrame(shake);
    } else {
      // 원래 위치로 복귀
      Body.setPosition(leftWall, originalPositions.leftWall);
      Body.setPosition(rightWall, originalPositions.rightWall);
      Body.setPosition(ground, originalPositions.ground);
    }
  }

  shake();
}
World.add(world, [leftWall, rightWall, ground, topLine]);
Render.run(render);
const runner = Runner.create();
Runner.run(runner, engine);

let currentBody = null;
let currentGrade = null;
let disableAction = false;
let interval = null;
let currentItem = null;

function addItem(){
  let index = 0;
  if(Math.random() < 0.4){
    index = 1;
  }
  const item = ITEMS[index];
  let body = Bodies.circle(300, 50, item.radius, {
    index: index,
    isSleeping: true,
    isItem: true,
    render: {
      sprite: { texture: `${item.name}.png` }
    },
    restitution: 0.2,
  });

  currentBody = body;
  World.add(world, body);
}

function addGrade() {
  const index = Math.floor(Math.random() * 3);
  const grade = GRADES[index];

  const body = Bodies.circle(300, 50, grade.radius, {
    index: index,
    isSleeping: true,
    isItem: false,
    isGrade: true,
    render: {
      sprite: { texture: `${grade.name}.png` }
    },
    restitution: 0.2,
  });

  currentBody = body;
  currentGrade = grade;

  World.add(world, body);
}

window.onkeydown = (event) => {
  if (disableAction) {
    return;
  }

  switch (event.code) {
    case "KeyA":
        if (interval)
            return;

        interval = setInterval(() => {
            if (currentBody.position.x - currentGrade.radius > 30)
            Body.setPosition(currentBody, {
                x: currentBody.position.x - 1,
                y: currentBody.position.y,
            });
      }, 5);
      break;

    case "KeyD":
      if (interval)
        return;

      interval = setInterval(() => {
        if (currentBody.position.x + currentGrade.radius < 590)
        Body.setPosition(currentBody, {
          x: currentBody.position.x + 1,
          y: currentBody.position.y,
        });
      }, 5);
      break;

    case "KeyS":
      currentBody.isSleeping = false;
      disableAction = true;
      //확률로 grade와 item 떨어뜨리기
      setTimeout(() => {
        //20퍼센트 확률
      
        if(Math.random() < 0.3){
          addItem();
        }else{
          addGrade();
        }
        
        disableAction = false;
      }, 1000);
      break;
  }
}

window.onkeyup = (event) => {
  switch (event.code) {
    case "KeyA":
    case "KeyD":
      clearInterval(interval);
      interval = null;
  }
}
let aGrades = 0; // A+ 공 개수를 세기 위한 변수

Events.on(engine, "collisionStart", (event) => {
  event.pairs.forEach((collision) => { 
    //성적일때
    if (collision.bodyA.index === collision.bodyB.index 
      && collision.bodyA.isItem == false && collision.bodyB.isItem == false && collision.bodyA.index !== GRADES.length-1) {
      const index = collision.bodyA.index;
      
      if (index+1 === GRADES.length - 1) {
        // A+ 공이 3개 이상이면 승리 팝업 표시
        aGrades += 1;
        if (aGrades >= 3) {
          console.log("win!!!!");
          const winPopup = document.getElementById("winPopup");
          const gameWindow = document.getElementById("gameWindow");
          winPopup.style.display = "block";

          World.remove(world, [leftWall, rightWall, ground, topLine]);
          // Render와 Engine을 중지
          Engine.clear(engine);
          Render.stop(render);
          Runner.stop(runner);
          return;
        }
        
      }
      World.remove(world, [collision.bodyA, collision.bodyB]);

      let newGrade = GRADES[index + 1];

      let newBody = Bodies.circle(
        collision.collision.supports[0].x,
        collision.collision.supports[0].y,
        newGrade.radius,
        { 
          isItem: false,
          isGrade: true,
          render: {
            sprite: { texture: `${newGrade.name}.png` }
          },
          index: index + 1,
        }
      );

      World.add(world, newBody);
    }
    //아이템일때
    else if(collision.bodyA.isItem == true || collision.bodyB.isItem == true){
      console.log("bb");
      var index = '';
      var gradeIndex = '';
      var itemIndex = '';
      console.log(collision.bodyA.isItem, collision.bodyB.isItem)
      if(collision.bodyA.isItem == true && collision.bodyB.isGrade == true){
        index = collision.bodyA.index;
        gradeIndex = collision.bodyB.index;
        itemIndex = collision.bodyA.index;
      }
      else if(collision.bodyB.isItem == true && collision.bodyA.isGrade == true){
        index = collision.bodyB.index;
        gradeIndex = collision.bodyA.index;
        currentItem = collision.bodyB;
        itemIndex = collision.bodyB.index;
      }
      
      //해당 grade 가 A 미만일 때만 영향을 받음
      if(gradeIndex < GRADES.length-2){
        //task 일 때
        if(itemIndex == 0 && index !== '' && gradeIndex !== ''){
          //충돌된 성적 인덱스
          console.log("task attack!!")
          World.remove(world, [collision.bodyA, collision.bodyB]);

          var newGrade = GRADES[gradeIndex];
          if(gradeIndex >= 1){
            console.log("grade index " + gradeIndex)
            newGrade = GRADES[gradeIndex - 1];
            const newBody = Bodies.circle(
              collision.collision.supports[0].x,
              collision.collision.supports[0].y,
              newGrade.radius,
              {
                isGrade: true,
                isItem: false,
                render: {
                  sprite: { texture: `${newGrade.name}.png` }
                },
                index: gradeIndex - 1,
              }
            );
            World.add(world, newBody);
          }else{
            newGrade = GRADES[gradeIndex];
            const newBody = Bodies.circle(
              collision.collision.supports[0].x,
              collision.collision.supports[0].y,
              newGrade.radius,
              {
                isGrade: true,
                isItem: false,
                render: {
                  sprite: { texture: `${newGrade.name}.png` }
                },
                index: gradeIndex,
              }
            );
            World.add(world, newBody);
          }
          
        }else if(itemIndex == 1 && index !== '' && gradeIndex !== ''){
          //A 미만일 때만 폭파
            World.remove(world, [collision.bodyA, collision.bodyB]);
          createBombEffect();
        }
        
      }
    }
    if (
      !disableAction &&
      (collision.bodyA.name === "topLine" || collision.bodyB.name === "topLine")) {
      alert("Game over");
      clearInterval(earthquakeTimer);
    }
  });
});

// 게임 시작시 타이머 시작
const earthquakeTimer = startEarthquakeTimer();

//20퍼센트 확률
// if(Math.random() < 0.2){
//   addItem();
// }else{
//   addGrade();
// }
addGrade();