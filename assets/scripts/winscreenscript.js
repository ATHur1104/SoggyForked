var playerArray = JSON.parse(localStorage.getItem('playerData'));
var playerstatsArray = [
    "Name: " + playerArray.name.toUpperCase(),
    "Health: " + playerArray.originalHealth,
    "Attack Power: " + playerArray.damage,
]
var winMsg = document.getElementById("winmsg");
var celebrationBtn = document.createElement("button");
celebrationBtn.classList.add("dialogueBtn")
var winmsgText = document.createElement("p");
var highscoreSec = document.getElementById("highscore");

function winStart(){
    var playerName = playerArray.name;
    celebrationBtn.textContent = ">Awesome, can I go home now?";
    winmsgText.textContent = "Grogg: well now, " + playerName.toUpperCase() + "! My bog has never looked quite so empty nor sounded quite so silent. I'd say your debt is more than clear!";
    winMsg.classList.add("dialogueBox");
    celebrationBtn.addEventListener("click", function(){
        statsDisplay();
    })
    winMsg.append(winmsgText);
    highscoreSec.append(celebrationBtn);
};

winStart();

function statsDisplay(){
    highscoreSec.innerHTML = '';
    var highscoreText = document.createElement("p");
    var highScore = playerArray.level -= 1;
    winmsgText.textContent = "Grogg: Oh! Home...yes...I suppose. But first, let's see how you did!"
    for (var i = 0; i < playerstatsArray.length; i++){
        var statFinal = document.createElement("p");
        statFinal.textContent = playerstatsArray[i];
        statFinal.className = "statFinal";
        highscoreSec.append(statFinal);
    }
    if (highScore === 1){
        highscoreText.textContent = "Score: " + highScore + " monster killed!"
    } else {
        highscoreText.textContent = "Score: " + highScore + " monsters killed!"
    };
    celebrationBtn.textContent = ">..."
    celebrationBtn.addEventListener("click", function(){
        goodbyeGrogg();
    })
    highscoreSec.append(highscoreText, celebrationBtn);
};

function goodbyeGrogg(){
    highscoreSec.innerHTML = '';
    winmsgText.textContent = "Grogg: Well, I guess this is goodbye...just go two miles south, five miles east, spin around three times, do a little dance, and you should find the path home. Feel free to come back and visit your old friend Soggy Grogg any time!"
    celebrationBtn.textContent = ">Thanks, Grogg. You take care now...";
    celebrationBtn.addEventListener("click", function(){
        headHome();
    })
    highscoreSec.appendChild(celebrationBtn);
};

function headHome(){
    highscoreSec.innerHTML = '';
    winmsgText.textContent = "As you head back, you feel much stronger than you did at the beginning of your journey. This is definitely going to be one weird story to tell people when you get back!"
    celebrationBtn.textContent = ">Return to start"
    celebrationBtn.addEventListener("click", function(){
        window.location.replace("./index.html");
    })
    highscoreSec.appendChild(celebrationBtn);
}