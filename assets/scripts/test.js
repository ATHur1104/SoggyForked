var player = {
    name: playernameLS,
    level: "1",
    originalHealth: "25",
    health: "25",
    damage: "3",
};

var fightMon;

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
                    fightMon = {
                        name: data.name,
                        originalHealth: data.hit_points,
                        health: data.hit_points,
                        damage: data.strength,
                        image: 
                        // googleFetch,
                        data.image
                            ? baseUrl + data.image
                            : "https://i.kym-cdn.com/entries/icons/original/000/019/740/spoons.jpg",
                    };
                    console.log(fightMon);
                    return fightMon;
                });
        });
}

function imageGeneration() {
    fetch(`https://serpapi.com/playground?engine=google_images&q=cartoon+${fightMon.name}&gl=us&hl=en&ijn=0`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Further processing of the data
    })
    .catch(error => {
        console.log(error);
    });
}



var background = document.getElementById("body");
var startBtn = document.getElementById("startButton");
var imageBtn = document.getElementById("imageButton")
var initialSelect = document.getElementById("initial-select");

// generates initial start screen using start button event listener

startBtn.addEventListener("click", fightClick);
imageBtn.addEventListener("click", imageGeneration);

// prompts user to either go back to start or enter

function fightClick() {
    getRandomMonster(apiDndMon).then((fightMon) => {
        initialSelect.innerHTML = "";


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


// google image api for cartoon+fightmon.index
