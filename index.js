document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const doodler = document.createElement("div");
  let platforms = [];
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
      let newPlatform = 100 + platFormGap * i;
      let newPlatforms = new Platform(newPlatform);
      platforms.push(newPlatforms);
      console.log(platforms);
    }
  }

  createPlatforms();

  function createDoodler() {
    grid.appendChild(doodler);
    doodler.classList.add("doodler");
    doodler.style.bottom = doodlerBottomPosition + "px";
  }
  createDoodler();
});
