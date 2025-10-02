class Sprite {
  constructor({
    position,
    imageSrc,
    scale = 1,
    maxFrames = 1,
    offset = { x: 0, y: 0 },
    holdFrames,
  }) {
    this.position = position;
    this.width = 50;
    this.height = 150;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.maxFrames = maxFrames;
    this.currentFrames = 0;
    this.framesElapsed = 0;
    this.holdFrames = holdFrames;
    this.offset = offset;
  }

  //It draws the players
  draw() {
    context.drawImage(
      this.image,
      this.currentFrames * (this.image.width / this.maxFrames),
      0,
      this.image.width / this.maxFrames,
      this.image.height,

      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.maxFrames) * this.scale,
      this.image.height * this.scale
    );
  }

  animateFrames() {
    this.framesElapsed++;
    if (this.framesElapsed % this.holdFrames === 0) {
      if (this.currentFrames < this.maxFrames - 1) {
        this.currentFrames++;
      } else {
        this.currentFrames = 0;
      }
    }
  }

  //It updates the functionalities and movements of the players
  update() {
    this.draw();
    this.animateFrames();
  }
}

class Fighter extends Sprite {
  constructor({
    position,
    velocity,
    color,
    attacks,
    imageSrc,
    scale = 1,
    maxFrames = 1,
    offset = { x: 0, y: 0 },
    sprites,
    holdFrames,
    attackBox = { offset: {}, width: undefined, height: undefined },
  }) {
    super({
      position,
      imageSrc,
      scale,
      maxFrames,
      offset,
    });
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
      width: attackBox.width,
      height: attackBox.height,
      offset: attackBox.offset,
    };
    this.color = color;
    this.isAttacking;
    this.health = 100;
    this.attacks = attacks;
    this.attack_type;

    this.currentFrames = 0;
    this.framesElapsed = 0;
    this.holdFrames = holdFrames;
    this.sprites = sprites;

    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].imageSrc;
    }
  }

  //It draws the players
  //   draw() {
  //     context.fillStyle = this.color;
  //     context.fillRect(this.position.x, this.position.y, this.width, this.height);

  //     //Attack box
  //     if (this.isAttacking) {
  //       (context.fillStyle = "green"),
  //         context.fillRect(
  //           this.attackBox.position.x,
  //           this.attackBox.position.y,
  //           this.attackBox.width,
  //           this.attackBox.height
  //         );
  //     }
  //   }

  //It updates the functionalities and movements of the players
  update() {
    this.draw();
    this.animateFrames();
    //Sets the position of the attack box for the palyers
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y;

    context.fillRect(
      this.attackBox.position.x,
      this.attackBox.position.y,
      this.attackBox.width,
      this.attackBox.height
    );

    //Sets the position of the players
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    //Gravity function
    if (this.position.y + this.height + this.velocity.y >= canvas.height - 95) {
      this.velocity.y = 0;
      this.position.y = 331;
    } else this.velocity.y += gravity;
  }

  attack() {
    this.switchSprite("attack");
    this.isAttacking = true;
    this.atta;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }

  switchSprite(sprite) {
    if (
      this.image === this.sprites.attack1.image &&
      this.currentFrames < this.sprites.attack1.maxFrames - 1
    )
      return;

    switch (sprite) {
      case "idle":
        if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image;
          this.maxFrames = this.sprites.idle.maxFrames;
          this.currentFrames = 0;
        }
        break;
      case "run":
        if (this.image !== this.sprites.run.image) {
          this.image = this.sprites.run.image;
          this.maxFrames = this.sprites.run.maxFrames;
          this.currentFrames = 0;
        }
        break;
      case "jump":
        if (this.image !== this.sprites.jump.image) {
          this.image = this.sprites.jump.image;
          this.maxFrames = this.sprites.jump.maxFrames;
          this.currentFrames = 0;
        }
        break;
      case "fall":
        if (this.image !== this.sprites.fall.image) {
          this.image = this.sprites.fall.image;
          this.maxFrames = this.sprites.fall.maxFrames;
          this.currentFrames = 0;
        }
        break;
      case "attack":
        if (this.image !== this.sprites.attack1.image) {
          this.image = this.sprites.attack1.image;
          this.maxFrames = this.sprites.attack1.maxFrames;
          this.currentFrames = 0;
        }
        break;

      default:
        break;
    }
  }
}
