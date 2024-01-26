//creating canvas element
const canvas = document.querySelector("canvas");
//creating context
const context = canvas.getContext("2d");

//Giving height and with to our canvas element
canvas.width = 1024;
canvas.height = 576;

//creating the instance of the canvas element
context.fillRect(0, 0, canvas.width, canvas.height);

//Creating gravity to pull our players to the bottom of the canvas
const gravity = 0.7;

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "src/background.png",
});

const shop = new Sprite({
  position: {
    x: 630,
    y: 127,
  },
  imageSrc: "src/shop.png",
  scale: 2.75,
  maxFrames: 6,
});

//Selected player 1
const firstPlayer = new Fighter({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  color: "blue",
  offset: {
    x: 0,
    y: 0,
  },
  attacks: {
    simple: 10,
    strong: 20,
    super: 35,
  },
});

//Selected player 2
const secondPlayer = new Fighter({
  position: {
    x: 400,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  color: "red",
  offset: {
    x: -50,
    y: 0,
  },
  attacks: {
    simple: 10,
    strong: 20,
    super: 35,
  },
});

const keys = {
  //First player keys
  ArrowRight: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowUp: {
    pressed: false,
  },
  //Second player keys
  s6: {
    pressed: false,
  },
  s4: {
    pressed: false,
  },
  s8: {
    pressed: false,
  },
};

decreaseTimer();

//Function that loops over itself to create the continous animation
function animate() {
  window.requestAnimationFrame(animate);
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);

  background.update();
  shop.update();
  firstPlayer.update();
  secondPlayer.update();

  firstPlayer.velocity.x = 0;
  if (keys.ArrowRight.pressed && firstPlayer.lastKey === "ArrowRight") {
    firstPlayer.velocity.x = 5;
  } else if (keys.ArrowLeft.pressed && firstPlayer.lastKey === "ArrowLeft") {
    firstPlayer.velocity.x = -5;
  }

  secondPlayer.velocity.x = 0;
  if (keys.s6.pressed && secondPlayer.lastKey === "s6") {
    secondPlayer.velocity.x = 5;
  } else if (keys.s4.pressed && secondPlayer.lastKey === "s4") {
    secondPlayer.velocity.x = -5;
  }

  handlePlayerAttack(firstPlayer, secondPlayer, "fp");
  handlePlayerAttack(secondPlayer, firstPlayer, "sp");

  checkEndGame();
}

animate();

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    //First player movement keys
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      firstPlayer.lastKey = "ArrowRight";
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      firstPlayer.lastKey = "ArrowLeft";
      break;
    case "ArrowUp":
      firstPlayer.velocity.y = -12;
      break;
    case "x":
      firstPlayer.attack();
      firstPlayer.attack_type = "simple";
      break;
    case "c":
      firstPlayer.attack();
      firstPlayer.attack_type = "strong";
      break;
    case " ":
      firstPlayer.attack();
      firstPlayer.attack_type = "super";
      break;

    //Second player movement keys
    case "6":
      keys.s6.pressed = true;
      secondPlayer.lastKey = "s6";
      break;
    case "4":
      keys.s4.pressed = true;
      secondPlayer.lastKey = "s4";
      break;
    case "8":
      secondPlayer.velocity.y = -12;
      break;
    case "1":
      secondPlayer.attack();
      secondPlayer.attack_type = "simple";
      break;
    case "2":
      secondPlayer.attack();
      secondPlayer.attack_type = "strong";
      break;
    case "0":
      secondPlayer.attack();
      secondPlayer.attack_type = "super";
      break;
  }
});

window.addEventListener("keyup", (event) => {
  //First player movement keys
  switch (event.key) {
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;

    //Second player movement keys
    case "6":
      keys.s6.pressed = false;
      break;
    case "4":
      keys.s4.pressed = false;
      break;
  }
});
