/* =====================================
   CAMERA FEED SYSTEM
===================================== */

let videoStream = null;

const video =
document.getElementById(
    "cameraFeed"
);

const startCameraBtn =
document.getElementById(
    "startCameraBtn"
);

const stopCameraBtn =
document.getElementById(
    "stopCameraBtn"
);

const cameraHealth =
document.getElementById(
    "cameraHealth"
);

/* =====================================
   START CAMERA
===================================== */

startCameraBtn.addEventListener(
    "click",
    async () => {

        try {

            /* Prevent Duplicate Streams */

            if(videoStream){

                return;
            }

            videoStream =
            await navigator
                .mediaDevices
                .getUserMedia({

                    video:true,
                    audio:false

                });

            video.srcObject =
            videoStream;

            cameraHealth.textContent =
            "🟢";

            console.log(
                "Camera Started"
            );

        }
        catch(error){

            cameraHealth.textContent =
            "🔴";

            alert(
                "Camera Access Denied"
            );

            console.error(
                error
            );
        }
    }
);

/* =====================================
   STOP CAMERA
===================================== */

stopCameraBtn.addEventListener(
    "click",
    () => {

        if(!videoStream){

            return;
        }

        videoStream
        .getTracks()
        .forEach(track => {

            track.stop();

        });

        video.srcObject = null;

        videoStream = null;

        cameraHealth.textContent =
        "⚪";

        console.log(
            "Camera Stopped"
        );
    }
);

/* =====================================
   PAGE CLOSE SAFETY
===================================== */

window.addEventListener(
    "beforeunload",
    () => {

        if(videoStream){

            videoStream
            .getTracks()
            .forEach(track => {

                track.stop();

            });
        }
    }
);