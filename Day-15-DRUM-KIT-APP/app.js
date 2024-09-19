window.addEventListener("keydown", playSound);
const drums = document.querySelectorAll(".drum");

drums.forEach(drum => {
  drum.addEventListener("click", function() {
    playSound({ keyCode: drum.dataset.key });
  });
});

function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`.drum[data-key="${e.keyCode}"]`);

  if (!audio) return;
  key.classList.add("active");
  audio.currentTime = 0; // Reset the audio time for repeated play
  audio.play();

  setTimeout(() => {
    key.classList.remove("active");
  }, 100);
}
