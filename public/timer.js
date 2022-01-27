let timerText = document.getElementById('timer-text');
let gameStart = false;

function inputType(input) {
    let textInput = input.value;
    if(!gameStart) {
        startTimer(60, timerText);
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
        }
    }, 1000);
}