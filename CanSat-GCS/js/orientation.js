/* =====================================
   ORIENTATION VISUALIZATION SYSTEM
===================================== */

const container =
document.getElementById(
    "orientationCanvas"
);

if(container){

    /* =====================================
       SCENE
    ===================================== */

    const scene =
    new THREE.Scene();

    const camera =
    new THREE.PerspectiveCamera(

        75,

        container.clientWidth /
        Math.max(
            container.clientHeight,
            200
        ),

        0.1,

        1000
    );

    const renderer =
    new THREE.WebGLRenderer({

        antialias:true

    });

    renderer.setSize(

        container.clientWidth,

        Math.max(
            container.clientHeight,
            200
        )
    );

    container.appendChild(
        renderer.domElement
    );

    /* =====================================
       CUBE
    ===================================== */

    const geometry =
    new THREE.BoxGeometry(
        2,
        2,
        2
    );

    const material =
    new THREE.MeshNormalMaterial();

    const cube =
    new THREE.Mesh(
        geometry,
        material
    );

    scene.add(cube);

    /* =====================================
       LIGHTS
    ===================================== */

    const light =
    new THREE.DirectionalLight(
        0xffffff,
        1
    );

    light.position.set(
        5,
        5,
        5
    );

    scene.add(light);

    camera.position.z = 5;

    /* =====================================
       HEADING
    ===================================== */

    function getHeading(yaw){

        if(
            yaw >= 45 &&
            yaw < 135
        ){
            return "East";
        }

        if(
            yaw >= 135 &&
            yaw < 225
        ){
            return "South";
        }

        if(
            yaw >= 225 &&
            yaw < 315
        ){
            return "West";
        }

        return "North";
    }

    /* =====================================
       FLIGHT MODE
    ===================================== */

    function getFlightMode(){

        if(
            !window.currentTelemetry
        ){

            return "READY";
        }

        const altitude =
        parseFloat(
            window.currentTelemetry.altitude || 0
        );

        const descent =
        parseFloat(
            window.currentTelemetry.descentRate || 0
        );

        if(
            altitude < 110
        ){

            return "READY";
        }

        if(
            descent > 8.5
        ){

            return "DESCENT";
        }

        return "ASCENT";
    }

    /* =====================================
       ANIMATION LOOP
    ===================================== */

    function animate(){

        requestAnimationFrame(
            animate
        );

        if(
            window.telemetryRunning &&
            window.currentTelemetry
        ){

            const roll =
            parseFloat(
                window.currentTelemetry.roll || 0
            );

            const pitch =
            parseFloat(
                window.currentTelemetry.pitch || 0
            );

            const yaw =
            parseFloat(
                window.currentTelemetry.yaw || 0
            );

            /* TEXT VALUES */

            document.getElementById(
                "rollValue"
            ).textContent =
            roll + "°";

            document.getElementById(
                "pitchValue"
            ).textContent =
            pitch + "°";

            document.getElementById(
                "yawValue"
            ).textContent =
            yaw + "°";

            /* HEADING */

            document.getElementById(
                "headingValue"
            ).textContent =
            getHeading(yaw);

            /* FLIGHT MODE */

            const mode =
            getFlightMode();

            const modeElement =
            document.getElementById(
                "flightMode"
            );

            modeElement.textContent =
            mode;

            if(
                mode === "DESCENT"
            ){

                modeElement.style.color =
                "#FACC15";
            }
            else{

                modeElement.style.color =
                "#22C55E";
            }

            /* PAYLOAD STATUS */

            document.getElementById(
                "payloadStatus"
            ).textContent =

            window.payloadSeparated
            ? "DEPLOYED"
            : "ACTIVE";

            /* CUBE ROTATION */

            cube.rotation.x =
            roll * Math.PI / 180;

            cube.rotation.y =
            pitch * Math.PI / 180;

            cube.rotation.z =
            yaw * Math.PI / 180;
        }

        renderer.render(
            scene,
            camera
        );
    }

    animate();

    /* =====================================
       RESPONSIVE RESIZE
    ===================================== */

    window.addEventListener(
        "resize",
        () => {

            camera.aspect =

            container.clientWidth /

            Math.max(
                container.clientHeight,
                200
            );

            camera.updateProjectionMatrix();

            renderer.setSize(

                container.clientWidth,

                Math.max(
                    container.clientHeight,
                    200
                )
            );
        }
    );
}