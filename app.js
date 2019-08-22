

/* get the elements of the quiz.html file*/
const timerDOM = document.getElementById("secs");
const germanName = document.getElementById('germanName');
const englishName = document.getElementById('englishName');
const containerField = document.getElementById('field-container');
const answer = document.getElementById('answer');
const imgDiv = document.getElementById('img-div');
var currentLevel = 0;


const difficultGermanWords = [
    {
      germanName: "die Heizölrückstoßabdämpfung",
      englishName: "the fuel oil recoil damping",
      image: "./images/damping.jpg",
      letters: 24
    },
    {
      germanName: "die Donaudampfschifffahrtskapitänskajüte",
      englishName: "the Danube steamship captain's cabin",
      image: "./images/ship.jpg",
      letters: 36
    },
    {
      germanName: "das Weihnachtsmannschokoladeeinpackpapier",
      englishName: "the Santa Claus chocolate wrapping paper",
      image: "./images/santaClaus.jpg",
      letters: 37
    },
    {
      germanName: "der Restmülltütenverschlusssicherungsdraht",
      englishName: "the residual waste bag closure and safety wire",
      image: "./images/wire.jpg",
      letters: 38
    },
    {
      germanName: "das Telekommunikationsdienstleistungsunternehmen",
      englishName: "the telecommunications service providers",
      image: "./images/telecom.png",
      letters: 44
    },
    {
      germanName: "die Verkehrsinfrastrukturfinanzierungsgesellschaft",
      englishName: "the transport infrastructure finance company",
      image: "./images/traffic.jpg",
      letters: 47
    },
    {
      germanName: "die Aufmerksamkeitsdefizitmedikamentenbeipackzettelschriftfarbe",
      englishName: "the attention deficit medication package leaflet color",
      image: "./images/color.jpg",
      letters: 59
    },
    {
      germanName: "der Mehrwertsteuerharmonierungskompromisslösungskommissionsbeschluß",
      englishName: "the Commission Decision on harmonisation of VAT compromise solutions",
      image: "./images/shocked.jpg",
      letters: 62
    },
    {
      germanName: "das Rindfleischetikettierungsüberwachungsaufgabenübertragungsgesetz",
      englishName: "the beef labeling monitoring task transfer law",
      image: "./images/law.jpg",
      letters: 63
    },
    {
      germanName: "die Selbstzerstörungsauslösungsschalterhintergrundbeleuchtungsglühlampensicherungshalterschraube",
      englishName: "the self-destruct trip switch backlighting incandescent lamp retaining screw",
      image: "./images/screw.jpg",
      letters: 92
    }
  ];

  /* change the layout of the page to enter the German and English name */
function enterNames(word) {
  let emptyDiv = document.getElementById('correctAnswer');
  emptyDiv.innerHTML = ``; 
  emptyDiv.classList.remove('red', 'green');

  germanName.innerText = `${word.germanName}`;
  englishName.innerText = `${word.englishName}`;
  answer.setAttribute(`disabled`, true);
} // is 


/* display only the English name  */
function enterOnlyEnglishNames(word) {
  answer.removeAttribute(`disabled`);
  germanName.innerText = ``;
  englishName.innerText = `${word.englishName}`;
  answer.focus();
  startTimer(timerDOM, 5, checkAnswer); // change the time here!
} // is working


/* change the images */
function changeImages(word) {
  imgDiv.querySelector("img").src = `${word.image}`;
} // is working


/* check the written entry of the user with the textfield */
function checkAnswer() {
  answer.setAttribute(`disabled`, true);
  let answerOfUser = answer.value.toLowerCase(); // necessary to compare the answer of the user and the germanName in the array
  let correctAnswer = difficultGermanWords[currentLevel].germanName.toLocaleLowerCase();
  let correct = document.getElementById('correctAnswer');
   // console.log(`why`, answerOfUser, correctAnswer);
   
  /* check if the answer and correct answer are the same */
    if(correctAnswer === answerOfUser) {
      correct.innerHTML = `<div id="correctAnswer" style="margin:20px;" >${difficultGermanWords[currentLevel].germanName} - <b> YEAH, that is correct! </b> <br /> 
      this word has ${difficultGermanWords[currentLevel].letters} letters! </div>`;
      //addText = document.getElementById('correctAnswer');
      correct.classList.add('green');
    } else {
    correct.innerHTML = `<div id="correctAnswer">${answerOfUser}  - <b> NOPE, sorry folk </b> <br /> 
    this word has ${difficultGermanWords[currentLevel].letters} letters! </div>`;
    correct.classList.add('red');
  }
  currentLevel++;
  startTimer(timerDOM, 5, startRound);
}

/* display at the end how many correct answers were given of the user  */


function startTimer(element, time, clbk) {
  const intervalId = setInterval(() => {
    if (time === 1) {
      clearInterval(intervalId);
      clbk();
    }
    element.innerHTML = --time;
  }, 1000);
} // if --time -1 otherwise time-- until 0 but it starts one second later
// change the condition from time <= 0 to time <= 1


/* this is the first called function */
function startRound() {
  const currentWord = difficultGermanWords[currentLevel];
  answer.value = ``;
  enterNames(currentWord);
  changeImages(currentWord);

  startTimer(timerDOM, 5, function() { // change the time here
    // console.log(`so far so good`)
    enterOnlyEnglishNames(currentWord);
  });
}

/* call the function to start the programm */
startRound();


