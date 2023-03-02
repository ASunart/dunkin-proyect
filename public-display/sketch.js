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

let changes;



function preload() {
    // mazeImg = loadImage('./assets/maze.png');
    // snackImg = loadImage('./assets/minisnack.png');
    initial = loadImage('/app/assets/Initial.png');
    instructions = loadImage('./assets/Instructions.png')
    game = loadImage('./assets/Game.jpg')
    form = loadImage('./assets/Winner.png')
}


function setup() {
    frameRate(60);
    background(255);
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
    if (changes === undefined) {
        image(initial, windowWidth/2, windowHeight/2)
    } 
    if (changes === 'instructions') {
        image(instructions, windowWidth/2, windowHeight/2)
    } 
    // if (changes === 'game') {
    //     image(game, windowWidth/2, windowHeight/2)
    // }
    if (changes === 'form') {
        image(form, windowWidth/2, windowHeight/2)
    }
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

//Add an .on() event on the socket

socket.on('display-positions', msn => {
    console.log(msn);
    let {controlX, controlY} = msn;
    controllerX = controlX
    controllerY = controlY
})
console.log(changes)

socket.on('mupi-screens', screens =>{
    changes = screens.src;
    console.log(changes);
});
