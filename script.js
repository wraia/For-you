// Elements
const claw = document.getElementById('claw');
const rope = document.getElementById('rope');
const machine = document.getElementById('machine');
const ballsContainer = document.getElementById('balls-container');

const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');
const grabBtn = document.getElementById('grabBtn');
const banner = document.getElementById('messageBanner');

let clawX = 180;
let grabbing = false;
let grabbedBall = null;
const step = 20;

// Hardcoded messages
const messages = [
  "You are amazing Dada!",
  "Keep smiling today, Dada 😊",
  "Believe in yourself Dada!",
  "You make the world brighter!",
  "You are strong and capable!",
  "Your kindness matters!",
  "You inspire those around you!",
  "Today will be great!",
  "You are loved!",
  "Your smile is contagious!",
  "You can achieve anything!",
  "Never stop learning!",
  "You are unique and special!",
  "You make a difference!",
  "Chase your dreams!",
  "Stay positive!",
  "You are brave!",
  "You have a great heart!",
  "Keep going, you got this!",
  "You are unstoppable!",
  "Your efforts matter!",
  "Shine bright today!",
  "You are appreciated!",
  "Believe in your potential!",
  "Your courage inspires!",
  "You make life better!",
  "Keep dreaming big!",
  "You are full of talent!",
  "Stay confident!",
  "You are important!"
];

// Canvas for heart confetti
const confettiCanvas = document.getElementById("confettiCanvas");
const ctx = confettiCanvas.getContext("2d");
function resizeCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Create balls inside the machine
function createBalls() {
  ballsContainer.innerHTML = "";
  const containerWidth = machine.clientWidth - 50;
  const containerHeight = ballsContainer.clientHeight - 50;
  for (let i = 0; i < messages.length; i++) {
    const ball = document.createElement("div");
    ball.classList.add("ball");
    ball.dataset.index = i;
    const x = Math.floor(Math.random() * containerWidth);
    const y = Math.floor(Math.random() * containerHeight);
    ball.style.left = x + "px";
    ball.style.top = y + "px";
    ballsContainer.appendChild(ball);
  }
}

// Initialize balls
createBalls();

// Controls
leftBtn.addEventListener('click', ()=>{
  if(clawX > 0){
    clawX -= step;
    claw.style.left = clawX + "px";
    rope.style.left = (clawX + 18) + "px";
  }
});
rightBtn.addEventListener('click', ()=>{
  if(clawX < machine.clientWidth - 40){
    clawX += step;
    claw.style.left = clawX + "px";
    rope.style.left = (clawX + 18) + "px";
  }
});
grabBtn.addEventListener('click', grab);

// Grab claw
function grab() {
  if(grabbing) return;
  grabbing = true;
  dropClaw().then(()=> grabbing=false);
}

// Drop and lift claw
function dropClaw() {
  return new Promise(resolve=>{
    let clawY = 0;
    grabbedBall = null;
    const intervalDown = setInterval(()=>{
      clawY += 20;
      claw.style.top = clawY + "px";
      rope.style.height = (clawY + 40) + "px";
      const clawRect = claw.getBoundingClientRect();
      const balls = document.querySelectorAll(".ball");
      balls.forEach(ball=>{
        const r = ball.getBoundingClientRect();
        if(!ball.classList.contains("revealed") &&
           clawRect.left < r.left+50 && clawRect.left+40 > r.left &&
           clawRect.top < r.top+50 && clawRect.top+40 > r.top){
             grabbedBall = ball;
        }
      });
      if(clawY >= 400 || grabbedBall){
        clearInterval(intervalDown);
        if(grabbedBall){
          grabbedBall.style.zIndex = "4";
          grabbedBall.style.position = "absolute";
        }
        // lift
        const intervalUp = setInterval(()=>{
          clawY -= 20;
          claw.style.top = clawY + "px";
          rope.style.height = (clawY + 40) + "px";
          if(grabbedBall) grabbedBall.style.top = (clawY + 40) + "px";
          if(clawY <= 0){
            clearInterval(intervalUp);
            if(grabbedBall) revealBall(grabbedBall);
            grabbedBall = null;
            resolve();
          }
        },100);
      }
    },100);
  });
}

// Heart-shaped confetti
function drawHeart(ctx, x, y, size, color){
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(x, y - size/2, x - size, y - size/2, x - size, y);
  ctx.bezierCurveTo(x - size, y + size/2, x, y + size, x, y + size*1.5);
  ctx.bezierCurveTo(x, y + size, x + size, y + size/2, x + size, y);
  ctx.bezierCurveTo(x + size, y - size/2, x, y - size/2, x, y);
  ctx.fill();
}

function launchConfetti() {
  const confettis = [];
  const colors = ["#ff0a54","#ff477e","#ff7096","#ff85a1","#fbb1b7","#f9bec7"];
  for(let i=0;i<50;i++){
    confettis.push({
      x: Math.random()*confettiCanvas.width,
      y: Math.random()*confettiCanvas.height - confettiCanvas.height,
      size: Math.random()*8 + 6,
      color: colors[Math.floor(Math.random()*colors.length)],
      tilt: Math.random()*10-10,
      tiltIncrement: Math.random()*0.07+0.05,
      speed: Math.random()*2+1
    });
  }
  let animationFrame;
  function draw(){
    ctx.clearRect(0,0,confettiCanvas.width, confettiCanvas.height);
    confettis.forEach(p=>{
      drawHeart(ctx, p.x + p.tilt, p.y, p.size, p.color);
      p.tilt += p.tiltIncrement;
      p.y += p.speed;
      if(p.y > confettiCanvas.height) p.y = -10;
    });
    animationFrame = requestAnimationFrame(draw);
  }
  draw();
  setTimeout(()=> cancelAnimationFrame(animationFrame), 3000);
}

// Reveal ball message
function revealBall(ball){
  if(!ball) return;
  const index = ball.dataset.index;
  let messageText = messages[index] || "You got a message!";

  banner.textContent = messageText;
  banner.style.display = "block";
  setTimeout(()=> banner.style.display = "none", 3000);

  ball.classList.add("revealed");
  ball.classList.add("bounce");
  setTimeout(()=> ball.classList.remove("bounce"), 600);

  launchConfetti();
}
function createBalls() {
  ballsContainer.innerHTML = "";
  const containerWidth = machine.clientWidth - 50;
  const containerHeight = ballsContainer.clientHeight - 50;

  for (let i = 0; i < messages.length; i++) {
    const ball = document.createElement("div");
    ball.classList.add("ball");
    ball.dataset.index = i;
    const x = Math.floor(Math.random() * containerWidth);
    const y = Math.floor(Math.random() * containerHeight);
    ball.style.left = x + "px";
    ball.style.top = y + "px";
    ballsContainer.appendChild(ball);

    // Bounce on page load with slight stagger
    setTimeout(() => {
      ball.classList.add("bounce");
      // Remove class after animation so it can bounce again when grabbed
      setTimeout(() => ball.classList.remove("bounce"), 600);
    }, i * 50); // stagger each ball by 50ms
  }
}
