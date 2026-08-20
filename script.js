// =====================================================
// BIRTHDAY SURPRISE WEBSITE
// CLEAN FINAL SCRIPT.JS
// =====================================================
// =====================================================
// GLOBAL SCENE CONTROL + BACKGROUND TRANSITIONS
// =====================================================

const scenes = document.querySelectorAll(".scene");

function showScene(sceneId) {
  // Remove active state from every scene
  scenes.forEach((scene) => {
    scene.classList.remove("active");
  });

  // Find the scene we want
  const nextScene = document.getElementById(sceneId);

  if (nextScene) {
    // Show new scene
    nextScene.classList.add("active");

    // Tell CSS which background/aurora to use
    document.body.dataset.scene = sceneId;
  }

  // Always start new scene at top
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "instant",
  });
}
// Set initial background for loader
document.body.dataset.scene = "loadingScene";
// =====================================================
// 1. LOADING SCREEN
// =====================================================

// =====================================================
// CAKE BUILDING LOADER
// =====================================================

window.addEventListener("load", () => {
  const cakeLoadingText = document.getElementById("cakeLoadingText");

  setTimeout(() => {
    cakeLoadingText.textContent = "Adding the sweetest layers... 🎂";
  }, 900);

  setTimeout(() => {
    cakeLoadingText.textContent = "Almost ready... ✨";
  }, 2300);

  setTimeout(() => {
    cakeLoadingText.textContent = "Lighting the candles... 🕯️";
  }, 3300);

  setTimeout(() => {
    cakeLoadingText.textContent = "Perfect. ❤️";
  }, 4300);

  // Let her enjoy the completed cake
  setTimeout(() => {
    cakeLoadingText.textContent = "Made with a little extra love... 💕";
  }, 5200);

  // Move to next scene after a short pause
  setTimeout(() => {
    const loadingScene = document.getElementById("loadingScene");

    loadingScene.classList.add("fade-out");
  }, 6200);

  setTimeout(() => {
    showScene("introScene");
  }, 7200);
});

// =====================================================
// 2. CANDLE INTRO
// =====================================================

const introNextBtn = document.getElementById("introNextBtn");

introNextBtn.addEventListener("click", () => {
  showScene("choiceScene");
});

// =====================================================
// 3. PLAYFUL YES / NO
// =====================================================

const yesBtn = document.getElementById("yesBtn");

const noBtn = document.getElementById("noBtn");

const choiceMessage = document.getElementById("choiceMessage");

let noAttempts = 0;

const noMessages = [
  "Hmm... are you sure? 👀",
  "Nice try 😏",
  "That button seems a little shy 😂",
  "Come onnn... ❤️",
  "You really thought I'd let you press that? 😌",
  "The Yes button is waiting for you 🥺❤️",
  "Okay okay... just press YES already 😂❤️",
];

yesBtn.addEventListener("click", () => {
  choiceMessage.textContent = "I knew you'd say yes ❤️";

  setTimeout(() => {
    showScene("giftScene");
  }, 900);
});

function moveNoButton() {
  noAttempts++;

  const buttonWidth = noBtn.offsetWidth;

  const buttonHeight = noBtn.offsetHeight;

  const maxX = window.innerWidth - buttonWidth - 30;

  const maxY = window.innerHeight - buttonHeight - 30;

  const randomX = Math.max(15, Math.floor(Math.random() * maxX));

  const randomY = Math.max(15, Math.floor(Math.random() * maxY));

  noBtn.style.position = "fixed";
  noBtn.style.left = randomX + "px";
  noBtn.style.top = randomY + "px";
  noBtn.style.zIndex = "999";

  const messageIndex = Math.min(noAttempts - 1, noMessages.length - 1);

  choiceMessage.textContent = noMessages[messageIndex];

  const yesScale = Math.min(1 + noAttempts * 0.08, 1.5);

  yesBtn.style.transform = `scale(${yesScale})`;
}

// Desktop
noBtn.addEventListener("mouseenter", moveNoButton);

// Mobile
noBtn.addEventListener(
  "touchstart",
  (event) => {
    event.preventDefault();

    moveNoButton();
  },
  { passive: false },
);

// If she somehow clicks it
noBtn.addEventListener("click", (event) => {
  event.preventDefault();

  moveNoButton();
});

// =====================================================
// 4. NINE GIFTS
// =====================================================

const giftCards = document.querySelectorAll(".gift-card");

const giftPopup = document.getElementById("giftPopup");

const popupGiftMessage = document.getElementById("popupGiftMessage");

const popupNextGiftBtn = document.getElementById("popupNextGiftBtn");

const giftNextBtn = document.getElementById("giftNextBtn");

let currentGift = 0;

// =====================================================
// CLICK GIFT
// =====================================================

giftCards.forEach((gift, index) => {
  gift.addEventListener("click", () => {
    if (index !== currentGift) {
      return;
    }

    if (gift.dataset.opened === "true") {
      return;
    }

    openGift(gift);
  });
});

function openGift(gift) {
  gift.dataset.opened = "true";

  gift.classList.add("opened");

  gift.textContent = "💝";

  popupGiftMessage.textContent = gift.dataset.message;

  giftPopup.classList.remove("hidden");

  if (currentGift === giftCards.length - 1) {
    popupNextGiftBtn.textContent = "Continue the Surprise ❤️";
  } else {
    popupNextGiftBtn.textContent = "Open Next Gift 🎁";
  }
}

// =====================================================
// AUTOMATICALLY OPEN NEXT GIFT
// =====================================================

popupNextGiftBtn.addEventListener("click", () => {
  if (currentGift < giftCards.length - 1) {
    currentGift++;

    const nextGift = giftCards[currentGift];

    nextGift.classList.remove("locked");

    nextGift.dataset.opened = "true";

    nextGift.classList.add("opened");

    nextGift.textContent = "💝";

    popupGiftMessage.textContent = nextGift.dataset.message;

    if (currentGift === giftCards.length - 1) {
      popupNextGiftBtn.textContent = "Continue the Surprise ❤️";
    } else {
      popupNextGiftBtn.textContent = "Open Next Gift 🎁";
    }
  } else {
    giftPopup.classList.add("hidden");

    giftNextBtn.classList.remove("hidden");

    giftNextBtn.textContent = "There's more... ❤️";
  }
});

// =====================================================
// GIFTS -> BALLOONS
// =====================================================

giftNextBtn.addEventListener("click", () => {
  giftPopup.classList.add("hidden");

  showScene("balloonScene");
});

// =====================================================
// 5. BALLOON CELEBRATION
// =====================================================

const startBalloonsBtn = document.getElementById("startBalloonsBtn");

const balloonContainer = document.getElementById("balloonContainer");

const balloonNextBtn = document.getElementById("balloonNextBtn");

const celebrationTitle = document.querySelector(".celebration-title");

let poppedBalloons = 0;

let balloonInterval = null;

let celebrationFinished = false;

let balloonsStarted = false;

const balloonsToPop = 7;

const balloonColors = [
  "#ff7aa2",
  "#ffd166",
  "#9b8cff",
  "#7ee8fa",
  "#ff9f68",
  "#b8f2a1",
];

// =====================================================
// START BALLOONS
// =====================================================

startBalloonsBtn.addEventListener("click", () => {
  if (balloonsStarted) {
    return;
  }

  balloonsStarted = true;

  startBalloonsBtn.classList.add("hidden");

  celebrationTitle.textContent = `Pop the balloons 🎈 — 0 / ${balloonsToPop}`;

  // Start with several balloons
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      createBalloon();
    }, i * 180);
  }

  // Keep them coming
  balloonInterval = setInterval(() => {
    if (!celebrationFinished) {
      createBalloon();
    }
  }, 550);
});

// =====================================================
// CREATE BALLOON
// =====================================================

function createBalloon() {
  if (celebrationFinished) {
    return;
  }

  const balloon = document.createElement("div");

  balloon.classList.add("balloon");

  const randomLeft = Math.random() * 84 + 5;

  const randomDuration = Math.random() * 2.5 + 5.5;

  const randomColor =
    balloonColors[Math.floor(Math.random() * balloonColors.length)];

  balloon.style.left = randomLeft + "%";

  balloon.style.background = randomColor;

  balloon.style.animationDuration = randomDuration + "s";

  balloon.addEventListener("click", () => {
    if (balloon.dataset.popped === "true") {
      return;
    }

    balloon.dataset.popped = "true";

    popBalloon(balloon);
  });

  balloonContainer.appendChild(balloon);

  setTimeout(() => {
    if (balloon.parentElement && balloon.dataset.popped !== "true") {
      balloon.remove();
    }
  }, randomDuration * 1000);
}

// =====================================================
// POP BALLOON
// =====================================================

function popBalloon(balloon) {
  if (celebrationFinished) {
    return;
  }

  poppedBalloons++;

  const rect = balloon.getBoundingClientRect();

  const centerX = rect.left + rect.width / 2;

  const centerY = rect.top + rect.height / 2;

  const balloonColor = balloon.style.background || "#ff7aa2";

  // Particle burst
  for (let i = 0; i < 16; i++) {
    const particle = document.createElement("span");

    particle.classList.add("pop-particle");

    particle.style.left = centerX + "px";

    particle.style.top = centerY + "px";

    particle.style.background = balloonColor;

    const angle = (Math.PI * 2 * i) / 16;

    const distance = 45 + Math.random() * 75;

    particle.style.setProperty("--x", Math.cos(angle) * distance + "px");

    particle.style.setProperty("--y", Math.sin(angle) * distance + "px");

    document.body.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 750);
  }

  balloon.style.animation = "none";

  balloon.style.transform = "scale(1.6)";

  balloon.style.opacity = "0";

  setTimeout(() => {
    balloon.remove();
  }, 180);

  celebrationTitle.textContent = `Keep going 🎈 — ${poppedBalloons} / ${balloonsToPop}`;

  if (poppedBalloons >= balloonsToPop) {
    celebrationFinished = true;

    clearInterval(balloonInterval);

    revealBirthdayMessage();
  }
}

// =====================================================
// BALLOON FINISH
// =====================================================

function revealBirthdayMessage() {
  document.querySelectorAll(".balloon").forEach((balloon) => {
    balloon.style.pointerEvents = "none";

    balloon.style.opacity = "0";

    setTimeout(() => {
      balloon.remove();
    }, 400);
  });

  celebrationTitle.textContent = "Happy Birthday, My Love ❤️🎈";

  balloonNextBtn.textContent = "I saved one more thing for you...";

  balloonNextBtn.classList.remove("hidden");
}

// =====================================================
// BALLOONS -> BIG GIFT
// =====================================================

balloonNextBtn.addEventListener("click", () => {
  showScene("boxScene");
});
// =====================================================
// 6. CINEMATIC GIFT BOX
// =====================================================

const giftBox = document.getElementById("giftBox");

const boxNextBtn = document.getElementById("boxNextBtn");

const boxScene = document.getElementById("boxScene");

const giftStage = document.querySelector(".gift-stage");

const giftEffectContainer = document.getElementById("giftEffectContainer");

const giftSceneTitle = document.getElementById("giftSceneTitle");

const giftSceneHint = document.getElementById("giftSceneHint");

let boxOpened = false;

giftBox.addEventListener("click", () => {
  if (boxOpened) {
    return;
  }

  boxOpened = true;

  // Open physical box
  giftBox.classList.add("open");

  giftStage.classList.add("opened");

  giftSceneHint.textContent = "There's something inside... ❤️";

  // Burst immediately
  createGiftMagic();

  // Reveal wish card from INSIDE the box
  setTimeout(() => {
    boxNextBtn.classList.remove("hidden");

    boxNextBtn.classList.add("rise-out");
  }, 420);

  // Change heading subtly
  setTimeout(() => {
    giftSceneTitle.textContent = "This one is from my heart ❤️";
  }, 900);
});

// =====================================================
// MAGIC EFFECT
// =====================================================

function createGiftMagic() {
  // Golden sparkles
  for (let i = 0; i < 38; i++) {
    setTimeout(() => {
      const sparkle = document.createElement("span");

      sparkle.classList.add("gift-magic-particle");

      const angle = Math.random() * Math.PI * 2;

      const distance = 70 + Math.random() * 180;

      sparkle.style.setProperty("--magic-x", Math.cos(angle) * distance + "px");

      sparkle.style.setProperty(
        "--magic-y",
        Math.sin(angle) * distance - 80 + "px",
      );

      sparkle.style.setProperty(
        "--magic-duration",
        0.9 + Math.random() * 1.2 + "s",
      );

      giftEffectContainer.appendChild(sparkle);

      setTimeout(() => {
        sparkle.remove();
      }, 2300);
    }, i * 22);
  }

  // Hearts
  const hearts = ["❤️", "💕", "💗", "💖"];

  for (let i = 0; i < 13; i++) {
    setTimeout(() => {
      const heart = document.createElement("span");

      heart.classList.add("gift-floating-heart");

      heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

      heart.style.setProperty("--heart-x", Math.random() * 200 - 100 + "px");

      heart.style.setProperty(
        "--heart-rotate",
        Math.random() * 100 - 50 + "deg",
      );

      heart.style.setProperty(
        "--heart-duration",
        1.6 + Math.random() * 1.2 + "s",
      );

      giftEffectContainer.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 3200);
    }, i * 80);
  }
}

// =====================================================
// WISH CARD -> LETTER
// =====================================================

boxNextBtn.addEventListener("click", () => {
  showScene("letterScene");
});

// =====================================================
// GIFT OPENING EFFECTS
// =====================================================

function createGiftOpeningEffects() {
  const rect = giftBox.getBoundingClientRect();

  const sceneRect = boxScene.getBoundingClientRect();

  const centerX = rect.left - sceneRect.left + rect.width / 2;

  const centerY = rect.top - sceneRect.top + rect.height / 2;

  // Sparkles
  for (let i = 0; i < 32; i++) {
    const sparkle = document.createElement("span");

    sparkle.classList.add("gift-sparkle");

    sparkle.style.left = centerX + "px";

    sparkle.style.top = centerY + "px";

    const angle = Math.random() * Math.PI * 2;

    const distance = 70 + Math.random() * 150;

    sparkle.style.setProperty("--x", Math.cos(angle) * distance + "px");

    sparkle.style.setProperty("--y", Math.sin(angle) * distance + "px");

    sparkle.style.setProperty("--duration", 0.8 + Math.random() * 0.8 + "s");

    boxScene.appendChild(sparkle);

    setTimeout(() => {
      sparkle.remove();
    }, 1800);
  }

  // Floating hearts
  const heartSymbols = ["❤️", "💗", "💕", "💖"];

  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      const heart = document.createElement("span");

      heart.classList.add("gift-heart-particle");

      heart.textContent =
        heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

      heart.style.left = centerX + "px";

      heart.style.top = centerY + "px";

      heart.style.setProperty("--duration", 1.6 + Math.random() * 1.2 + "s");

      heart.style.setProperty("--drift", Math.random() * 140 - 70 + "px");

      heart.style.setProperty("--rotate", Math.random() * 80 - 40 + "deg");

      boxScene.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 3200);
    }, i * 90);
  }
}

// =====================================================
// GIFT BOX -> LETTER
// =====================================================

boxNextBtn.addEventListener("click", () => {
  showScene("letterScene");
});
// =====================================================
// GIFT BOX -> LETTER
// =====================================================

boxNextBtn.addEventListener("click", () => {
  showScene("letterScene");
});

// =====================================================
// 7. LETTER -> FINAL QUESTION
// =====================================================

const letterNextBtn = document.getElementById("letterNextBtn");

letterNextBtn.addEventListener("click", () => {
  showScene("finalQuestionScene");
});

// =====================================================
// 8. FINAL QUESTION
// =====================================================

const finalYesBtn = document.getElementById("finalYesBtn");

const notYetBtn = document.getElementById("notYetBtn");

let notYetClicks = 0;

const notYetMessages = [
  "Okay... maybe Yes? 😌❤️",
  "Still thinking? 👀",
  "I'll wait ❤️",
];

notYetBtn.addEventListener("click", () => {
  const messageIndex = Math.min(notYetClicks, notYetMessages.length - 1);

  notYetBtn.textContent = notYetMessages[messageIndex];

  notYetClicks++;
});

// =====================================================
// 9. CINEMATIC FINAL ENDING
// =====================================================

let endingAnimationStarted = false;

finalYesBtn.addEventListener("click", () => {
  showScene("endingScene");

  // Small delay so the scene becomes visible first
  setTimeout(() => {
    startEndingAnimation();
  }, 180);
});

function startEndingAnimation() {
  if (endingAnimationStarted) {
    return;
  }

  endingAnimationStarted = true;

  const endingScene = document.getElementById("endingScene");

  if (!endingScene) {
    return;
  }

  // ===================================================
  // INITIAL HEART BURST
  // ===================================================

  for (let i = 0; i < 12; i++) {
    setTimeout(() => {
      createEndingHeart(endingScene);
    }, i * 120);
  }

  // ===================================================
  // CONTINUOUS FLOATING HEARTS
  // ===================================================

  const heartInterval = setInterval(() => {
    if (!endingScene.classList.contains("active")) {
      clearInterval(heartInterval);

      return;
    }

    createEndingHeart(endingScene);
  }, 700);

  // ===================================================
  // SPARKLE BURST
  // ===================================================

  for (let i = 0; i < 45; i++) {
    setTimeout(() => {
      createEndingSparkle(endingScene);
    }, i * 80);
  }
}

// =====================================================
// CREATE ENDING HEART
// =====================================================

function createEndingHeart(endingScene) {
  const heart = document.createElement("span");

  heart.classList.add("ending-heart-particle");

  const heartSymbols = ["❤️", "💗", "💕", "💖", "♡"];

  heart.textContent =
    heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

  heart.style.left = Math.random() * 90 + 5 + "%";

  heart.style.setProperty("--duration", 4.5 + Math.random() * 3 + "s");

  heart.style.setProperty("--drift", Math.random() * 140 - 70 + "px");

  heart.style.setProperty("--rotate", Math.random() * 90 - 45 + "deg");

  endingScene.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 8000);
}

// =====================================================
// CREATE ENDING SPARKLE
// =====================================================

function createEndingSparkle(endingScene) {
  const sparkle = document.createElement("span");

  sparkle.classList.add("ending-sparkle");

  sparkle.style.left = Math.random() * 100 + "%";

  sparkle.style.top = Math.random() * 100 + "%";

  sparkle.style.setProperty(
    "--sparkle-duration",
    1.5 + Math.random() * 3 + "s",
  );

  endingScene.appendChild(sparkle);

  setTimeout(() => {
    sparkle.remove();
  }, 5000);
}
// =====================================================
// AMBIENT PARTICLE SYSTEM
// =====================================================

const ambientParticles = document.getElementById("ambientParticles");

let ambientParticleTimer = null;

// =====================================================
// START AMBIENT PARTICLES FOR CURRENT SCENE
// =====================================================

function startAmbientParticles(sceneId) {
  // Stop previous scene's particle loop
  if (ambientParticleTimer) {
    clearInterval(ambientParticleTimer);
    ambientParticleTimer = null;
  }

  // Remove leftover ambient particles
  ambientParticles.querySelectorAll(".ambient-particle").forEach((particle) => {
    particle.remove();
  });

  // ---------------------------------------------------
  // LOADING / CAKE
  // Golden dust + sparkles
  // ---------------------------------------------------

  if (sceneId === "loadingScene") {
    ambientParticleTimer = setInterval(() => {
      createAmbientParticle("dust");

      if (Math.random() > 0.55) {
        createAmbientParticle("sparkle");
      }
    }, 450);
  }

  // ---------------------------------------------------
  // CANDLE INTRO
  // Warm glowing dust
  // ---------------------------------------------------
  else if (sceneId === "introScene") {
    ambientParticleTimer = setInterval(() => {
      createAmbientParticle("dust");
    }, 600);
  }

  // ---------------------------------------------------
  // YES / NO
  // Occasional floating hearts
  // ---------------------------------------------------
  else if (sceneId === "choiceScene") {
    ambientParticleTimer = setInterval(() => {
      createAmbientParticle("heart");
    }, 1100);
  }

  // ---------------------------------------------------
  // NINE GIFTS
  // Sparkles + occasional hearts
  // ---------------------------------------------------
  else if (sceneId === "giftScene") {
    ambientParticleTimer = setInterval(() => {
      createAmbientParticle("sparkle");

      if (Math.random() > 0.7) {
        createAmbientParticle("heart");
      }
    }, 650);
  }

  // ---------------------------------------------------
  // BALLOONS
  // No ambient particles
  // ---------------------------------------------------
  else if (sceneId === "balloonScene") {
    return;
  }

  // ---------------------------------------------------
  // BIG GIFT BOX
  // No ambient particles
  // It already has its own stronger effect
  // ---------------------------------------------------
  else if (sceneId === "boxScene") {
    return;
  }

  // ---------------------------------------------------
  // LETTER
  // Very subtle hearts
  // ---------------------------------------------------
  else if (sceneId === "letterScene") {
    ambientParticleTimer = setInterval(() => {
      createAmbientParticle("heart", true);
    }, 1800);
  }

  // ---------------------------------------------------
  // FINAL QUESTION
  // More frequent floating hearts
  // ---------------------------------------------------
  else if (sceneId === "finalQuestionScene") {
    ambientParticleTimer = setInterval(() => {
      createAmbientParticle("heart");

      if (Math.random() > 0.65) {
        createAmbientParticle("sparkle");
      }
    }, 700);
  }

  // ---------------------------------------------------
  // ENDING
  // Dedicated ending animation already handles it
  // ---------------------------------------------------
  else if (sceneId === "endingScene") {
    return;
  }
}

// =====================================================
// CREATE PARTICLE
// =====================================================

function createAmbientParticle(type, subtle = false) {
  if (!ambientParticles) {
    return;
  }

  const particle = document.createElement("span");

  particle.classList.add("ambient-particle");

  // Random horizontal position
  particle.style.left = Math.random() * 94 + 3 + "%";

  // ---------------------------------------------------
  // HEART
  // ---------------------------------------------------

  if (type === "heart") {
    particle.classList.add("ambient-heart");

    const size = subtle ? 5 + Math.random() * 5 : 7 + Math.random() * 8;

    particle.style.setProperty("--size", size + "px");

    particle.style.setProperty("--duration", 8 + Math.random() * 5 + "s");

    particle.style.setProperty("--drift", Math.random() * 90 - 45 + "px");

    particle.style.setProperty("--particle-opacity", subtle ? 0.18 : 0.42);
  }

  // ---------------------------------------------------
  // GOLDEN DUST
  // ---------------------------------------------------
  else if (type === "dust") {
    particle.classList.add("ambient-dust");

    const size = 2 + Math.random() * 4;

    particle.style.setProperty("--size", size + "px");

    particle.style.setProperty("--duration", 5 + Math.random() * 4 + "s");

    particle.style.setProperty("--drift", Math.random() * 60 - 30 + "px");

    particle.style.setProperty(
      "--particle-opacity",
      0.45 + Math.random() * 0.25,
    );

    // Dust can start anywhere vertically
    particle.style.top = 20 + Math.random() * 75 + "%";
  }

  // ---------------------------------------------------
  // SPARKLE
  // ---------------------------------------------------
  else if (type === "sparkle") {
    particle.classList.add("ambient-sparkle");

    const size = 4 + Math.random() * 5;

    particle.style.setProperty("--size", size + "px");

    particle.style.setProperty("--duration", 2.5 + Math.random() * 3 + "s");

    particle.style.setProperty(
      "--particle-opacity",
      0.45 + Math.random() * 0.35,
    );

    particle.style.top = 15 + Math.random() * 75 + "%";
  }

  ambientParticles.appendChild(particle);

  // Clean up after animation
  setTimeout(() => {
    if (particle.parentElement) {
      particle.remove();
    }
  }, 14000);
}

// =====================================================
// INITIAL PARTICLES
// =====================================================

startAmbientParticles(document.body.dataset.scene || "loadingScene");
