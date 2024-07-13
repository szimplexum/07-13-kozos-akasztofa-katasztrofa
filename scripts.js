let word = "fixszó"; //.toLowerCase()
let maxFails;

fetch(" https://random-word-api.herokuapp.com/word")
  .then((response) => response.json())
  .then((newWord) => {
    console.log(" newWord : ", newWord[0]);
    word = newWord[0];
    maxFails = Math.ceil(word.length * 0.5);
    wordLength();
    restLife.innerText = `Összes hibalehetőség: ${maxFails}`;
    document.getElementById("getLetters").focus();

  });

  function isValidGuess(letter) {
    //betű hossza  1 és csak  angol 
    return letter.length === 1 && /^[a-z]$/.test(letter);
}


// document.getElementById("randomWord").innerText = word;
// document.getElementById(
//   "randomWord"
// ).innerText += ` || A szó ${word.length} betűből áll`;

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

document.getElementById("btn").onclick = () => {
  const getLetter = document.getElementById("getLetters").value.toLowerCase();
  let found = false;
  if (!isValidGuess(getLetter)){
    alert("Nem valós betű")
    return
  }

  for (let i = 0; i < word.length; i++) {
    if (word[i] == getLetter) {
      letters[i].innerText = getLetter;
      letters[i].style.background = "rgb(177, 255, 223)";
      found = true;
    }
  }
  
  document.getElementById("getLetters").focus();

  if (!found) {
    faildLetters.push(getLetter);
    fails.innerText = "Mellélőtt karakterek: ";
    fails.innerText += faildLetters;
    maxFails -= 1;
    restLife.innerText = `Maradék élet: ${maxFails}`;
    if (maxFails < 1) {
          
        
        document.querySelector("img").style.display = "block"
        document.getElementById("mainBox").style.display = "none"
        alert("Vesztettél");
    }
  }
  console.log(faildLetters);
  document.getElementById("getLetters").value = "";
  // const input = document.getElementById('guessInput');
  // const letter = input.value.toLowerCase();
  // input.value = '';
};
