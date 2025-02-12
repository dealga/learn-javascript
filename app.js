let userScore = 0;
let compScore = 0;

let resetBtn = document.querySelector("#msg");

let updatedUserScore = document.querySelector("#user-score");
let updatedCompScore = document.querySelector("#comp-score");
const choices = document.querySelectorAll(".choice");

const genCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    let randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
};

const drawGame = () =>{
    console.log("game was drawn");
}

showWinner = (userWin) => {
    if(userWin){
        console.log("you win");
        userScore++;
        updatedUserScore.style.backgroundColor = "green"; // Set user score background to green
        updatedCompScore.style.backgroundColor = ""; // Reset computer score background
    }
    else{
        console.log("you lose");
        compScore++;
        updatedCompScore.style.backgroundColor = "red"; // Set computer score background to red
        updatedUserScore.style.backgroundColor = ""; // Reset user score background
    }
    
    updatedUserScore.innerText = userScore;
    updatedCompScore.innerText = compScore;

    // Reset background color after 1 second
    setTimeout(() => {
        updatedUserScore.style.backgroundColor = "";
        updatedCompScore.style.backgroundColor = "";
    }, 100);
};

const playGame = (userChoice) => {
    console.log("user choice == ", userChoice);
    const computerChoice = genCompChoice();
    console.log("computer choice == ", computerChoice);
    if (userChoice == computerChoice){
        drawGame();
    }
    else {
        let userWin = true;
        if(userChoice === "rock"){
            userWin = computerChoice === "paper" ? false : true;
        }
        else if(userChoice === "paper"){
            userWin = computerChoice === "scissors" ? false : true; 
        }
        else if(userChoice === "scissors"){
            userWin = computerChoice === "rock" ? false : true;
        }
        showWinner(userWin);
    }
};

//since image and div size is the same, we add evenlistener to div

choices.forEach((choice) => {
    choice.addEventListener('click', () => {
        const userChoice = choice.getAttribute("id"); 
        playGame(userChoice);
    })
});

resetGame = () =>{
    userScore = 0;
    compScore = 0;
    updatedUserScore.innerText = userScore;
    updatedCompScore.innerText = compScore;
}

resetBtn.addEventListener("click", () => {
    resetGame();
});
