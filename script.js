let clicks = 0;
let selectedTime = 5;
let started = false;
let timer;

const clickArea = document.getElementById("clickArea");
const clicksEl = document.getElementById("clicks");
const cpsEl = document.getElementById("cps");
const bestEl = document.getElementById("best");

let historyData =
JSON.parse(localStorage.getItem("cpsHistory")) || [];

loadBest();
drawGraph();

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

    clicksEl.textContent = "0";
    cpsEl.textContent = "0.00";

    clickArea.innerHTML = `
        <div>
            <h2>${selectedTime}s Running...</h2>
            <p>Click as fast as possible!</p>
        </div>
    `;

    timer = setTimeout(() => {

        started = false;

        let cps =
        (clicks / selectedTime).toFixed(2);

        cpsEl.textContent = cps;

        clickArea.innerHTML = `
            <div>
                <h2>🔥 Test Finished</h2>
                <p>${clicks} Clicks</p>
                <p>${cps} CPS</p>
                <br>
                <strong>CLICK TO START AGAIN</strong>
            </div>
        `;

        updateBest(cps);

        saveGraphScore(cps);

    }, selectedTime * 1000);

}

function loadBest(){

    const best =
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
        parseFloat(cps) >
        parseFloat(best)
    ){

        localStorage.setItem(
            "bestCPS",
            cps
        );

        bestEl.textContent = cps;

    }

}

function submitScore(){

    const username =
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

    const cps =
    document
    .getElementById("cps")
    .textContent;

    alert(
        "Leaderboard system coming soon!\n\n" +
        "Username: " + username +
        "\nCPS: " + cps
    );

}

function saveGraphScore(cps){

    historyData.push(
        Number(cps)
    );

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
    document.getElementById(
        "cpsChart"
    );

    if(!canvas) return;

    const ctx =
    canvas.getContext("2d");

    if(window.cpsChart){
        window.cpsChart.destroy();
    }

    window.cpsChart =
    new Chart(ctx,{

        type:"line",

        data:{

            labels:
            historyData.map(
                (_,i)=>
                "Test " + (i+1)
            ),

            datasets:[{

                label:"CPS Score",

                data:historyData,

                borderColor:"#00ffff",

                backgroundColor:
                "rgba(0,255,255,0.2)",

                borderWidth:3,

                tension:0.4,

                fill:true

            }]

        },

        options:{

            responsive:true,

            plugins:{
                legend:{
                    labels:{
                        color:"white"
                    }
                }
            },

            scales:{

                x:{
                    ticks:{
                        color:"white"
                    },
                    grid:{
                        color:"#333"
                    }
                },

                y:{
                    ticks:{
                        color:"white"
                    },
                    grid:{
                        color:"#333"
                    }
                }

            }

        }

    });

}
