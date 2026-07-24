/* ===================================
   TELEMETRY SIMULATOR
=================================== */

window.telemetryHistory = [];

window.currentTelemetry = {};

let packetNumber = 1000;

/* ===================================
   TELEMETRY GENERATOR
=================================== */

function updateTelemetry() {

    if (!window.telemetryRunning) {

        return;
    }

    packetNumber++;

    const telemetry = {

        packet: packetNumber,

        altitude:
            (100 + Math.random() * 50).toFixed(1),

        pressure:
            (1000 + Math.random() * 20).toFixed(1),

        temperature:
            (25 + Math.random() * 10).toFixed(1),

        battery:
            (3.6 + Math.random() * 0.5).toFixed(2),

        latitude:
            (22.8045 + Math.random() / 500).toFixed(6),

        longitude:
            (86.2021 + Math.random() / 500).toFixed(6),

        descentRate:
            (8 + Math.random() * 2).toFixed(1),

        roll:
            Math.floor(Math.random() * 90),

        pitch:
            Math.floor(Math.random() * 90),

        yaw:
            Math.floor(Math.random() * 360)
    };

    window.currentTelemetry =
        telemetry;

    window.telemetryHistory.push(
        telemetry
    );

    /* Keep Last 1000 Packets */

    if (
        window.telemetryHistory.length >
        1000
    ) {

        window.telemetryHistory.shift();
    }

    /* Packet Counter */

    document.getElementById(
        "packetNumber"
    ).textContent =
        telemetry.packet;

    /* Battery Health */

    const batteryHealth =
        document.getElementById(
            "batteryHealth"
        );

    if (
        telemetry.battery > 3.8
    ) {

        batteryHealth.textContent =
            "🟢";
    }
    else if (
        telemetry.battery > 3.5
    ) {

        batteryHealth.textContent =
            "🟡";
    }
    else {

        batteryHealth.textContent =
            "🔴";
    }

    /* GPS Health */

    const gpsHealth =
        document.getElementById(
            "gpsHealth"
        );

    if (
        telemetry.latitude &&
        telemetry.longitude
    ) {

        gpsHealth.textContent =
            "🟢";
    }
    else {

        gpsHealth.textContent =
            "🔴";
    }
}

/* ===================================
   TELEMETRY UPDATE
=================================== */

setInterval(
    updateTelemetry,
    1000
);

/* ===================================
   TELEMETRY SLIDER
=================================== */

const telemetryItems = [

    {
        title: "Altitude",
        unit: " m",
        key: "altitude"
    },

    {
        title: "Pressure",
        unit: " hPa",
        key: "pressure"
    },

    {
        title: "Temperature",
        unit: " °C",
        key: "temperature"
    },

    {
        title: "Battery",
        unit: " V",
        key: "battery"
    },

    {
        title: "Latitude",
        unit: "",
        key: "latitude"
    },

    {
        title: "Longitude",
        unit: "",
        key: "longitude"
    },

    {
        title: "Roll",
        unit: "°",
        key: "roll"
    },

    {
        title: "Pitch",
        unit: "°",
        key: "pitch"
    },

    {
        title: "Yaw",
        unit: "°",
        key: "yaw"
    }

];

let currentTelemetryIndex = 0;

/* ===================================
   TELEMETRY SLIDER UPDATE
=================================== */

function updateTelemetrySlider() {

    if (
        !window.currentTelemetry ||
        !window.currentTelemetry.packet
    ) {

        return;
    }

    const item =
        telemetryItems[
        currentTelemetryIndex
        ];

    document.getElementById(
        "telemetryTitle"
    ).textContent =
        item.title;

    document.getElementById(
        "telemetryValue"
    ).textContent =

        window.currentTelemetry[
        item.key
        ] + item.unit;

    currentTelemetryIndex++;

    if (
        currentTelemetryIndex >=
        telemetryItems.length
    ) {

        currentTelemetryIndex = 0;
    }
}

setInterval(
    updateTelemetrySlider,
    2000
);