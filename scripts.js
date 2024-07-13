let word = "fixszó"; //.toLowerCase()
let maxFails;
const getLetters = document.getElementById("getLetters");

fetch(" https://random-word-api.herokuapp.com/word")
  .then((response) => response.json())
  .then((newWord) => {
    console.log(" newWord : ", newWord[0]);
    word = newWord[0];
    maxFails = Math.ceil(word.length * 0.5);
    wordLength();
    restLife.innerText = `Összes hibalehetőség: ${maxFails}`;
    getLetters.focus();
  });

function isValidGuess(letter) {
  //betű hossza  1 és csak  angol
  return letter.length === 1 && /^[a-z]$/.test(letter);
}

function wordLength() {
  document.getElementById("letterContainer").innerText = "";
  for (let i = 0; i < word.length; i++) {
    const letterContainer = document.getElementById("letterContainer");
    letterContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="letter"></div>`
    );
  }
}

const faildLetters = [];
const fails = document.getElementById("fails");
const letters = document.getElementsByClassName("letter");
const restLife = document.getElementById("restLife");

function findLetter(letter) {
  let find = false;
  for (let i = 0; i < word.length; i++) {
    if (word[i] == letter) {
      letters[i].innerText = letter;
      letters[i].style.background = "rgb(177, 255, 223)";
      find = true;
    }
  }
  return find;
}

document.getElementById("btn").onclick = () => guessLetter();

function guessLetter(){

  const getLetter = getLetters.value.toLowerCase();
  if (!isValidGuess(getLetter)) {
    alert("Nem valós betű");
    return;
  }
  if (!findLetter(getLetter)) {
    faildLetters.push(getLetter);
    fails.innerText = "Mellélőtt karakterek:  ";
    fails.innerText += faildLetters;
    maxFails -= 1;
    restLife.innerText = `Maradék élet: ${maxFails}`;
    if (maxFails < 1) {
      document.querySelector("img").style.display = "block";
      document.getElementById("mainBox").style.display = "none";
      setTimeout(() => {
        alert("Vesztettél");
        if (confirm("Start new game?")) {
          location.reload();
        }
      }, 1000);
    }
  }

  getLetters.focus();

  getLetters.value = "";
}
getLetters.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    guessLetter();
  }
});
