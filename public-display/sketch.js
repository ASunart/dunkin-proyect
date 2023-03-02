
const NGROK = `${window.location.hostname}`;
console.log('Server IP: ', NGROK);
let socket = io(NGROK, { path: '/real-time' });

//let socket = io("http://localhost:5050", { path: '/real-time' })
let canvas;
let controllerX, controllerY;
//Images
let mazeImg, snackImg;
//Interfaces
let initial, instructions, game, form, thanks;
//El mensaje que recibe del servidor
let changes;



function preload() {
    // mazeImg = loadImage('./assets/maze.png');
    snackImg = loadImage('./assets/minisnack.png');
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
    controllerX = windowWidth / 2 - 125;
    controllerY = 225;
    noCursor();
    mouseX = controllerX;
    mouseY = controllerY;

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
    if (changes === 'game') {
        background(255);
        image(game, windowWidth/2, windowHeight/2)
        loadPixels();
        let pixelColor = get(pmouseX, pmouseY)
        newCursor(controllerX, controllerY);
        // fill(color(pixelColor))
        // rect(50,50,50,50)
    }
    if (changes === 'form') {
        image(form, windowWidth/2, windowHeight/2)
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
