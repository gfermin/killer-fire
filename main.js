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
const gravity = 0.2;

//Class that contains all of the functionalities of our players
class Sprite {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
  }

  //It draws the players
  draw() {
    context.fillStyle = "blue";
    context.fillRect(this.position.x, this.position.y, 50, this.height);
  }

  //It updates the functionalities and movements of the players
  update() {
    this.draw();

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
    } else this.velocity.y += gravity;
  }
}

//Selected player 1
const player1 = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});

//Selected player 2
const player2 = new Sprite({
  position: {
    x: 400,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});

//Function that loops over itself to create the continous animation
function animate() {
  window.requestAnimationFrame(animate);
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);
  player1.update();
  player2.update();
}

animate();

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowRight":
      player1.velocity.x = 1;
      break;
    case "ArrowLeft":
      player1.velocity.x = -1;
      break;
  }
  console.log(event.key);
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "ArrowRight":
      player1.velocity.x = 0;
      break;
    case "ArrowLeft":
      player1.velocity.x = 0;
      break;
  }
  console.log(event.key);
});
