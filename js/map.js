/* =====================================
   GPS TRACKING MAP
===================================== */

const initialLat = 22.8045;
const initialLng = 86.2021;

/* MAP INITIALIZATION */

const map = L.map("map").setView(
    [initialLat, initialLng],
    15
);

/* OPENSTREETMAP */

L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution:
        "&copy; OpenStreetMap Contributors"
    }
).addTo(map);

/* SATELLITE MARKER */

const marker = L.marker(
    [initialLat, initialLng]
).addTo(map);

/* FLIGHT PATH */

let flightPath = [];

const polyline = L.polyline(
    flightPath,
    {
        weight: 4
    }
).addTo(map);

/* AUTO FOLLOW MODE */

let autoFollow = true;

/* USER MOVES MAP */

map.on("dragstart", () => {

    autoFollow = false;
});

/* DOUBLE CLICK TO ENABLE FOLLOW */

map.on("dblclick", () => {

    autoFollow = true;
});

/* =====================================
   GPS UPDATE
===================================== */

function updateGPSMap(){

    if(!window.telemetryRunning){

        return;
    }

    if(!window.currentTelemetry){

        return;
    }

    const lat =
    parseFloat(
        window.currentTelemetry.latitude
    );

    const lng =
    parseFloat(
        window.currentTelemetry.longitude
    );

    marker.setLatLng(
        [lat, lng]
    );

    flightPath.push(
        [lat, lng]
    );

    /* Keep Last 100 Points */

    if(flightPath.length > 100){

        flightPath.shift();
    }

    polyline.setLatLngs(
        flightPath
    );

    if(autoFollow){

        map.panTo(
            [lat, lng]
        );
    }

    document.getElementById(
        "gpsLatitude"
    ).textContent =
    lat.toFixed(6);

    document.getElementById(
        "gpsLongitude"
    ).textContent =
    lng.toFixed(6);

    document.getElementById(
        "trackCount"
    ).textContent =
    flightPath.length;
}

/* =====================================
   UPDATE EVERY SECOND
===================================== */

setInterval(
    updateGPSMap,
    1000
);