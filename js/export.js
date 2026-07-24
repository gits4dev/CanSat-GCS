/* =====================================
   CSV & GRAPH EXPORT SYSTEM
===================================== */

const csvBtn =
document.getElementById(
    "csvBtn"
);

const graphBtn =
document.getElementById(
    "graphBtn"
);

/* =====================================
   CREATE TIMESTAMP
===================================== */

function getTimestamp(){

    const now = new Date();

    return now
        .toISOString()
        .replace(/:/g,"-")
        .replace(/\..+/,"");
}

/* =====================================
   EXPORT CSV
===================================== */

csvBtn.addEventListener(
    "click",
    exportCSV
);

function exportCSV(){

    if(
        !window.telemetryHistory ||
        window.telemetryHistory.length === 0
    ){

        alert(
            "No telemetry data available"
        );

        return;
    }

    let csv =
    "Packet,Altitude,Pressure,Temperature,Battery,Latitude,Longitude,DescentRate,Roll,Pitch,Yaw\n";

    window.telemetryHistory.forEach(
        packet => {

            csv +=
            `${packet.packet},` +
            `${packet.altitude},` +
            `${packet.pressure},` +
            `${packet.temperature},` +
            `${packet.battery},` +
            `${packet.latitude},` +
            `${packet.longitude},` +
            `${packet.descentRate},` +
            `${packet.roll},` +
            `${packet.pitch},` +
            `${packet.yaw}\n`;
        }
    );

    const blob =
    new Blob(
        [csv],
        {
            type:"text/csv"
        }
    );

    const url =
    URL.createObjectURL(
        blob
    );

    const a =
    document.createElement(
        "a"
    );

    a.href = url;

    a.download =
    `CanSat_Telemetry_${getTimestamp()}.csv`;

    a.click();

    URL.revokeObjectURL(
        url
    );
}

/* =====================================
   EXPORT CURRENT GRAPH
===================================== */

graphBtn.addEventListener(
    "click",
    exportGraph
);

function exportGraph(){

    const canvas =
    document.getElementById(
        "telemetryChart"
    );

    if(!canvas){

        alert(
            "Graph not available"
        );

        return;
    }

    const image =
    canvas.toDataURL(
        "image/png"
    );

    const a =
    document.createElement(
        "a"
    );

    a.href = image;

    a.download =
    `Telemetry_Graph_${getTimestamp()}.png`;

    a.click();
}