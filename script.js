let clicks = 0;
let selectedTime = 5;
let started = false;
let timer;

const clickArea = document.getElementById("clickArea");
const clicksEl = document.getElementById("clicks");
const cpsEl = document.getElementById("cps");
const bestEl = document.getElementById("best");

loadBest();

function setTime(time){
    selectedTime = time;
}

clickArea.addEventListener("click", () => {

    if(!started){
        startTest();
    }

    if(started){
        clicks++;
        clicksEl.textContent = clicks;
    }

});

function startTest(){

    started = true;
    clicks = 0;
    clicksEl.textContent = 0;
    cpsEl.textContent = 0;

    clickArea.innerHTML = selectedTime + "s Running...";

    timer = setTimeout(() => {

        started = false;

        let cps = (clicks / selectedTime).toFixed(2);

        cpsEl.textContent = cps;

        clickArea.innerHTML = "CLICK TO START";

        updateBest(cps);

        alert(
            "Test Finished!\n\n" +
            "Clicks: " + clicks +
            "\nCPS: " + cps
        );

    }, selectedTime * 1000);

}

function loadBest(){

    const best = localStorage.getItem("bestCPS");

    if(best){
        bestEl.textContent = best;
    }

}

function updateBest(cps){

    let best = localStorage.getItem("bestCPS");

    if(!best || parseFloat(cps) > parseFloat(best)){

        localStorage.setItem("bestCPS", cps);

        bestEl.textContent = cps;
    }

}

function submitScore(){

    const username =
        document.getElementById("username").value.trim();

    if(username === ""){
        alert("Enter Username First");
        return;
    }

    const cps =
        document.getElementById("cps").textContent;

    alert(
        "Leaderboard integration will be added later.\n\n" +
        "Username: " + username +
        "\nCPS: " + cps
    );

                                       }
