// import { Bodies, Body, Engine, Events, Render, Runner, World } from "matter-js";
const { Bodies, Body, Engine, Events, Render, Runner, World } = Matter;
import { GRADES_BASE } from "./grades.js";
import GamePopupController from "./gamePopupController.js";

let GRADES = GRADES_BASE;

const engine = Engine.create();
const render = Render.create({
  engine,
  element: document.body,
  options: {
    wireframes: false,
    background: "white",
    width: 620,
    height: 850,
    textAlign: "center",
  }
});

const world = engine.world;

const leftWall = Bodies.rectangle(15, 395, 30, 790, {
  isStatic: true,
  render: { fillStyle: "#E6B143" }
});

const rightWall = Bodies.rectangle(605, 395, 30, 790, {
  isStatic: true,
  render: { fillStyle: "#E6B143" }
});

const ground = Bodies.rectangle(310, 820, 620, 60, {
  isStatic: true,
  render: { fillStyle: "#E6B143" }
});

const topLine = Bodies.rectangle(310, 150, 620, 2, {
  name: "topLine",
  isStatic: true,
  isSensor: true,
  render: { fillStyle: "red" }
})

World.add(world, [leftWall, rightWall, ground, topLine]);
Render.run(render);
const runner = Runner.create();
Runner.run(runner, engine);

let currentBody = null;
let currentGrade = null;
let disableAction = false;
let interval = null;

function addGrade() {
  const index = Math.floor(Math.random() * 3);
  const grade = GRADES[index];

  const body = Bodies.circle(300, 50, grade.radius, {
    index: index,
    isSleeping: true,
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

      setTimeout(() => {
        addGrade();
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
    if (collision.bodyA.index === collision.bodyB.index && collision.bodyA.index !== GRADES.length-1) {
      const index = collision.bodyA.index;
      console.log(index + 1)
      // if (index+1 === GRADES.length - 1) {
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

      const newGrade = GRADES[index + 1];

      const newBody = Bodies.circle(
        collision.collision.supports[0].x,
        collision.collision.supports[0].y,
        newGrade.radius,
        {
          render: {
            sprite: { texture: `${newGrade.name}.png` }
          },
          index: index + 1,
        }
      );

      World.add(world, newBody);
    }

    if (
      !disableAction &&
      (collision.bodyA.name === "topLine" || collision.bodyB.name === "topLine")) {
      const popupController = new GamePopupController();
      popupController.showGameOver();
    }
  });
});



addGrade();