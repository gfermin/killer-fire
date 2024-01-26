class Sprite {
  constructor({ position, imageSrc }) {
    this.position = position;
    this.width = 50;
    this.height = 150;
    this.image = new Image();
    this.image.src = imageSrc;
  }

  //It draws the players
  draw() {
    context.drawImage(this.image, this.position.x, this.position.y);
  }

  //It updates the functionalities and movements of the players
  update() {
    this.draw();
  }
}

class Fighter {
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
    if (this.position.y + this.height + this.velocity.y >= canvas.height - 95) {
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
