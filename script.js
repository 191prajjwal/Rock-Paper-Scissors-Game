
const rulesBtn = document.querySelector('.rules-btn');
const closeBtn = document.querySelector('.close-btn');
const gameRules = document.querySelector('.game-rules');
const rulesTempBtn = document.querySelector('.rules-temp');
const Rules = document.querySelector('.rules');


const nextDiv = document.querySelector('.next');

rulesBtn.addEventListener('click', () => {
    gameRules.classList.toggle('display-rules');
});
closeBtn.addEventListener('click', () => {
    gameRules.classList.toggle('display-rules');
});

rulesTempBtn.addEventListener('click', () => {
    gameRules.classList.toggle('display-rules');
});



const CHOICES = [
    {
        name: "paper",
        beats: "rock",
    },
    {
        name: "scissors",
        beats: "paper",
    },
    {
        name: "rock",
        beats: "scissors",
    },
]

const choiceButtons = document.querySelectorAll('.choice-btn');
const gameDiv = document.querySelector('.game');
const resultsDiv = document.querySelector('.results');
const resultDivs = document.querySelectorAll('.results__result');


const resultWinner = document.querySelector('.results__winner');
const resultText = document.querySelector('.results__text');
const againstPc = document.querySelector('.against');
const playAgainBtn = document.querySelector('.play-again');

const scoreNumber = document.querySelector('.player-score');
const pcScore = document.querySelector('.scoreAuto');


let score = parseInt(localStorage.getItem('PlayerScore')) || 0; 
let aiScore = parseInt(localStorage.getItem('ComputerScore')) || 0; 


scoreNumber.innerText = score;
pcScore.innerHTML = aiScore;





choiceButtons.forEach(button => {
    button.addEventListener('click', () => {
        const choiceName = button.dataset.choice;
        const choice = CHOICES.find(choice => choice.name === choiceName);
        choose(choice);
    })
});

function choose(choice) {
    const pcchoice = pcChoose();
    displayResults([choice, pcchoice]); 
    displayWinner([choice, pcchoice]);
}


function pcChoose() {
    const rand = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[rand]
}


function displayResults(results) {
    resultDivs.forEach((resultDiv, idx) => {
        setTimeout(() => {
            resultDiv.innerHTML = `
                <div class="choice ${results[idx].name}">
                    <img src="./assets/icon-${results[idx].name}.png" alt="${results[idx].name}"
                    " />
                </div>
            `
        }, idx * 1000);
    });
    gameDiv.classList.toggle('hidden');
    resultsDiv.classList.toggle('hidden');
}


function displayWinner(results) {
    setTimeout(() => {
        const userWins = isWinner(results);
        const pcWins = isWinner(results.reverse());

        if (userWins) {
            resultText.innerText = "you win";
            againstPc.classList.remove('hidden');
            rulesTempBtn.classList.remove('hidden'); 
            Rules.classList.add('hidden'); 
            nextDiv.classList.remove('hidden');
            resultDivs[0].classList.toggle('winner'); 
            playAgainBtn.innerText = "play again";
            userScore(1);
        } else if (pcWins) {
            resultText.innerText = "you lost";
            againstPc.classList.remove('hidden');
            resultDivs[1].classList.toggle('winner'); 
            playAgainBtn.innerText = "play again";
            PCscore(1);
        } else {
            resultText.innerText = "tie up";
            playAgainBtn.innerText = "replay";
        }
        resultWinner.classList.toggle('hidden');
        resultsDiv.classList.toggle('show-winner');
    }, 1000);
}

function isWinner(results) {
    return results[0].beats === results[1].name;
}

function userScore(point) {
    score += point;
    scoreNumber.innerText = score;
    localStorage.setItem('PlayerScore', score); 

}

function PCscore(pcPoint) {
    aiScore += pcPoint;
    pcScore.innerHTML = aiScore;
    localStorage.setItem('ComputerScore', aiScore); 
}


playAgainBtn.addEventListener('click', () => {
    gameDiv.classList.toggle('hidden');
    resultsDiv.classList.toggle('hidden');
    nextDiv.classList.add('hidden');           
    Rules.classList.remove('hidden');          
    rulesTempBtn.classList.add('hidden');      
    resultDivs.forEach(resultDiv => {
        resultDiv.innerHTML = "";
        resultDiv.classList.remove('winner');
    });

    resultText.innerText = "";
    resultWinner.classList.toggle('hidden');
    resultsDiv.classList.toggle('show-winner');
});