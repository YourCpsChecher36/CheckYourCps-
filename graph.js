let historyData =
JSON.parse(localStorage.getItem("cpsHistory")) || [];

const canvas =
document.getElementById("cpsChart");

if(canvas){

    const ctx = canvas.getContext("2d");

    new Chart(ctx, {

        type: "line",

        data: {

            labels: historyData.map(
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
