let clicks = 0;
let selectedTime = 5;
let started = false;

const clickArea = document.getElementById("clickArea");
const clicksEl = document.getElementById("clicks");
const cpsEl = document.getElementById("cps");
const bestEl = document.getElementById("best");

loadBest();

function setTime(time){
    selectedTime = time;
}

clickArea.addEventListener("click", function(){

    if(!started){
        startTest();
    }

    clicks++;
    clicksEl.textContent = clicks;

});

function startTest(){

    started = true;
    clicks = 0;

    clicksEl.textContent = "0";
    cpsEl.textContent = "0.00";

    clickArea.innerHTML =
    "<h2>⏳ " + selectedTime + "s Running...</h2>";

    setTimeout(function(){

        started = false;

        let cps =
        (clicks / selectedTime).toFixed(2);

        cpsEl.textContent = cps;

        clickArea.innerHTML =
        "<h2>🔥 CLICK TO START</h2>";

        updateBest(cps);

        saveHistory(cps);

        alert(
            "Test Finished!\n\n" +
            "Clicks: " + clicks +
            "\nCPS: " + cps
        );

    }, selectedTime * 1000);

}

function loadBest(){

    let best =
    localStorage.getItem("bestCPS");

    if(best){
        bestEl.textContent = best;
    }else{
        bestEl.textContent = "0.00";
    }

}

function updateBest(cps){

    let best =
    localStorage.getItem("bestCPS");

    if(
        !best ||
        parseFloat(cps) > parseFloat(best)
    ){

        localStorage.setItem(
            "bestCPS",
            cps
        );

        bestEl.textContent = cps;
    }

}

function saveHistory(cps){

    let history =
    JSON.parse(
        localStorage.getItem("cpsHistory")
    ) || [];

    history.push(Number(cps));

    if(history.length > 20){
        history.shift();
    }

    localStorage.setItem(
        "cpsHistory",
        JSON.stringify(history)
    );

}

function submitScore(){

    let username =
    document
    .getElementById("username")
    .value
    .trim();

    if(username === ""){

        alert(
            "Please enter a username."
        );

        return;
    }

    alert(
        "Leaderboard Coming Soon!\n\n" +
        "Username: " + username +
        "\nCPS: " +
        cpsEl.textContent
    );

}
