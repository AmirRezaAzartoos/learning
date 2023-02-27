var randPlayer1 = Math.floor(Math.random() * 6) + 1;
var randPlayer2 = Math.floor(Math.random() * 6) + 1;
while (randPlayer1 === randPlayer2) {
  randPlayer1 = Math.floor(Math.random() * 6) + 1;
  randPlayer2 = Math.floor(Math.random() * 6) + 1;
}
document
  .querySelector(".img1")
  .setAttribute("src", "images/dice" + randPlayer1 + ".png");
document
  .querySelector(".img2")
  .setAttribute("src", "images/dice" + randPlayer2 + ".png");

if (randPlayer1 > randPlayer2)
  document.querySelector("h1").textContent = "🚩Player 1 Wins!";
else document.querySelector("h1").textContent = "Player 2 Wins!🚩";

console.log(randPlayer1);
console.log(randPlayer2);
