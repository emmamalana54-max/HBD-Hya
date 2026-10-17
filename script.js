/* ---------- Birthday page interactions ---------- */
const openLetterButton = document.getElementById("open-letter");
const closeLetterButton = document.getElementById("close-letter");
const readAgainButton = document.getElementById("read-again");
const reopenLetterButton = document.getElementById("reopen-letter");
const birthdayLetter = document.getElementById("birthday-letter");
const letterTeaser = document.getElementById("letter-teaser");
const giftTrigger = document.getElementById("gift-trigger");
const letterBackdrop = document.getElementById("letter-backdrop");
const floatingDecor = document.getElementById("floating-decor");
const cake = document.querySelector(".cake");
const blowCandlesButton = document.getElementById("blow-candles");
const celebrateButton = document.getElementById("celebrate-button");
const wishMessage = document.getElementById("wish-message");
const revealSurpriseButton = document.getElementById("reveal-surprise");
const surpriseText = document.getElementById("surprise-text");
const musicToggle = document.getElementById("music-toggle");
const musicLabel = document.getElementById("music-label");
const musicIcon = document.getElementById("music-icon");

let candlesAreOut = false;
let surpriseRevealed = false;
let audioContext = null;
let musicTimer = null;
let musicIsPlaying = false;
let melodyIndex = 0;

// Pop the birthday letter out over the page when the gift or surprise button is clicked.
function openLetter() {
  birthdayLetter.classList.remove("is-open");
  birthdayLetter.setAttribute("aria-hidden", "false");
  birthdayLetter.style.display = "block";
  letterBackdrop.classList.add("visible");
  letterBackdrop.setAttribute("aria-hidden", "false");
  letterTeaser.classList.remove("visible");
  void birthdayLetter.offsetWidth; // Restart the pop-out animation each time.
  birthdayLetter.classList.add("is-open");
  burstHearts(12);
}

function closeLetter() {
  birthdayLetter.classList.remove("is-open");
  birthdayLetter.setAttribute("aria-hidden", "true");
  birthdayLetter.style.display = "none";
  letterBackdrop.classList.remove("visible");
  letterBackdrop.setAttribute("aria-hidden", "true");
  letterTeaser.classList.add("visible");
}

openLetterButton.addEventListener("click", openLetter);
giftTrigger.addEventListener("click", openLetter);
reopenLetterButton.addEventListener("click", openLetter);
readAgainButton.addEventListener("click", openLetter);
closeLetterButton.addEventListener("click", closeLetter);

// Close the pop-up by clicking outside the letter or pressing Escape.
letterBackdrop.addEventListener("click", (event) => {
  if (event.target === letterBackdrop) closeLetter();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && letterBackdrop.classList.contains("visible")) closeLetter();
});

// Create gentle floating hearts and sparkles without using external libraries.
function createFloatingItem(symbol, options = {}) {
  const item = document.createElement("span");
  item.className = "floating-item";
  item.textContent = symbol;
  item.style.left = `${Math.random() * 100}%`;
  item.style.fontSize = `${options.size || (14 + Math.random() * 19)}px`;
  item.style.color = options.color || ["#e99bbd", "#c7b8f3", "#a8d8f0", "#f3bad3"][Math.floor(Math.random() * 4)];
  item.style.setProperty("--duration", `${options.duration || (8 + Math.random() * 8)}s`);
  floatingDecor.appendChild(item);
  item.addEventListener("animationend", () => item.remove());
}

function burstHearts(count = 12) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => createFloatingItem(["♡", "♥", "✦", "✧"][Math.floor(Math.random() * 4)], {
      size: 16 + Math.random() * 20,
      duration: 4 + Math.random() * 3
    }), i * 70);
  }
}

// A few floating decorations are always drifting in the background.
setInterval(() => {
  if (floatingDecor.childElementCount < 24) {
    createFloatingItem(["♡", "✦", "✧", "♥"][Math.floor(Math.random() * 4)]);
  }
}, 850);

// Blow out the candles and show a wish.
blowCandlesButton.addEventListener("click", () => {
  candlesAreOut = !candlesAreOut;
  cake.classList.toggle("candles-out", candlesAreOut);
  if (candlesAreOut) {
    wishMessage.textContent = "Your candles are out! May your sweetest wish come true, Hyacinth. 💗✨";
    blowCandlesButton.textContent = "Light the Candles Again 🕯️";
    burstHearts(15);
  } else {
    wishMessage.textContent = "The candles are glowing again. Make another wish! 💫";
    blowCandlesButton.textContent = "Blow Out the Candles 🕯️";
  }
});

// Draw a celebratory confetti burst using simple DOM particles.
function celebrate() {
  const colors = ["#f6a8c7", "#d9d1ff", "#b8e4fb", "#ffe29a", "#c5e8c1", "#ffffff"];
  for (let i = 0; i < 95; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.position = "fixed";
    piece.style.zIndex = "20";
    piece.style.pointerEvents = "none";
    piece.style.left = `${45 + Math.random() * 10}%`;
    piece.style.top = `${35 + Math.random() * 10}%`;
    piece.style.width = `${5 + Math.random() * 7}px`;
    piece.style.height = `${8 + Math.random() * 9}px`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.borderRadius = Math.random() > .5 ? "50%" : "2px";
    piece.style.boxShadow = "0 1px 4px rgba(130,90,130,.12)";
    document.body.appendChild(piece);

    const x = (Math.random() - .5) * window.innerWidth * 1.05;
    const y = window.innerHeight * (.55 + Math.random() * .55);
    const rotation = Math.random() * 900 - 450;
    const animation = piece.animate([
      { transform: "translate(0, 0) rotate(0deg)", opacity: 1 },
      { transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`, opacity: 0 }
    ], {
      duration: 1500 + Math.random() * 1800,
      easing: "cubic-bezier(.15,.65,.3,1)",
      delay: Math.random() * 180
    });
    animation.onfinish = () => piece.remove();
  }
  wishMessage.textContent = "Yay! Today is your day, Hyacinth! Sending you a sky full of love. 🎉💖";
  burstHearts(18);
}

celebrateButton.addEventListener("click", celebrate);

// Reveal the personalized reminder, then change the button to let the user enjoy it again.
revealSurpriseButton.addEventListener("click", () => {
  surpriseRevealed = !surpriseRevealed;
  if (surpriseRevealed) {
    surpriseText.textContent = "You deserve all the happiness in the world, Hyacinth! 💖 Never forget how loved and wonderful you are.";
    revealSurpriseButton.textContent = "Send more love 💗";
    burstHearts(12);
  } else {
    surpriseText.textContent = "There's a little reminder waiting just for you.";
    revealSurpriseButton.textContent = "Reveal my surprise ✨";
  }
});

// Optional original gentle melody made with the browser's Web Audio API.
// No audio starts until the visitor clicks Play. It works independently of the letter.
const melody = [
  [523.25, 0.28], [659.25, 0.28], [783.99, 0.42], [659.25, 0.3],
  [587.33, 0.28], [698.46, 0.28], [880.00, 0.48], [698.46, 0.3],
  [523.25, 0.28], [659.25, 0.28], [783.99, 0.42], [1046.5, 0.5],
  [880.00, 0.32], [783.99, 0.32], [659.25, 0.55]
];

function playNote(frequency, duration) {
  if (!audioContext || audioContext.state !== "running") return;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const now = audioContext.currentTime;

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(frequency, now);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.055, now + 0.035);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start(now);
  oscillator.stop(now + duration + 0.04);
}

function playMelodyStep() {
  if (!musicIsPlaying) return;
  const [frequency, duration] = melody[melodyIndex];
  playNote(frequency, duration);
  melodyIndex = (melodyIndex + 1) % melody.length;
  musicTimer = setTimeout(playMelodyStep, (duration + 0.12) * 1000);
}

async function toggleMusic() {
  // AudioContext is created only after a click, respecting browser autoplay rules.
  if (!audioContext) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      musicLabel.textContent = "Music unavailable";
      return;
    }
    audioContext = new AudioContextClass();
  }

  if (musicIsPlaying) {
    musicIsPlaying = false;
    clearTimeout(musicTimer);
    if (audioContext.state === "running") await audioContext.suspend();
    musicLabel.textContent = "Play music";
    musicIcon.textContent = "♫";
    musicToggle.setAttribute("aria-pressed", "false");
  } else {
    await audioContext.resume();
    musicIsPlaying = true;
    musicLabel.textContent = "Pause music";
    musicIcon.textContent = "Ⅱ";
    musicToggle.setAttribute("aria-pressed", "true");
    playMelodyStep();
  }
}

musicToggle.addEventListener("click", toggleMusic);

// Ensure the letter starts closed and the surprise text has a sensible initial state.
birthdayLetter.style.display = "none";
birthdayLetter.setAttribute("aria-hidden", "true");
