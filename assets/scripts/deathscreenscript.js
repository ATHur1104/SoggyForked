var playerArray = JSON.parse(localStorage.getItem('playerData'));
var deathResponse = [
    "Unfortunately, the monster you were fighting was simply built different.",
    "Sadly, you failed to get good.",
    "You goofed.",
    "Ruh roh, Raggy.",
    "You fell victim to one of the classic blunders.",
    "WASTED.",
    "Ripperoni and cheese.",
]
var deathMsg = document.getElementById("deathmsg");
var highscoreSec = document.getElementById("highscore");

function deathStart(){
    var deathmsgText = document.createElement("p");
    var highscoreText = document.createElement("p");
    var highScore = playerArray.level -= 1;
    var necromancyBtn = document.createElement("button");
    necromancyBtn.textContent = ">..."
    deathmsgText.textContent = "Grogg: " + deathResponse[Math.floor(Math.random() * deathResponse.length)];
    necromancyBtn.addEventListener("click", function(){
        necromanticAction();
    })

    if (highScore === 1){
        highscoreText.textContent = "Score: " + highScore + " monster killed!"
    } else {
        highscoreText.textContent = "Score: " + highScore + " monsters killed!"
    };
    
    deathMsg.append(deathmsgText);
    highscoreSec.append(highscoreText, necromancyBtn);
};

deathStart();

function necromanticAction(){
    deathMsg.innerHTML = '';
    highscoreSec.innerHTML = '';
    var necromancyOffer = document.createElement("P");
    var yesNecromancy = document.createElement("button");
    necromancyOffer.textContent = "Grogg: Oh, right. You can't respond. Death will do that to a person. Well, I suppose I'll need to revive you; you'll have to start over, though! Don't blame me, blame the nature of necromantic magic and-oh, nevermind."
    yesNecromancy.textContent = ">Try again!"
    yesNecromancy.addEventListener("click", function(){
        window.location.replace("./index.html");
    })
    deathMsg.append(necromancyOffer);
    highscoreSec.append(yesNecromancy);
}
