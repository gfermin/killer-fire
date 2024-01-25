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

//Class that contains all of the functionalities of our players
class Sprite {
  constructor({ position, velocity, color, offset, attacks }) {
    this.position = position;
    this.velocity = velocity;
    this.width = 50;
    this.height = 150;
    this.lastKey;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 100,
      height: 50,
      offset,
    };
    this.color = color;
    this.isAttacking;
    this.health = 100;
    this.attacks = attacks;
    this.attack_type;
  }

  //It draws the players
  draw() {
    context.fillStyle = this.color;
    context.fillRect(this.position.x, this.position.y, this.width, this.height);

    //Attack box
    if (this.isAttacking) {
      (context.fillStyle = "green"),
        context.fillRect(
          this.attackBox.position.x,
          this.attackBox.position.y,
          this.attackBox.width,
          this.attackBox.height
        );
    }
  }

  //It updates the functionalities and movements of the players
  update() {
    this.draw();
    //Sets the position of the attack box for the palyers
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y;

    //Sets the position of the players
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    //Make the players fall to the bottom of the screen
    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
    } else this.velocity.y += gravity;
  }

  attack() {
    this.isAttacking = true;
    this.atta;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }
}

//Selected player 1
const firstPlayer = new Sprite({
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
const secondPlayer = new Sprite({
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

function hitBoxCollision({ player1, player2 }) {
  return (
    player1.attackBox.position.x + player1.attackBox.width >=
      player2.position.x &&
    player1.attackBox.position.x <= player2.position.x + player2.width &&
    player1.attackBox.position.y + player1.attackBox.height >=
      player2.position.y &&
    player1.attackBox.position.y <= player2.position.y + player2.height
  );
}

function gameWinner({ player1, player2, timerId }) {
  clearTimeout(timerId);
  document.querySelector("#bResult").style.display = "flex";
  if (player1.health === player2.health) {
    document.querySelector("#bResult").innerHTML = "TIE!!!";
  } else if (player1.health > player2.health) {
    document.querySelector("#bResult").innerHTML = "PLAYER 1 WINS!!!";
  } else if (player1.health < player2.health) {
    document.querySelector("#bResult").innerHTML = "PLAYER 2 WINS!!!";
  }
}

//Function that decrease the timer over time
let timer = 60;
let timerId;
function decreaseTimer() {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000);
    timer--;
    document.querySelector("#timer").innerHTML = timer;
  }

  if (timer === 0) {
    gameWinner({ player1: firstPlayer, player2: secondPlayer });
  }
}

//Handles players move sets
function moveSet(attacker) {
  if (attacker === "fp") {
    switch (firstPlayer.attack_type) {
      case "simple":
        secondPlayer.health -= firstPlayer.attacks.simple;
        break;
      case "strong":
        secondPlayer.health -= firstPlayer.attacks.strong;
        break;
      case "super":
        secondPlayer.health -= firstPlayer.attacks.super;
        break;
      default:
        // Handle default case if needed
        break;
    }
    document.querySelector("#spHealth").style.width = secondPlayer.health + "%";
  } else if (attacker === "sp") {
    switch (secondPlayer.attack_type) {
      case "simple":
        firstPlayer.health -= secondPlayer.attacks.simple;
        break;
      case "strong":
        firstPlayer.health -= secondPlayer.attacks.strong;
        break;
      case "super":
        firstPlayer.health -= secondPlayer.attacks.super;
        break;
      default:
        // Handle default case if needed
        break;
    }
    document.querySelector("#fpHealth").style.width = firstPlayer.health + "%";
  }
}

decreaseTimer();

// function handlePlayerMovement(player, keyRight, keyLeft) {
//   player.velocity.x = 0;
//   if (keyRight.pressed && player.lastKey === keyRight.name) {
//     player.velocity.x = 5;
//   } else if (keyLeft.pressed && player.lastKey === keyLeft.name) {
//     player.velocity.x = -5;
//   }
// }

function handlePlayerAttack(attacker, target, playerType) {
  if (
    hitBoxCollision({ player1: attacker, player2: target }) &&
    attacker.isAttacking
  ) {
    attacker.isAttacking = false;
    moveSet(playerType);
  }
}

function checkEndGame() {
  if (firstPlayer.health <= 0 || secondPlayer.health <= 0) {
    gameWinner({
      player1: firstPlayer,
      player2: secondPlayer,
      timerId: timerId,
    });
  }
}

//Function that loops over itself to create the continous animation
function animate() {
  window.requestAnimationFrame(animate);
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);
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
