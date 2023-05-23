var testButton = document.getElementById("testButton");

function gobackTest(){
    var buttonGen = document.createElement("button");
    buttonGen.textContent = "Go all the way back"
    buttonGen.addEventListener("click", function(){
        var indexHTML = './index.html';
        window.location.replace(indexHTML);
    });
    testButton.append(buttonGen);
};

gobackTest();