const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

// Tamanho da Tela
canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);
const gravity = 0.5;

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: './img/background.png',
});

// Posição do sprite do Player
const player = new Fighter({
  position: { x: 0, y: 0 },
  velocity: { x: 0, y: 0 },
  offset: { x: 0, y: 0 },
  imageSrc: './img/characters/samurai/Idle.png',
  framesMax: 8,
  scale: 1,
  offset: {
    x: 215,
    y: 150,
  },
  sprites: {
    idle: { imageSrc: './img/characters/samurai/Idle.png', framesMax: 8 },
    run: { imageSrc: './img/characters/samurai/Run.png', framesMax: 8 },
    jump: { imageSrc: './img/characters/samurai/Jump.png', framesMax: 2 },
    attack: { imageSrc: './img/characters/samurai/Attack1.png', framesMax: 6 },
  },
});

// // Posição do sprite do Player 2
const enemy = new Fighter({
  position: { x: 400, y: 100 },
  velocity: { x: 0, y: 0 },
  color: 'blue',
  offset: { x: -50, y: 0 },
});

const key = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
};

decreaseTimer();
// Parametros para animação
function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = 'black';
  c.fillRect(0, 0, canvas.width, canvas.height);
  background.update();
  player.update();
  // enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;
  // Movimentação do Player
  if (key.a.pressed && player.lastKey === 'a') {
    player.velocity.x = -5;
  } else if (key.d.pressed && player.lastKey === 'd') {
    player.velocity.x = 5;
  }

  // Movimentação do Inimigo
  if (key.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
    enemy.velocity.x = -5;
  } else if (key.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
    enemy.velocity.x = 5;
  }

  if (
    rectangularCollision({
      rectangle1: player,
      rectangle2: enemy,
    }) &&
    player.isAttacking
  ) {
    player.isAttacking = false;
    enemy.health -= 20;
    document.querySelector('#enemyHealth').style.width = enemy.health + '%';
    console.log('O CORNO VERMELHO CHIMBOU-LHE A BICUDA');
  }

  if (
    rectangularCollision({
      rectangle1: enemy,
      rectangle2: player,
    }) &&
    enemy.isAttacking
  ) {
    enemy.isAttacking = false;
    player.health -= 20;
    document.querySelector('#playerHealth').style.width = player.health + '%';
    console.log('O CORNO AZUL DEU-LHE PURRETADA');
  }

  if (enemy.health <= 0 || player.health <= 0) {
    determineWinner({ player, enemy, timerId });
  }
}

animate();

// Comandos
window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'd':
      key.d.pressed = true;
      player.lastKey = 'd';
      break;
    case 'a':
      key.a.pressed = true;
      player.lastKey = 'a';
      break;
    case 'w':
      player.velocity.y = -20;
      break;
    case ' ':
      player.attack();
      break;

    case 'ArrowRight':
      key.ArrowRight.pressed = true;
      enemy.lastKey = 'ArrowRight';
      break;
    case 'ArrowLeft':
      key.ArrowLeft.pressed = true;
      enemy.lastKey = 'ArrowLeft';
      break;
    case 'ArrowUp':
      enemy.velocity.y = -20;
      break;
    case 'ArrowDown':
      enemy.attack();
      break;
  }
  console.log(event.key);
});

window.addEventListener('keyup', (event) => {
  // Comandos para o player
  switch (event.key) {
    case 'd':
      key.d.pressed = false;
      break;
    case 'a':
      key.a.pressed = false;
      break;
  }

  // Comandos pro inimigo
  switch (event.key) {
    case 'ArrowRight':
      key.ArrowRight.pressed = false;
      break;
    case 'ArrowLeft':
      key.ArrowLeft.pressed = false;
      break;
  }
  console.log(event.key);
});
