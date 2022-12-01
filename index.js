const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

// Tamanho da Tela
canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);
const gravity = 0.5;

// Constructor das propriedades
class Sprite {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = this.velocity;
    this.height = 150;
    this.lastKey;
  }
  draw() {
    c.fillStyle = 'red';
    c.fillRect(this.position.x, this.position.y, 50, 150);
  }
  update() {
    this.position.x += this.velocity.x;
    this.draw();
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
    } else this.velocity.y += gravity;
  }
}

// Posição do sprite do Player
const player = new Sprite({ position: { x: 0, y: 0 }, velocity: { x: 0, y: 10 } });
player.draw();

// Posição do sprite do Inimigo
const enemy = new Sprite({ position: { x: 400, y: 100 }, velocity: { x: 0, y: 0 } });
enemy.draw();

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
let lastKey;

// Parametros para animação
function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = 'black';
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();
}
player.velocity.x = 0;
enemy.velocity.x = 0;
// Movimentação do Player
if (key.a.pressed && lastKey === 'a') {
  player.velocity.x = -5;
} else if (key.d.pressed && lastKey === 'd') {
  player.velocity.x = 5;
}

// Movimentação do Inimigo
if (key.ArrowLeft.pressed && lastKey === 'ArrowLeft') {
  enemy.velocity.x = -5;
} else if (key.ArrowRight.pressed && lastKey === 'ArrowRight') {
  enemy.velocity.x = 5;
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
    case 'w':
      key.w.pressed = false;
      break;
  }

  // Comandos pro inimigo
  switch (event.key) {
    case 'd':
      key.d.pressed = false;
      break;
    case 'a':
      key.a.pressed = false;
      break;
    case 'w':
      key.w.pressed = false;
      break;
  }
  console.log(event.key);
});
