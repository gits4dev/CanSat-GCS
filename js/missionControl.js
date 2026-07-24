/* ===================================
   MISSION CONTROL SYSTEM
=================================== */

const separationBtn =
document.getElementById("separationBtn");

const parachuteBtn =
document.getElementById("parachuteBtn");

const redundantBtn =
document.getElementById("redundantBtn");

const commandStatus =
document.getElementById("commandStatus");

const lastCommand =
document.getElementById("lastCommand");

const commandLog =
document.getElementById("commandLog");

/* ===================================
   COMMAND LOGGER
=================================== */

function addCommandLog(message){

    const item =
    document.createElement("li");

    item.textContent =
        `${new Date().toLocaleTimeString()} - ${message}`;

    commandLog.prepend(item);

    while(commandLog.children.length > 20){

        commandLog.removeChild(
            commandLog.lastChild
        );
    }
}

/* ===================================
   COMMON EXECUTION FUNCTION
=================================== */

function executeCommand(
    confirmMessage,
    commandName
){

    const confirmed =
    confirm(confirmMessage);

    if(!confirmed) return;

    commandStatus.textContent =
    "Status : EXECUTING";

    setTimeout(() => {

        commandStatus.textContent =
        "Status : SUCCESS";

        lastCommand.textContent =
        "Last Command : " + commandName;

        addCommandLog(
            commandName + " Executed"
        );

    },1000);
}

/* ===================================
   PAYLOAD SEPARATION
=================================== */

separationBtn.addEventListener(
    "click",
    () => {

        executeCommand(
            "Execute Payload Separation?",
            "Payload Separation"
        );

    }
);

/* ===================================
   EMERGENCY PARACHUTE
=================================== */

parachuteBtn.addEventListener(
    "click",
    () => {

        executeCommand(
            "Deploy Emergency Parachute?",
            "Emergency Parachute"
        );

    }
);

/* ===================================
   REDUNDANT SYSTEM
=================================== */

redundantBtn.addEventListener(
    "click",
    () => {

        executeCommand(
            "Activate Backup System?",
            "Redundant Activation"
        );

    }
);