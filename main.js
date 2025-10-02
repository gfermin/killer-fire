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
  holdFrames: 10,
});

//Selected player 1
const firstPlayer = new Fighter({
  position: {
    x: 150,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: 215,
    y: 157,
  },
  attacks: {
    simple: 10,
    strong: 20,
    super: 35,
  },
  imageSrc: "src/samuraiMack/Idle.png",
  scale: 2.5,
  maxFrames: 8,
  holdFrames: 5,
  sprites: {
    idle: {
      imageSrc: "src/samuraiMack/Idle.png",
      maxFrames: 8,
    },
    run: {
      imageSrc: "src/samuraiMack/Run.png",
      maxFrames: 8,
    },
    jump: {
      imageSrc: "src/samuraiMack/Jump.png",
      maxFrames: 2,
    },
    fall: {
      imageSrc: "src/samuraiMack/Fall.png",
      maxFrames: 2,
    },
    attack1: {
      imageSrc: "src/samuraiMack/Attack1.png",
      maxFrames: 6,
    },
  },
  attackBox: {
    offset: {
      x: 0,
      y: 0,
    },
    width: 100,
    height: 50,
  },
});

//Selected player 2
const secondPlayer = new Fighter({
  position: {
    x: 500,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  color: "red",
  offset: {
    x: -50,
    y: 172,
  },
  attacks: {
    simple: 10,
    strong: 20,
    super: 35,
  },
  imageSrc: "src/kenji/Idle.png",
  scale: 2.5,
  maxFrames: 4,
  holdFrames: 5,
  sprites: {
    idle: {
      imageSrc: "src/kenji/Idle.png",
      maxFrames: 4,
    },
    run: {
      imageSrc: "src/kenji/Run.png",
      maxFrames: 8,
    },
    jump: {
      imageSrc: "src/kenji/Jump.png",
      maxFrames: 2,
    },
    fall: {
      imageSrc: "src/kenji/Fall.png",
      maxFrames: 2,
    },
    attack1: {
      imageSrc: "src/kenji/Attack1.png",
      maxFrames: 4,
    },
  },
  attackBox: {
    offset: {
      x: 240,
      y: 0,
    },
    width: 100,
    height: 50,
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
  secondPlayer.velocity.x = 0;

  if (keys.ArrowRight.pressed && firstPlayer.lastKey === "ArrowRight") {
    firstPlayer.velocity.x = 5;
    firstPlayer.switchSprite("run");
  } else if (keys.ArrowLeft.pressed && firstPlayer.lastKey === "ArrowLeft") {
    firstPlayer.velocity.x = -5;
    firstPlayer.switchSprite("run");
  } else {
    firstPlayer.switchSprite("idle");
  }

  //Jumping first player
  if (firstPlayer.velocity.y < 0) {
    firstPlayer.switchSprite("jump");
  } else if (firstPlayer.velocity.y > 0) {
    firstPlayer.switchSprite("fall");
  }

  if (keys.s6.pressed && secondPlayer.lastKey === "s6") {
    secondPlayer.velocity.x = 5;
    secondPlayer.switchSprite("run");
  } else if (keys.s4.pressed && secondPlayer.lastKey === "s4") {
    secondPlayer.velocity.x = -5;
    secondPlayer.switchSprite("run");
  } else {
    secondPlayer.switchSprite("idle");
  }

  //Jumping second player
  if (secondPlayer.velocity.y < 0) {
    secondPlayer.switchSprite("jump");
  } else if (secondPlayer.velocity.y > 0) {
    secondPlayer.switchSprite("fall");
  }

  // handlePlayerMovementAndSprite(firstPlayer, keys.ArrowRight, keys.ArrowLeft);
  // handlePlayerMovementAndSprite(secondPlayer, keys.s6, keys.s4);

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
      firstPlayer.velocity.y = -14;
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
      secondPlayer.velocity.y = -14;
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
