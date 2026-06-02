let clicks = 0;
let selectedTime = 5;
let started = false;
let historyData =
JSON.parse(localStorage.getItem("cpsHistory")) || [];

const clickArea = document.getElementById("clickArea");
const clicksEl = document.getElementById("clicks");
const cpsEl = document.getElementById("cps");
const bestEl = document.getElementById("best");

loadBest();
drawGraph();

function setTime(time){
    selectedTime = time;
}

clickArea.addEventListener("click", function(){

    if(!started){
        startTest();
        return;
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
    "<h2>⏳ " + selectedTime + "s Running...</h2><p>Click Fast!</p>";

    setTimeout(function(){

        started = false;

        let cps =
        (clicks / selectedTime).toFixed(2);

        cpsEl.textContent = cps;

        clickArea.innerHTML =
        "<h2>🔥 CLICK TO START</h2>";

        updateBest(cps);
        saveHistory(cps);

    }, selectedTime * 1000);

}

function loadBest(){

    let best = localStorage.getItem("bestCPS");

    if(best){
        bestEl.textContent = best;
    }else{
        bestEl.textContent = "0.00";
    }

}

function updateBest(cps){

    let best = localStorage.getItem("bestCPS");

    if(!best || parseFloat(cps) > parseFloat(best)){

        localStorage.setItem("bestCPS", cps);
        bestEl.textContent = cps;

    }

}

function saveHistory(cps){

    historyData.push(Number(cps));

    if(historyData.length > 20){
        historyData.shift();
    }

    localStorage.setItem(
        "cpsHistory",
        JSON.stringify(historyData)
    );

    drawGraph();

}

function drawGraph(){

    const canvas =
    document.getElementById("cpsChart");

    if(!canvas) return;

    const ctx =
    canvas.getContext("2d");

    if(window.cpsChart){
        window.cpsChart.destroy();
    }

    window.cpsChart =
    new Chart(ctx, {

        type: "line",

        data: {

            labels:
            historyData.map(
                (_, i) => "Test " + (i + 1)
            ),

            datasets: [{
                label: "CPS Score",
                data: historyData,
                borderColor: "#00ffff",
                backgroundColor:
                "rgba(0,255,255,0.2)",
                borderWidth: 3,
                tension: 0.4,
                fill: true
            }]

        },

        options: {

            responsive: true,

            plugins: {
                legend: {
                    labels: {
                        color: "white"
                    }
                }
            },

            scales: {

                x: {
                    ticks: {
                        color: "white"
                    }
                },

                y: {
                    ticks: {
                        color: "white"
                    }
                }

            }

        }

    });

}

function submitScore(){

    let username =
    document.getElementById("username")
    .value.trim();

    if(username === ""){
        return;
    }

    console.log(
        "Username:",
        username,
        "CPS:",
        cpsEl.textContent
    );

}
