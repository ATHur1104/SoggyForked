var player = {
    name: playernameLS,
    level: "1",
    originalHealth: "25",
    health: "25",
    damage: "3",
};

var difficulty = (player.level / 8) * player.level;


var baseUrl = `https://www.dnd5eapi.co`;
var apiDndMon = `https://www.dnd5eapi.co/api/monsters?challenge_rating=${difficulty}`;
var playernameLS = JSON.parse(localStorage.getItem("player-name"));
var playernameArray = [];
var monstersfoughtArray = [];

function getRandomMonster(apiDndMon) {
    return fetch(apiDndMon)
        .then((response) => response.json())
        .then((data) => {
            console.log(data.results);
            var monsters = data.results.map((monster) => {
                return {
                    name: monster.name,
                    url: monster.url,
                    index: monster.index,
                };
            });
            console.log(monsters);
            var randomChoice = Math.floor(Math.random() * monsters.length);
            var randomMonster = monsters[randomChoice];
            console.log(randomMonster);

            var randMonUrl = `https://www.dnd5eapi.co/api/monsters/${randomMonster.index}`;
            return fetch(randMonUrl)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    // fightMon is the object that contains monster information
                    var fightMon = {
                        name: data.name,
                        originalHealth: data.hit_points,
                        health: data.hit_points,
                        damage: data.strength,
                        image: data.image
                            ? baseUrl + data.image
                            : "https://i.kym-cdn.com/entries/icons/original/000/019/740/spoons.jpg",
                    };
                    console.log(fightMon);
                    return fightMon;
                });
        });
}

var dialogueIteration = 0;

var background = document.getElementById("body");
var startBtn = document.getElementById("startButton");
var namePrompt = document.getElementById("name-alert");
var groggDialogue = document.createElement("p");
groggDialogue.className = "dialogueBox";
groggDialogue.classList.add('typewriter');
var dialogueDiv = document.getElementById("dialogue");
var playerResponse = document.createElement("button");
playerResponse.className = "dialogueBtn";

var initialSelect = document.getElementById("initial-select");
var healthbarSection = document.getElementById("healthmodal-sect");
var monstersfoughtSection = document.getElementById("monstermodal-sect");

// generates initial start screen using start button event listener
function startPage() {
    initialSelect.innerHTML = "";
    startBtn.textContent = ">START!";
    startBtn.addEventListener("click", function () {
        beginAdventure();
    });
}

startPage();

// prompts user to either go back to start or enter
function beginAdventure() {
    initialSelect.innerHTML = "";
    startBtn.style.display = "none";
    var goBack = document.createElement("button");
    goBack.textContent = ">Return to start";
    goBack.className = "dialogueBtn";
    goBack.style.marginRight = "70px";
    goBack.addEventListener("click", function () {
        location.reload();
    });

    var goAdventure = document.createElement("button");
    goAdventure.textContent = ">I'm ready to go!";
    goAdventure.className = "dialogueBtn";
    goAdventure.addEventListener("click", function () {
        setName();
    });

    var lastChance = document.createElement("p");
    lastChance.className = "dialogueBox";
    lastChance.textContent =
        "Last chance to turn back. Adventuring isn't for the faint of heart, you know.";

    initialSelect.append(lastChance, goBack, goAdventure);
}

// modal for if name is blank
function nameModal() {
    var modal = document.getElementById("name-modal");
    var close = document.getElementById("closeBtn-name");
    modal.style.display = "block";
    close.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}

function updatePlayerName(newName) {
    player.name = newName;
}


// allows user to set name
function setName() {
    initialSelect.innerHTML = "";
    var enterName = document.createElement("input", "text");
    enterName.setAttribute("placeholder", "Enter Your Name");
    enterName.className = "nameBox";
    var submitName = document.createElement("button");
    submitName.textContent = ">Submit!";
    submitName.addEventListener("click", function () {
        var nameVal = enterName.value;
        localStorage.setItem("player-name", JSON.stringify(nameVal));
        playernameArray.push(nameVal);
        updatePlayerName(nameVal);

        if (nameVal === undefined || nameVal === "") {
            nameModal();
        } else {
            gameIntro();
        }
    });
    initialSelect.append(enterName, submitName);
    return;
}

function healthModal() {
    var playerHealthBar = document.createElement("div");
    var healthModal = document.getElementById("health-modal");
    var closeBtn = document.createElement("button");
    closeBtn.textContent = "Close";
    closeBtn.className = "closeBtn"
    closeBtn.addEventListener("click", function () {
        healthModal.style.display = "none";
    });
    healthModal.style.display = "flex";
    healthModal.innerHTML = '';
    playerHealthBar.id = ("player", "hp-bar");
    playerHealthBar.setAttribute("data-value", (player.health / player.originalHealth).toString()
    );
    playerHealthBar.classList.add("rpgui-progress", "green", "healthbar-style");
    playerHealthBar.innerHTML = `Player's Health <div class=" rpgui-progress-track"><div class=" rpgui-progress-fill green" style="left: 0px; width: ${(player.health / player.originalHealth) * 100}%;"></div></div><div class=" rpgui-progress-left-edge"></div><div class=" rpgui-progress-right-edge"></div>`;

    healthModal.append(playerHealthBar, closeBtn);

    window.onclick = function (event) {
        if (event.target == healthModal) {
            healthModal.style.display = "none";
        }
    };
};

function monsterModal() {
    var monsterModal = document.getElementById("monster-modal");
    var closeBtn = document.createElement("button");
    monsterModal.innerHTML = '';
    closeBtn.textContent = "Close";
    closeBtn.className = "closeBtn"
    closeBtn.addEventListener("click", function () {
        monsterModal.style.display = "none";
    });
    monsterModal.style.display = "block";
    monsterModal.appendChild(closeBtn);
    for (var i = 0; i < monstersfoughtArray.length; i++) {
        var monsterName = document.createElement("P");
        monsterName.textContent = monstersfoughtArray[i];
        monsterModal.appendChild(monsterName);
    }

    window.onclick = function (event) {
        if (event.target == monsterModal) {
            monsterModal.style.display = "none";
        }
    };


}
//Spotify Modal
document.addEventListener("DOMContentLoaded", function () {
    var ambianceButton = document.getElementById("music");
    var spotifyModal = document.getElementById("spotify-modal");
    ambianceButton.addEventListener("click", function () {
        spotifyModal.style.display = spotifyModal.style.display === "none" ? "block" : "none";
    });
    var closeSpotifyButton = document.getElementById("closeBtn-spotify");
    closeSpotifyButton.addEventListener("click", function () {
        spotifyModal.style.display = "none";
    });
});


// intro dialogue/setup
function gameIntro() {
    var playerName = playernameArray.join("");
    var introDialogue = [
        {
            grogg: "Grogg: Hey, careful now! Stand up slowly.",
            player: ">[STAND UP]",
        },
        {
            grogg:
                "Grogg: There you go. We wouldn't want you fainting and drowning, would we?",
            player: ">Who are you?",
        },
        {
            grogg:
                "Grogg: Oh? Me? Why, I'm Grogg, of course! Soggy Grogg, to be exact, but you can call me Grogg. All my friends do. Lovely to meet you, " +
                playerName.toUpperCase() +
                ".",
            player: ">How do you know my name?",
        },
        {
            grogg:
                "Grogg: I know that and a great deal of other things about you, young " +
                playerName.toUpperCase() +
                ". A witch of my years knows many things. Anyhow, I've just saved your life!",
            player: ">Huh? I almost died?",
        },
        {
            grogg:
                "Grogg: I found you floating face-down in my bog. Another minute and you would've been fertilizing my peat. But you're alive! All thanks to me. So now, I believe you owe me a debt.",
            player: ">Are you going to eat me?",
        },
        {
            grogg:
                "Grogg: What? Eat you? How could you possibly repay me if I ate you? Goodness, I know you're barely alive, but clean the mud from your ears and try to listen.",
            player: ">Okay...",
        },
        {
            grogg:
                "Grogg: No, young " +
                playerName.toUpperCase() +
                ", I need a different type of assistance.",
            player: ">Ominous. Go on.",
        },
        {
            grogg:
                "Grogg: You see, my beloved bog has been overrun! Overtaken! Scourged by beasts and monsters! I would take care of them myself, but I'm afraid my strength isn't what it used to be...",
            player: ">I see. And this is where I come in?",
        },
        {
            grogg:
                "Grogg: Exactly! You learn quickly. In order to repay me for saving you, you're going to clear them out for me. Sound good?",
            player: ">Do I have much of a choice in the matter?",
        },
        {
            grogg:
                "Grogg: Well...'choice' is a subjective term. After each monster killed, you can choose to keep adventuring or choose to return and rest at my hut.",
            player: ">But I can't leave. Is that right?",
        },
        {
            grogg: "",
            player: "",
        },
    ];
    var currentEntryIndex = 0;
    var currentCharIndex = 0;

    initialSelect.style.display = "none";
    dialogueDiv.style.display = "flex";
    groggDialogue.textContent = introDialogue[dialogueIteration].grogg;
    playerResponse.textContent = introDialogue[dialogueIteration].player;
    dialogueDiv.append(groggDialogue, playerResponse);
    playerResponse.addEventListener("click", function () {
        dialogueDiv.innerHTML = "";
        dialogueIteration++;
        groggDialogue.textContent = introDialogue[dialogueIteration].grogg;
        playerResponse.textContent = introDialogue[dialogueIteration].player;
        dialogueDiv.append(groggDialogue, playerResponse);
        if (dialogueIteration > 9) {
            letsGo();
            return;
        }
    });
}

// begin adventure officially
function letsGo() {
    groggDialogue.textContent =
        "Grogg: Not until your debt is paid, I'm afraid. It's not me, you see, it's the magical laws around debts and life's worth and...oh, nevermind. That's all terribly dull. Why don't we go back to my hut and you can head out in the morning, hm?";
    playerResponse.textContent =
        ">Sure, a rest would be nice [RETURN TO GROGG'S HUT]";
    playerResponse.addEventListener("click", function () {
        dialogueDiv.style.display = "none";
        initialSelect.style.display = "flex";
        initialSelect.innerHTML = "";
        var adventureMsg = document.createElement("p");
        var letsgoBtn = document.createElement("button");

        adventureMsg.textContent =
            "After a full night's rest in Grogg's hut, you feel energized and ready to adventure...";
        adventureMsg.className = "dialogueBox";
        letsgoBtn.textContent = ">Alright, let's do this!";
        letsgoBtn.addEventListener("click", function () {
            fightorRest();
        });

        initialSelect.append(adventureMsg, letsgoBtn);
        healthbarSection.style.display = "block";
        healthbarSection.textContent = "View Health";
        healthbarSection.addEventListener("click", function () {
            healthModal();
            console.log(player);
        });
        monstersfoughtSection.style.display = "block";
        monstersfoughtSection.textContent = "Monsters Defeated";
        monstersfoughtSection.addEventListener("click", function () {
            monsterModal();
        })
    });
}

// function for resting
function restUp() {
    initialSelect.innerHTML = "";
    var sleepyTime = document.createElement("p");
    var sleepyBtn = document.createElement("button");
    sleepyTime.textContent =
        "Grogg: oh, my! Back already, " +
        playernameArray.join("").toUpperCase() +
        "? Well, I suppose a rest is in order...";
    sleepyBtn.textContent = ">Sleep for the night";
    sleepyBtn.addEventListener("click", function () {
        initialSelect.innerHTML = "";
        var restMsg = document.createElement("p");
        var backtoAdventure = document.createElement("button");
        restMsg.textContent =
            "You spend another restful night in Grogg's hut and wake feeling a little stronger!";
        backtoAdventure.textContent = ">Return to the bog";
        backtoAdventure.addEventListener("click", function () {
            fightorRest();
        });
        initialSelect.append(restMsg, backtoAdventure);
        // heal function placeholder 100% heal for now
        player.health = parseInt(player.originalHealth);
        console.log(player.health);
    });
    initialSelect.append(sleepyTime, sleepyBtn);
}

// prompts user to fight or rest
function fightorRest() {
    initialSelect.innerHTML = "";
    var playerLS = JSON.stringify(player);
    localStorage.setItem('playerData', playerLS);
    var fightorrestPrompt = document.createElement("p");
    var fightBtn = document.createElement("button");
    var restBtn = document.createElement("button");
    fightorrestPrompt.className = "dialogueBox";
    fightorrestPrompt.textContent =
        "Wandering through the bog, you encounter a Monster. What do you do?";
    // will find out a way to have the fightmon.name appear later

    fightBtn.textContent = ">Stay and fight--this will be easy!";
    fightBtn.className = "fightorrestBtn";
    fightBtn.addEventListener("click", fightClick)

    restBtn.textContent = ">Flee and rest--I need to heal.";
    restBtn.className = "fightorrestBtn";
    restBtn.addEventListener("click", function () {
        console.log("Do I look like I wanna die rn?");
        restUp();
    });
    initialSelect.append(fightorrestPrompt, fightBtn, restBtn);
}

function fightClick() {
    getRandomMonster(apiDndMon).then((fightMon) => {
        initialSelect.innerHTML = "";
        monstersfoughtSection.style.display = "none";
        healthbarSection.style.display = "none";
        initialSelect.style.display = "flex";
        initialSelect.style.flexDirection = "column";
        initialSelect.className = "text-light";

        var monsterImageUrl = fightMon.image;
        console.log(monsterImageUrl);

        var fightMonImage = document.createElement("div");
        fightMonImage.style.backgroundImage = `url(${monsterImageUrl})`;
        fightMonImage.style.backgroundSize = "cover";
        fightMonImage.style.backgroundPosition = "center";
        fightMonImage.style.width = "25vw";
        fightMonImage.style.height = "35vh";

        console.log("Mama didn't raise a quitter");

        var monHealthGUI = document.createElement("div");
        monHealthGUI.id = "monster" + "hp-bar";
        monHealthGUI.setAttribute("data-value", "1.0");
        monHealthGUI.classList.add("rpgui-progress", "red");
        monHealthGUI.innerHTML = `${fightMon.name}'s Health <div class=" rpgui-progress-track"><div class=" rpgui-progress-fill red" style="left: 0px; width: 100%;"></div></div><div class=" rpgui-progress-left-edge"></div><div class=" rpgui-progress-right-edge"></div>`;

        initialSelect.appendChild(monHealthGUI);
        initialSelect.appendChild(fightMonImage);

        combatBox = document.createElement("div");
        combatBox.className = "rpgui-container framed-golden-2 combatBox";
        combatBox.style.width = "91vw";
        combatBox.style.height = "fit-content";
        combatBox.style.display = "flex";
        combatBox.style.flexWrap = "wrap";

        var playerHealthBar = document.createElement("div");
        playerHealthBar.id = "player-hp-bar";
        playerHealthBar.setAttribute("data-value", (player.health / player.originalHealth).toString());
        playerHealthBar.classList.add("rpgui-progress", "green");
        playerHealthBar.innerHTML = `Player's Health <div class=" rpgui-progress-track"><div class=" rpgui-progress-fill green" style="left: 0px; width: ${(player.health / player.originalHealth) * 100}%;"></div></div><div class=" rpgui-progress-left-edge"></div><div class=" rpgui-progress-right-edge"></div>`;
        playerHealthBar.style.width = "75%";

        var buttonContainer = document.createElement("div");
        buttonContainer.style.display = "flex";
        buttonContainer.style.flexDirection = "column";
        buttonContainer.classList.add("buttonContainer")
        buttonContainer.style.width = "25%";
        buttonContainer.style.alignItems = "flex-end";

        var atkBox = document.createElement("button");
        var atkBoxIcon = document.createElement("div");
        atkBox.id = "atkbtn";
        atkBox.classList.add("rpgui-container", "rpgui-framed-golden-2", "atkBox");
        atkBox.style.width = "fit-content";
        atkBox.style.height = "fit-content";
        atkBox.style.position = "relative";

        atkBoxIcon.classList.add("rpgui-icon", "sword");

        atkBox.appendChild(atkBoxIcon);
        atkBox.appendChild(document.createTextNode("Attack"));
        atkBox.addEventListener("click", function () {
            console.log("attack button clicked");
            fightCycle(player, fightMon);
        });

        var runBox = document.createElement("button");
        var runBoxIcon = document.createElement("div");
        runBox.id = "runbtn";
        runBox.classList.add("rpgui-container", "rpgui-framed-golden-2", "runBox");
        runBox.style.width = "fit-content";
        runBox.style.height = "fit-content";
        runBox.style.position = "relative";

        runBoxIcon.classList.add("rpgui-icon", "exclamation");

        runBox.appendChild(runBoxIcon);
        runBox.appendChild(document.createTextNode("Run"));
        runBox.addEventListener("click", function () {
            console.log("you ran!");
            initialSelect.innerHTML = "";
            monstersfoughtSection.style.display = "block";
            healthbarSection.style.display = "block";
            combatBox.style.display = "none";
            var runDialog = document.createElement("p");
            runDialog.textContent = "You run as far away from the monster as your legs can take you until you are safe. When you look up, you are back at Grogg's."

            var runContinue = document.createElement("button");
            runContinue.textContent = "Continue"
            runContinue.addEventListener("click", toDo)
            initialSelect.append(runDialog, runContinue);
        });

        buttonContainer.appendChild(atkBox);
        buttonContainer.appendChild(runBox);

        combatBox.appendChild(playerHealthBar);
        combatBox.appendChild(buttonContainer);
        document.querySelector(".rpgui-container").appendChild(combatBox);


        function fightCycle(player, fightMon) {
            fightMon.health -= player.damage;

            monHealthGUI.setAttribute(
                "data-value",
                (fightMon.health / fightMon.originalHealth).toString()
            );
            monHealthGUI.querySelector(".rpgui-progress-fill").style.width = `${(fightMon.health / fightMon.originalHealth) * 100
                }%`;
            // add div for "Player does player.strength damage to fightmon.name"

            // add css for hitting somewhere inside initialselector
            if (fightMon.health > 0) {
                player.health -= fightMon.damage;
                playerHealthBar.setAttribute(
                    "data-value",
                    (player.health / player.originalHealth).toString()
                );
                playerHealthBar.querySelector(".rpgui-progress-fill").style.width = `${(player.health / player.originalHealth) * 100
                    }%`;
                console.log(fightMon.health);
                console.log(player.health);
                // add modal for "fightmon.name does fightmon.strength damage to player.name"
                // add css for doom damage

                if (player.health <= 0) {
                    console.log(fightMon.health);
                    console.log(player.health);
                    player.health = 0;
                    var playerLS = JSON.stringify(player);
                    localStorage.setItem('playerData', playerLS)
                    // you died screen and return to start
                    window.location.href = "./deathscreen.html";
                    return false;
                }
            } else {
                console.log(fightMon.health);
                console.log(player.health);
                fightMon.health = 0;
                monstersfoughtArray.push(fightMon.name);
                levelUp();

                return true;
            }
        }
    });
};

function levelUp() {
    initialSelect.innerHTML = "";
    combatBox.style.display = "none";
    // win screen and back to screen with fight or rest
    var winScreen = document.createElement("div");
    winScreen.className = "text-light";
    winScreen.innerHTML = `You have defeated the monster!<br>You level up!<br>${player.level} => ${parseInt(player.level) + 1}<br>Choose an option:`;

    var healthOption = document.createElement("button");
    healthOption.textContent = "Raise Health";
    healthOption.className = "levelUpBtn";
    healthOption.addEventListener("click", function () {
        var healthIncrease = 3;
        player.originalHealth = parseInt(player.originalHealth) + healthIncrease;
        player.health = parseInt(player.health) + healthIncrease;
        player.level = parseInt(player.level) + 1;
        if (player.level >= 15) {
            window.location.replace('./winscreen.html')
            return;
        }
        console.log("health clicked");
        // Return to the screen with fight or rest
        toDo();
    });

    var damageOption = document.createElement("button");
    damageOption.textContent = "Raise Damage";
    damageOption.className = "levelUpBtn";
    damageOption.addEventListener("click", function () {
        player.damage = parseInt(player.damage) + 1;
        player.level = parseInt(player.level) + 1;
        if (player.level >= 15) {
            window.location.replace('./winscreen.html')
            return;
        }
        console.log("damage clicked");
        toDo();
        // Return to the screen with fight or rest
    });

    healthbarSection.style.display = "block";
    healthbarSection.textContent = "View Health";
    healthbarSection.addEventListener("click", function () {
        healthModal();
        console.log(player);
    });
    monstersfoughtSection.style.display = "block";
    monstersfoughtSection.textContent = "Monsters Defeated";
    monstersfoughtSection.addEventListener("click", function () {
        monsterModal();
    })
    initialSelect.append(winScreen, healthOption, damageOption);
}

function toDo() {
    initialSelect.innerHTML = "";
    var playerLS = JSON.stringify(player);
    localStorage.setItem('playerData', playerLS);
    var whatNow = document.createElement("p");
    whatNow.textContent = "What would you like to do now?"
    var fightBtn = document.createElement("button");
    fightBtn.textContent = ">Let's get back out there!"
    fightBtn.addEventListener("click", fightClick);
    var restBtn = document.createElement("button");
    restBtn.textContent = ">Let's get some rest."
    restBtn.addEventListener("click", restUp);
    initialSelect.append(whatNow, fightBtn, restBtn);
};

// google image api for cartoon+fightmon.index
