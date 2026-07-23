/* =====================================
   REAL-TIME TELEMETRY GRAPH SYSTEM
===================================== */

const graphTypes = [

    {
        title: "Altitude Graph",
        key: "altitude"
    },

    {
        title: "Pressure Graph",
        key: "pressure"
    },

    {
        title: "Temperature Graph",
        key: "temperature"
    },

    {
        title: "Battery Graph",
        key: "battery"
    },

    {
        title: "Descent Rate Graph",
        key: "descentRate"
    }

];

let currentGraphIndex = 0;

let autoRotateEnabled = true;

/* =====================================
   GRAPH TITLE
===================================== */

function updateGraphTitle(){

    document.getElementById(
        "graphTitle"
    ).textContent =

    graphTypes[
        currentGraphIndex
    ].title;
}

/* =====================================
   DATA STORAGE
===================================== */

const MAX_POINTS = 20;

let sampleNumber = 0;

let labels = [];

let altitudeData = [];
let pressureData = [];
let temperatureData = [];
let batteryData = [];
let descentData = [];

/* =====================================
   CHART
===================================== */

const ctx =
document
.getElementById(
    "telemetryChart"
)
.getContext("2d");

const telemetryChart =
new Chart(ctx, {

    type: "line",

    data: {

        labels: [],

        datasets: [{

            label: "Altitude Graph",

            data: [],

            borderWidth: 2,

            tension: 0.35
        }]
    },

    options: {

        responsive: true,

        maintainAspectRatio: false,

        animation: false,

        plugins: {

            legend: {

                display: true
            }
        },

        scales: {

            y: {

                beginAtZero: false
            }
        }
    }
});

/* =====================================
   LOAD GRAPH
===================================== */

function loadGraph(){

    const selected =

    graphTypes[
        currentGraphIndex
    ];

    telemetryChart.data.labels =
    labels;

    switch(selected.key){

        case "altitude":

            telemetryChart.data.datasets[0].data =
            altitudeData;
            break;

        case "pressure":

            telemetryChart.data.datasets[0].data =
            pressureData;
            break;

        case "temperature":

            telemetryChart.data.datasets[0].data =
            temperatureData;
            break;

        case "battery":

            telemetryChart.data.datasets[0].data =
            batteryData;
            break;

        case "descentRate":

            telemetryChart.data.datasets[0].data =
            descentData;
            break;
    }

    telemetryChart.data.datasets[0].label =
    selected.title;

    telemetryChart.update();
}

/* =====================================
   MANUAL NAVIGATION
===================================== */

function pauseAutoRotation(){

    autoRotateEnabled = false;

    setTimeout(() => {

        autoRotateEnabled = true;

    },10000);
}

document.getElementById(
    "prevGraph"
).addEventListener(
    "click",
    () => {

        pauseAutoRotation();

        currentGraphIndex--;

        if(
            currentGraphIndex < 0
        ){

            currentGraphIndex =
            graphTypes.length - 1;
        }

        updateGraphTitle();

        loadGraph();
    }
);

document.getElementById(
    "nextGraph"
).addEventListener(
    "click",
    () => {

        pauseAutoRotation();

        currentGraphIndex++;

        if(
            currentGraphIndex >=
            graphTypes.length
        ){

            currentGraphIndex = 0;
        }

        updateGraphTitle();

        loadGraph();
    }
);

/* =====================================
   AUTO ROTATION
===================================== */

setInterval(() => {

    if(!autoRotateEnabled){

        return;
    }

    currentGraphIndex++;

    if(
        currentGraphIndex >=
        graphTypes.length
    ){

        currentGraphIndex = 0;
    }

    updateGraphTitle();

    loadGraph();

},5000);

/* =====================================
   UPDATE DATA
===================================== */

function updateGraphData(){

    if(
        !window.telemetryRunning
    ){

        return;
    }

    if(
        !window.currentTelemetry ||
        !window.currentTelemetry.packet
    ){

        return;
    }

    sampleNumber++;

    labels.push(
        sampleNumber
    );

    altitudeData.push(
        parseFloat(
            window.currentTelemetry.altitude
        )
    );

    pressureData.push(
        parseFloat(
            window.currentTelemetry.pressure
        )
    );

    temperatureData.push(
        parseFloat(
            window.currentTelemetry.temperature
        )
    );

    batteryData.push(
        parseFloat(
            window.currentTelemetry.battery
        )
    );

    descentData.push(
        parseFloat(
            window.currentTelemetry.descentRate
        )
    );

    if(
        labels.length >
        MAX_POINTS
    ){

        labels.shift();

        altitudeData.shift();

        pressureData.shift();

        temperatureData.shift();

        batteryData.shift();

        descentData.shift();
    }

    loadGraph();
}

/* =====================================
   INITIALIZE
===================================== */

updateGraphTitle();

loadGraph();

/* =====================================
   UPDATE EVERY SECOND
===================================== */

setInterval(
    updateGraphData,
    1000
);