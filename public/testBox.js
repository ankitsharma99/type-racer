//the currently targeted word
let currentWordNumber = 1;
let isFocus = false;
//only allow new word if user is focused on text box
selectThisWord(currentWordNumber);

let testBoxText = document.getElementById('test-box-text');
let minusMarginTop = 0;

let userScore = 0;


// every time the user releases a key
let inputText = document.getElementById('write-box');
window.addEventListener('keyup', event => {
    //if the most recent key pressed was a space
    if(event.code === 'Space' && isFocus) {
        let wordStore = inputText.value.trim();
        inputText.value = '';
        currentWordNumber++;
        selectThisWord(currentWordNumber, wordStore);
    }
});

// //give the currently selected styling to this word
function selectThisWord(currentWordNumber, wordStore) {
    //need to remove previous word once game has started
    let prevWord;
    if(currentWordNumber > 1) {
        prevWord = document.querySelector(`#test-box-text span:nth-child(${currentWordNumber - 1})`);
        prevWord.setAttribute('class', '');
        shouldUserScore(wordStore, prevWord);
    }
    let currentWord = document.querySelector(`#test-box-text span:nth-child(${currentWordNumber})`);
    currentWord.setAttribute('class', 'current-word');
    //is the user selecting a word on a new line
    if(prevWord) {
        isNewLine(prevWord, currentWord);
    }

}

function shouldUserScore(userInput, prevWord) {
    let textValue = prevWord.textContent; 
    if(userInput === textValue) {
        prevWord.style.color = 'green';
        userScore++;
    }
    else {
        prevWord.style.color = 'red';
    }
}

function isNewLine(prevWord, currentWord) {
    let prevWordRect = prevWord.getBoundingClientRect();
    let currentWordRect = currentWord.getBoundingClientRect();
    if(prevWordRect.top !== currentWordRect.top) {
        minusMarginTop = -65;
        testBoxText.style.marginTop = minusMarginTop + 'px';
    }
}