var buttons = document.querySelectorAll(".drum");

for (var i = 0; i < buttons.length; i++)
  buttons[i].addEventListener("click", function () {
    playSound(this.textContent);
    buttonAnimation(this.textContent);
  });

document.addEventListener("keypress", function (event) {
  playSound(event.key);
  buttonAnimation(event.key);
});

function playSound(key) {
  switch (key) {
    case "w":
      var w = new Audio("sounds/crash.mp3");
      w.play();
      break;
    case "a":
      var a = new Audio("sounds/kick-bass.mp3");
      a.play();
      break;
    case "s":
      var s = new Audio("sounds/snare.mp3");
      s.play();
      break;
    case "d":
      var d = new Audio("sounds/tom-1.mp3");
      d.play();
      break;
    case "j":
      var j = new Audio("sounds/tom-2.mp3");
      j.play();
      break;
    case "k":
      var k = new Audio("sounds/tom-3.mp3");
      k.play();
      break;
    case "l":
      var l = new Audio("sounds/tom-4.mp3");
      l.play();
      break;

    default:
      console.log(this.textContent);
      break;
  }
}

function buttonAnimation(key) {
  document.querySelector("." + key).classList.add("pressed");
  setTimeout(() => {
    document.querySelector("." + key).classList.remove("pressed");
  }, 100);
}
