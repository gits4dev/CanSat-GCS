/* ===================================
   MAIN DASHBOARD CONTROLLER
=================================== */

let missionSeconds = 0;

window.telemetryRunning = false;

/* BUTTON REFERENCES */

const startBtn =
    document.getElementById("startBtn");

const stopBtn =
    document.getElementById("stopBtn");

const syncBtn =
    document.getElementById("syncBtn");

const resetBtn =
    document.getElementById("resetBtn");

/* ===================================
   MISSION TIMER
=================================== */

setInterval(() => {

    missionSeconds++;

    const hrs =
        Math.floor(missionSeconds / 3600);

    const mins =
        Math.floor(
            (missionSeconds % 3600) / 60
        );

    const secs =
        missionSeconds % 60;

    document.getElementById(
        "missionElapsed"
    ).textContent =

        String(hrs).padStart(2, "0")
        + ":"
        + String(mins).padStart(2, "0")
        + ":"
        + String(secs).padStart(2, "0");

}, 1000);

/* ===================================
   LIVE CLOCK
=================================== */

function updateMissionClock() {

    document.getElementById(
        "currentTime"
    ).textContent =

        new Date()
            .toLocaleTimeString();
}

updateMissionClock();

setInterval(
    updateMissionClock,
    1000
);

/* ===================================
   START TELEMETRY
=================================== */

startBtn.addEventListener(
    "click",
    () => {

        window.telemetryRunning = true;

        document.getElementById(
            "telemetryStatus"
        ).textContent =
            "🟢 ONLINE";
    }
);

/* ===================================
   STOP TELEMETRY
=================================== */

stopBtn.addEventListener(
    "click",
    () => {

        window.telemetryRunning = false;

        document.getElementById(
            "telemetryStatus"
        ).textContent =
            "🔴 OFFLINE";
    }
);

/* ===================================
   SYNC PC TIME
=================================== */

syncBtn.addEventListener(
    "click",
    () => {

        updateMissionClock();

        alert(
            "PC Time Synced Successfully"
        );
    }
);

/* ===================================
   RESET DASHBOARD
=================================== */

resetBtn.addEventListener(
    "click",
    () => {

        missionSeconds = 0;

        document.getElementById(
            "packetCount"
        ).textContent = "0";

        document.getElementById(
            "telemetryStatus"
        ).textContent =
            "READY";
    }
);