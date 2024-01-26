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
