
<h1>
  <div class="typing-container">
    <span id="typing-text"></span>
  </div>
</h1>
<style>
  .typing-container {
    display: inline-block;
    font-weight: bold;
    font-family: "Times New Roman", Times, serif;
    font-size: 1.2em;
  }
  #typing-text::after {
    content: "|";
    font-weight: bold;
    width: 2px;
    animation: cursor-blink 1s step-end infinite;
    margin-left: -1px;
  }
  @keyframes cursor-blink {
    from, to { opacity: 1 }
    50% { opacity: 0 }
  }
</style>

<script>
const textElement = document.getElementById('typing-text');
const cursorElement = document.getElementById('typing-cursor');
const texts = [
  "Emancipate Your Mind.",
  "Think Freely.",
  "Pursuit of Truth."
];

let currentTextIndex = 0;
let isTyping = true;
let charIndex = 0;
let typingSpeed = 100;
let deletingSpeed = 50;
let pauseBeforeDelete = 1500;
let pauseBeforeType = 500;
let timeout;

function type() {
  if (charIndex < texts[currentTextIndex].length) {
    textElement.textContent += texts[currentTextIndex].charAt(charIndex);
    charIndex++;
    timeout = setTimeout(type, typingSpeed);
  } else {
    timeout = setTimeout(deleteText, pauseBeforeDelete);
  }
}

function deleteText() {
  if (charIndex > 0) {
    textElement.textContent = texts[currentTextIndex].substring(0, charIndex - 1);
    charIndex--;
    timeout = setTimeout(deleteText, deletingSpeed);
  } else {
    currentTextIndex = (currentTextIndex + 1) % texts.length;
    timeout = setTimeout(type, pauseBeforeType);
  }
}

type();

document.addEventListener('visibilitychange', function() {
  if (document.hidden) {
    clearTimeout(timeout);
  } else {
    if (textElement.textContent === texts[currentTextIndex]) {
      timeout = setTimeout(deleteText, pauseBeforeDelete);
    } else {
      timeout = setTimeout(type, typingSpeed);
    }
  }
});
</script>


<!-- <link rel="stylesheet" href="css/cards/base.css" />
<link rel="stylesheet" href="css/cards/cards.css" />
<script type="module" crossorigin src="/assets/cards/index.1.js"></script>
<link rel="stylesheet" href="/assets/cards/index.1.css">
<div id="app"></div>

<canvas id="myChart" width="400" height="200"></canvas> -->


