/* ====================================
   ERROR CODE MONITORING SYSTEM
==================================== */

window.payloadSeparated = false;
window.parachuteActivated = false;

/* ====================================
   RECEIVE STATUS FROM MISSION CONTROL
==================================== */

window.setPayloadSeparated = function(status){

    window.payloadSeparated = status;

    updateErrorCode();
};

window.setParachuteActivated = function(status){

    window.parachuteActivated = status;

    updateErrorCode();
};

/* ====================================
   UPDATE ERROR CODE
==================================== */

function updateErrorCode(){

    if(!window.currentTelemetry){

        return;
    }

    let d1 = 0;
    let d2 = 0;
    let d3 = 0;
    let d4 = 0;

    const telemetry =
        window.currentTelemetry;

    const descentRate =
        parseFloat(
            telemetry.descentRate || 0
        );

    const latitude =
        parseFloat(
            telemetry.latitude || 0
        );

    const longitude =
        parseFloat(
            telemetry.longitude || 0
        );

    /* --------------------------------
       DIGIT 1
       DESCENT RATE ERROR
    -------------------------------- */

    if(
        descentRate < 8 ||
        descentRate > 10
    ){

        d1 = 1;
    }

    /* --------------------------------
       DIGIT 2
       GPS ERROR
    -------------------------------- */

    if(
        latitude === 0 ||
        longitude === 0
    ){

        d2 = 1;
    }

    /* --------------------------------
       DIGIT 3
       PAYLOAD ERROR
    -------------------------------- */

    if(!payloadSeparated){

        d3 = 1;
    }

    /* --------------------------------
       DIGIT 4
       PARACHUTE DEPLOYED
    -------------------------------- */

    if(parachuteActivated){

        d4 = 1;
    }

    const code =
        `${d1}${d2}${d3}${d4}`;

    /* UPDATE DISPLAY */

    document.getElementById(
        "digit1"
    ).textContent = d1;

    document.getElementById(
        "digit2"
    ).textContent = d2;

    document.getElementById(
        "digit3"
    ).textContent = d3;

    document.getElementById(
        "digit4"
    ).textContent = d4;

    document.getElementById(
        "errorCode"
    ).textContent = code;

    updateDigitColor(
        "digit1",
        d1
    );

    updateDigitColor(
        "digit2",
        d2
    );

    updateDigitColor(
        "digit3",
        d3
    );

    updateDigitColor(
        "digit4",
        d4
    );

    updateMessage(code);
}

/* ====================================
   DIGIT COLORS
==================================== */

function updateDigitColor(
    id,
    value
){

    const digit =
        document.getElementById(id);

    if(value === 1){

        digit.classList.remove(
            "normal"
        );

        digit.classList.add(
            "fault"
        );

    }else{

        digit.classList.remove(
            "fault"
        );

        digit.classList.add(
            "normal"
        );
    }
}

/* ====================================
   ERROR MESSAGE
==================================== */

function updateMessage(code){

    const msg =
        document.getElementById(
            "errorMessage"
        );

    switch(code){

        case "0000":

            msg.textContent =
            "All Systems Normal";

            break;

        case "1000":

            msg.textContent =
            "Descent Rate Fault";

            break;

        case "0100":

            msg.textContent =
            "GPS Signal Lost";

            break;

        case "0010":

            msg.textContent =
            "Payload Separation Required";

            break;

        case "0001":

            msg.textContent =
            "Parachute Activated";

            break;

        default:

            msg.textContent =
            "Multiple Fault Conditions Active";
    }
}

/* ====================================
   AUTO UPDATE
==================================== */

setInterval(
    updateErrorCode,
    1000
);