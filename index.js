document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const doodler = document.createElement("div");
  let platforms = [];
  let doodlerLeftSpace = 50;
  let isGameOver = false;
  let doodlerBottomPosition = 150;

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
      console.log(platforms);
    }
  }

  function movePlatformsVertically() {
    if (doodlerBottomPosition < 200) {
      platforms.forEach((platform) => {
        platform.bottom -= 4;
        let visual = platform.visual;
        visual.style.bottom = platform.bottom + "px";
        console.log(platforms);
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

  function start() {
    if (!isGameOver) {
      createPlatforms();
      createDoodler();
      setInterval(movePlatformsVertically, 30);
    }
  }

  start();
});
