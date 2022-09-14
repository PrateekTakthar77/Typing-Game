const question = document.querySelector(".typing-Question p");
const userinput = document.querySelector(".container .text-field");
const mistakesValue = document.querySelector(".Mistakes span");
const TimerValue = document.querySelector(".timeleft span b");
const WPM = document.querySelector(".WPM span");
const CPM = document.querySelector(".CPM span");
const tryagainBTN = document.querySelector("button");

// Timer
let timer,
    maxtime = 60,
    timeleft = maxtime,
    charindex = mistake = Inputgiven = 0;
function randomQs() {
    let randomvalue = Math.floor(Math.random() * paragraphs.length);
    question.innerHTML = "";
    // doubt
    paragraphs[randomvalue].split("").forEach(assigned => {
        let spanvalue = `<span>${assigned}</span>`;
        question.innerHTML += spanvalue;
    });
    document.addEventListener("keydown", () => userinput.focus());
    question.addEventListener("click", () => userinput.focus());

}
function typing() {
    const typed = question.querySelectorAll("span");
    let inputValue = userinput.value.split("")[charindex];
    if (charindex < typed.length - 1 && timeleft > 0) {
        if (!Inputgiven) { // timing started it won't be reset 
            timer = setInterval(initTimer, 1000);
            Inputgiven = true;
        }
        // backspace working or none vallue entered
        if (inputValue == null) {
            charindex--;
            if (typed[charindex].classList.contains("Incorrect")) {
                mistake--;
            }
            typed[charindex].classList.remove("Correct", "Incorrect");
        } else {
            if (typed[charindex].innerText === inputValue) {
                typed[charindex].classList.add("Correct");
            } else {
                mistake++;
                typed[charindex].classList.add("Incorrect");
            }
            charindex++;
        }
        typed.forEach(span => span.classList.remove("active"));
        typed[charindex].classList.add("active");
        mistakesValue.innerText = mistake;
        CPM.innerText = charindex - mistake;

        // wpm
        // if statement to show wpm after timer over
        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        // if wpm 0 or !not or infinity the default value will be zero
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        WPM.innerText = wpm;
    } else{
        clearInterval(timer)
        userinput.value = "";
    }
}

function initTimer() {
    if (timeleft > 0) {
        timeleft--;
        TimerValue.innerText = timeleft;
    } else {
        clearInterval(timer);
    }
}

randomQs();

function resetgame(){
    randomQs();
    // randon q and reseting all values
    userinput.value = "";
    clearInterval(timer)
    timeleft = maxtime,
    charindex = mistake = Inputgiven = 0;
    TimerValue.innerText = timeleft;
    mistakesValue.innerText = mistake;
    WPM.innerText = 0;
    CPM.innerText = 0;
}

tryagainBTN.addEventListener("click", resetgame)
userinput.addEventListener("input", typing);
//34:27 try again button