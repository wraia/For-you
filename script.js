const messages = [
  "You are appreciated more than you realize.",
  "Today is a good day to be proud of yourself.",
  "You bring positivity just by being you.",
  "You're doing better than you think.",
  "Small steps still move you forward.",
  "You matter, and your effort matters.",
  "You’ve got this 💪"
];

function generateMessage() {
  const randomIndex = Math.floor(Math.random() * messages.length);
  document.getElementById("message").textContent = messages[randomIndex];
}

// Show the same message all day
function dailyMessage() {
  const today = new Date().toDateString();
  const savedDate = localStorage.getItem("date");
  const savedMessage = localStorage.getItem("message");

  if (today === savedDate && savedMessage) {
    document.getElementById("message").textContent = savedMessage;
  } else {
    const randomIndex = Math.floor(Math.random() * messages.length);
    const message = messages[randomIndex];
    localStorage.setItem("date", today);
    localStorage.setItem("message", message);
    document.getElementById("message").textContent = message;
  }
}

dailyMessage();
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}

function confettiBurst() {
  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.backgroundColor =
      ["#ff6b6b", "#feca57", "#48dbfb", "#1dd1a1"][
        Math.floor(Math.random() * 4)
      ];
    confetti.style.animationDuration = Math.random() * 2 + 2 + "s";
    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), 3000);
  }
}

// call it when the page loads
confettiBurst();

function heartConfetti() {
  for (let i = 0; i < 20; i++) {
    const heart = document.createElement("div");
    heart.className = "heart";

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 2 + 3 + "s";
    heart.style.background =
      ["#ff6b81", "#f368e0", "#ff9ff3"][
        Math.floor(Math.random() * 3)
      ];

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 5000);
  }
}

// show once when app opens
heartConfetti();
