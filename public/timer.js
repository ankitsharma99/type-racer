let timerText = document.getElementById('timer-text');
let gameStart = false;
//set inputtext to blank on page refresh
inputText.value = '';
//score when game ends
let scoreContainer = document.getElementById('score');
let scoreWPM = document.getElementById('score-wpm');




function inputType(input) {
    let textInput = input.value;
    if(!gameStart) {
        startTimer(15, timerText);
        gameStart = true;
    }
}

//Start the timer
function startTimer(duration, ele) {
    let timer = duration;
    let minutes;
    let seconds;
    let tick = setInterval(() => {
        //we parse int becaues we append a string to the section
        minutes = parseInt(timer/60);
        seconds = parseInt(timer%60);
        //format the timer
        seconds = seconds < 10 ? "0"+seconds : seconds;

        ele.textContent = minutes + ':' + seconds;
        timer--;
        // if timer equals or less than zero then game over
        if(timer < 0) {
            clearInterval(tick);
            ele.textContent = 'END';
            //show game over score
            showGameOver();
        }
    }, 1000);
}


function showGameOver() {
    //user can not type into the input now
    inputText.disabled = true;
    let currentWord = document.querySelector(`#test-box-text span:nth-child(${currentWordNumber})`);
    currentWord.setAttribute('class', '');
    inputText.value = '';
    //show score
    let wordsPerMinute = Math.round((userScore/0.5)/5)*3;
    scoreWPM.textContent = wordsPerMinute + ' WPM';
    
    scoreContainer.style.display = 'block';
}

//on focus is useful for testbox file
function onFocus() {
    isFocus = true;
}

function onBlur() {
    isFocus = false;    
}