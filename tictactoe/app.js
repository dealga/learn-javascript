let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#reset');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');


let turn0 = false;

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns 
    [0, 4, 8], [2, 4, 6] // diagonals
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log('box was clicked');
        if(turn0 == true){
            box.innerText = "O";
            turn0 = false;
        }
        else{
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

const enableBoxes = () =>{
    for(box of boxes){
        box.disabled = false;
        box.innerText = "";
        msgContainer.classList.add('hide');
    }
};

const resetGame = () => {
    turn0 = false;
    for(let pattern of winPatterns){
        boxes[pattern[0]].style.backgroundColor = "#FFA07A";
        boxes[pattern[1]].style.backgroundColor = "#FFA07A";
        boxes[pattern[2]].style.backgroundColor = "#FFA07A";
    }
    resetBtn.innerText = "reset";
    enableBoxes();
};

const disableBoxes = () =>{
    for(box of boxes){
        box.disabled = true;
    }
};

const showWinner = (winner) => {
    msg.innerText = "congratulations " + winner + " you won!";
    msgContainer.classList.remove('hide');
    disableBoxes();
    confetti({
        particleCount: 1000, // Adjust the number of confetti particles
        spread: 300, // Adjust the spread of confetti
        origin: { x: 0.5, y: 0.5 }, // Center the origin in the middle of the screen
        colors: ['#ff0', '#0f0', '#00f', '#f00'] // Customize the colors
    });
    resetBtn.innerText = "Play Again";
}

const checkWinner = () => { 
    let isDraw = true;                                           //we first set it as true and then check if there is any empty box and then set it as false
    for(let pattern of winPatterns){                             //this way, we check if isdraw=true till the end, then it is a draw
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if(pos1val != "" && pos2val != "" && pos3val != ""){
            if(pos1val == pos2val && pos2val == pos3val){
                console.log('winner');
                boxes[pattern[0]].style.backgroundColor = "green";
                boxes[pattern[1]].style.backgroundColor = "green";
                boxes[pattern[2]].style.backgroundColor = "green";
                showWinner(pos1val);
                
            }
        }
    }
    for (let box of boxes) {
        if (box.innerText === "") {
            isDraw = false;  // There's still an empty box, so it's not a draw
            break;
        }
    }

    // If it's a draw, call the showDraw function
    if (isDraw) {
        console.log('Draw');
        showDraw();  // Implement a function to show a draw message or do something
    }
};

const showDraw = () => {
    msg.innerText = "It's a draw!";
    msgContainer.classList.remove('hide');
    disableBoxes();
    for(let pattern of winPatterns){
        boxes[pattern[0]].style.backgroundColor = "red";
        boxes[pattern[1]].style.backgroundColor = "red";
        boxes[pattern[2]].style.backgroundColor = "red";
    }
    resetBtn.innerText = "Play Again";
}

resetBtn.addEventListener("click", () => {
    resetGame();
});