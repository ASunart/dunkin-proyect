const NGROK = `${window.location.hostname}`;
console.log('Server IP: ', NGROK);
let socket = io(NGROK, { path: '/real-time' });

//let socket = io("http://localhost:5050", { path: '/real-time' })
let canvas;
let controllerX, controllerY = 0;
let qrCodeX, qrCodeY, finishLineX, finishLineY = 0;
//Images
let mazeImg, snackImg, snacksBox;
//Interfaces
let initial, instructions, game, form, thanks;



function preload() {
    mazeImg = loadImage('/app/assets/maze.png');
    snackImg = loadImage('/app/assets/minisnack.png');
    initial = loadImage('/app/assets/Initial.jpg');
    instructions = loadImage('/app/assets/Instructions.jpg')
    game = loadImage('/app/assets/Game.jpg')
}


function setup() {
    frameRate(60);
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('z-index', '-1');
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('right', '0');
    controllerX = windowWidth / 2;
    controllerY = 50;
    qrCodeX = windowWidth/2 + 5;
    qrCodeY = windowHeight/2 + 80;
    finishLineX = controllerX - 200;
    finishLineY = controllerY + 600;


    imageMode(CENTER);
    rectMode(CENTER);
}

function draw() {
    background(255)
    newCursor(controllerX, controllerY)
    image(game, windowWidth/2, windowHeight/2)
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function newCursor(x, y) {
    noStroke();
    fill(225, 19, 131);
    ellipse(x, y, 10, 10);
}

//Add an .on() event on the socket

socket.on('display-positions', msn => {
    let {controlX, controlY} = msn;
    controllerX = controlX
    controllerY = controlY
})
