// import { Bodies, Body, Engine, Events, Render, Runner, World } from "matter-js";
const { Bodies, Body, Engine, Events, Render, Runner, World } = Matter;
import { GRADES_BASE } from "./grades.js";
import { ITEMS_BASE } from "./items.js";
// import "./dark.css";
import GamePopupController from "./gamePopupController.js";

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
      
    }
  }

  shake();
}


const world = engine.world;

const leftWall = Bodies.rectangle(15, 395, 30, 790, {
  isStatic: true,
  render: { fillStyle: "#E6B143" },
  isItem: false,
});

const rightWall = Bodies.rectangle(605, 395, 30, 790, {
  isStatic: true,
  render: { fillStyle: "#E6B143" },
  isItem: false,
});

const ground = Bodies.rectangle(310, 820, 620, 60, {
  isStatic: true,
  render: { fillStyle: "#E6B143" },
  isItem: false,
});

const topLine = Bodies.rectangle(310, 150, 620, 2, {
  name: "topLine",
  isStatic: true,
  isSensor: true,
  render: { fillStyle: "red" },
  isItem: false,
})

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
      
        if(Math.random() < 0.25){
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
          World.remove(world, [leftWall, rightWall, ground, topLine]);
          // Render와 Engine을 중지
          Engine.clear(engine);
          Render.stop(render);
          Runner.stop(runner);

          const popupController = new GamePopupController();
          popupController.showWinPopup();
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
            // 폭탄 충돌시 지진 효과 추가
            createEarthquakeEffect(1000, 6);
        }
        
      }
    }
    
    if (
      !disableAction &&
      (collision.bodyA.name === "topLine" || collision.bodyB.name === "topLine")) {
      clearInterval(earthquakeTimer);
      const popupController = new GamePopupController();
      popupController.showGameOver();
    }
  });
});




//20퍼센트 확률
// if(Math.random() < 0.2){
//   addItem();
// }else{
//   addGrade();
// }
addGrade();