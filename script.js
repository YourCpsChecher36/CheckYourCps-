let clicks = 0;
let selectedTime = 5;
let started = false;
let timer;

const clickArea = document.getElementById("clickArea");
const clicksEl = document.getElementById("clicks");
const cpsEl = document.getElementById("cps");
const bestEl = document.getElementById("best");

loadBest();

function setTime(time) {
    selectedTime = time;
}

clickArea.addEventListener("click", () => {

    if (!started) {
        startTest();
    }

    if (started) {
        clicks++;
        clicksEl.textContent = clicks;
    }

});

function startTest() {

    started = true;
    clicks = 0;

    clicksEl.textContent = "0";
    cpsEl.textContent = "0.00";

    clickArea.innerHTML = `
        <div style="font-size:40px;">0</div>
        <div>${selectedTime}s Running...</div>
    `;

    timer = setTimeout(() => {

        started = false;

        let cps = (clicks / selectedTime).toFixed(2);

        cpsEl.textContent = cps;

        clickArea.innerHTML = `
            <div style="font-size:32px;color:#00ffff;">
                CPS: ${cps}
            </div>
            <div style="font-size:20px;margin-top:10px;">
                Clicks: ${clicks}
            </div>
            <div style="margin-top:15px;">
                CLICK TO START
            </div>
        `;

        updateBest(cps);

    }, selectedTime * 1000);
}

function loadBest() {

    const best = localStorage.getItem("bestCPS");

    if (best) {
        bestEl.textContent = best;
    } else {
        bestEl.textContent = "0.00";
    }
}

function updateBest(cps) {

    let best = localStorage.getItem("bestCPS");

    if (!best || parseFloat(cps) > parseFloat(best)) {

        localStorage.setItem("bestCPS", cps);

        bestEl.textContent = cps;
    }
}

function submitScore() {

    const username =
        document.getElementById("username").value.trim();

    if (username === "") {
        return;
    }

    const cps =
        document.getElementById("cps").textContent;

    console.log(
        "Username: " + username +
        " | CPS: " + cps
    );
}
