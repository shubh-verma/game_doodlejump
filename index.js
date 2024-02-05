document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const doodler = document.createElement("div");
  let platforms = [];
  let doodlerLeftSpace = 50;
  let isGameOver = false;
  let startPoint = 150;
  let doodlerBottomPosition = startPoint;
  let score = 0;
  let isJumping = true;
  let isGoingLeft = false;
  let isGoingRight = false;
  let upTimerId;
  let downTimerId;
  let leftTimerId;
  let rightTimerId;

  class Platform {
    constructor(newPlatform) {
      this.left = Math.random() * 315;
      this.bottom = newPlatform;
      this.visual = document.createElement("div");

      const visual = this.visual;
      visual.classList.add("platform");
      visual.style.left = this.left + "px";
      visual.style.bottom = this.bottom + "px";
      grid.appendChild(visual);
    }
  }

  function createPlatforms() {
    for (let i = 0; i < 5; i++) {
      let platFormGap = 600 / 5;
      let newPlatformBottom = 100 + platFormGap * i;
      let newPlatform = new Platform(newPlatformBottom);
      platforms.push(newPlatform);
      // console.log(platforms);
    }
  }

  function movePlatformsVertically() {
    if (doodlerBottomPosition < 200) {
      platforms.forEach((platform) => {
        platform.bottom -= 4;
        let visual = platform.visual;
        visual.style.bottom = platform.bottom + "px";

        if (platform.bottom < 10) {
          let firstPlatform = platforms[0].visual;
          firstPlatform.classList.remove("platform");
          platforms.shift(platforms);
          score++;
          let newPlatform = new Platform(600);
          platforms.push(newPlatform);
        }
      });
    }
    console.log(doodlerBottomPosition);
  }

  function createDoodler() {
    grid.appendChild(doodler);
    doodler.classList.add("doodler");
    doodlerLeftSpace = platforms[0].left;
    doodler.style.left = doodlerLeftSpace + "px";
    doodler.style.bottom = doodlerBottomPosition + "px";
  }
  function jump() {
    isJumping = true;
    clearTimeout(downTimerId);
    upTimerId = setInterval(() => {
      doodlerBottomPosition += 20;
      doodler.style.bottom = doodlerBottomPosition + "px";
      if (doodlerBottomPosition > startPoint + 200) {
        fall();
        isJumping = false;
      }
    }, 30);
  }

  function fall() {
    isJumping = false;
    clearTimeout(upTimerId);
    downTimerId = setInterval(() => {
      doodlerBottomPosition -= 5;
      doodler.style.bottom = doodlerBottomPosition + "px";
      if (doodlerBottomPosition <= 0) {
        gameOver();
      }
    }, 20);
  }
  function moveLeft() {
    if (isGoingRight) {
      clearInterval(rightTimerId);
      isGoingRight = false;
    }
    isGoingLeft = true;
    leftTimerId = setInterval(function () {
      if (doodlerLeftSpace >= 0) {
        console.log("going left");
        doodlerLeftSpace -= 5;
        doodler.style.left = doodlerLeftSpace + "px";
      } else moveRight();
    }, 20);
  }

  function moveRight() {
    if (isGoingLeft) {
      clearInterval(leftTimerId);
      isGoingLeft = false;
    }
    isGoingRight = true;
    rightTimerId = setInterval(function () {
      if (doodlerLeftSpace <= 313) {
        console.log("going right");
        doodlerLeftSpace += 5;
        doodler.style.left = doodlerLeftSpace + "px";
      } else moveLeft();
    }, 20);
  }

  function moveStraight() {
    isGoingLeft = false;
    isGoingRight = false;
    clearInterval(leftTimerId);
    clearInterval(rightTimerId);
  }

  function control(e) {
    doodler.style.bottom = doodlerBottomPosition + "px";
    if (e.key === "ArrowLeft") {
      moveLeft();
    } else if (e.key === "ArrowRight") {
      moveRight();
    } else if (e.key === "ArrowUp") {
      moveStraight();
    }
  }
  function gameOver() {
    isGameOver = true;
    while (grid.firstChild) {
      grid.removeChild(grid.firstChild);
    }
    grid.innerHTML = score;
    clearInterval(downTimerId);
    clearInterval(upTimerId);
    clearInterval(leftTimerId);
    clearInterval(rightTimerId);
  }

  function start() {
    if (!isGameOver) {
      createPlatforms();
      createDoodler();
      setInterval(movePlatformsVertically, 30);
      fall();
      jump(startPoint);
      document.addEventListener("keyup", control);
    }
  }

  start();
});
