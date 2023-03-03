
const NGROK = `${window.location.hostname}`;
console.log('Server IP: ', NGROK);
let socket = io(NGROK, { path: '/real-time' });

//let socket = io("http://localhost:5050", { path: '/real-time' })
let canvas;
let controllerX, controllerY, initialX, initialY;
let finishX, finishY;
let initialTime = 60;
let timeLeft = initialTime;
let timer;
//Images
let mazeImg, snackImg, qrCode;
//Interfaces
let initial, instructions, game, form, thanks;
//El mensaje que recibe del servidor
let changes;




function preload() {
    // mazeImg = loadImage('./assets/maze.png');
    snackImg = loadImage('./assets/minisnack.png');
    initial = loadImage('/app/assets/Initial.jpg');
    instructions = loadImage('./assets/Instructions.png')
    game = loadImage('./assets/Game.png')
    form = loadImage('./assets/Winner.jpg')
    thanks = loadImage('./assets/Gracias.jpg')
    qrCode = loadImage('./assets/qrImage.png')

}


function setup() {
    frameRate(60);
    background(255);
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('z-index', '-1');
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('right', '0');
    initialX = windowWidth / 2 - 150;
    initialY = 210;
    controllerX = windowWidth / 2 - 150;
    controllerY = 210;
    finishX = windowWidth/2 + 135;
    finishY = windowHeight/2 + 140;
    noCursor();
    pmouseX = controllerX;
    pmouseY = controllerY;
    timer = setInterval(drainTime, 1000);

    imageMode(CENTER);
    rectMode(CENTER);
}



function draw() {
    if (changes === undefined) {
        image(initial, windowWidth/2, windowHeight/2)
        image(qrCode, windowWidth/2, windowHeight/2 + 85, 100, 100);
    } 
    if (changes === 'instructions') {
        image(instructions, windowWidth/2, windowHeight/2)
    } 
    if (changes === 'game') {
        background(255);
        rect(finishX, finishY, 50, 50);
        image(game, windowWidth/2, windowHeight/2)
        loadPixels();
        let pixelColor = get(controllerX, controllerY)
        newCursor(controllerX, controllerY);
        noStroke();
        fill(255);
        textSize(40)
        textAlign(CENTER, CENTER);
        text(timeLeft, windowWidth/2-90, windowHeight/2-245)
        if (pixelColor[0] == 104 && pixelColor[1] == 56 && pixelColor[2] == 23 || 
            pixelColor[0] == 255 && pixelColor[1] == 255 && pixelColor[2] == 255
            ) { // Si el color es negro (zona prohibida)
            // fill(255, 0, 0); // Establece el color de relleno en rojo
            // textSize(16);
            // text("¡Zona prohibida!", 50, 50); // Muestra un mensaje en la posición del mouse
            controllerX = initialX;
            controllerY = initialY;
          }
    }
    if (dist(controllerX, controllerY, finishX, finishY) < 25) {
        image(form, windowWidth/2, windowHeight/2)
    }
    if (changes === 'thanks') {
        image(thanks, windowWidth/2, windowHeight/2)
    }
}

function drainTime() {
    timeLeft--;
    if (timeLeft === 0) {
        clearInterval(timer);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function newCursor(x, y) {
    noStroke();
    image(snackImg, x, y);
    stroke(1)
}

//Add an .on() event on the socket

socket.on('mupi-positions', msn => {
    let { pmouseX, pmouseY } = msn;
        controllerX = (pmouseX * windowWidth) / deviceWidth;
        controllerY = (pmouseY * windowHeight) / deviceHeight;
        console.log({ controllerX, controllerY });
})
console.log(changes)

socket.on('mupi-screens', screens =>{
    changes = screens.src;
    console.log(changes);
});

socket.on('mupi-size', deviceSize => {
    let { deviceType, windowWidth, windowHeight } = deviceSize;
    deviceWidth = windowWidth;
    deviceHeight = windowHeight;
    console.log(`User is using an ${deviceType} smartphone size of ${deviceWidth} and ${deviceHeight}`);
});
