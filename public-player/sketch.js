let socket = io("http://localhost:5050", { path: '/real-time' })
let canvas;
let controllerX, controllerY = 0;
let qrCodeX, qrCodeY, finishLineX, finishLineY = 0;
//Images
let mazeImg, snackImg, snacksBox;
//Interfaces
let initial, instructions, game, form, thanks;
//Maze
let mazeArray;


function preload() {
    // mazeImg = loadImage('/app/assets/maze.png');
    // snackImg = loadImage('/app/assets/minisnack.png');
    initial = loadImage('/player/assets/Initial-p.jpg');
    instructions = loadImage('/player/assets/Instructions-p.jpg')
    game = loadImage('/player/assets/Game-p.jpg')
    form = loadImage('/player/assets/Winner-p.jpg')
    thanks = loadImage('/player/assets/Gracias-p.jpg')
    // snacksBox = loadImage('/app/assets/snacks-box.png');
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
    btnX = windowWidth/2;
    btnY = windowHeight/2 + 130;
    finishLineX = controllerX - 200;
    finishLineY = controllerY + 600;

    imageMode(CENTER);
    rectMode(CENTER);

}

function draw() {
    switch (screen) {
        case 0:
            background(255);
            rect(btnX, btnY, 156, 19);
            image(initial, windowWidth/2, windowHeight/2);
            break;

        case 1:
            background(255);
            rect(btnX, btnY, 156, 19);
            image(instructions, windowWidth/2, windowHeight/2)
            break;    

        case 2:
            background(255)
            newCursor(pmouseX, pmouseY);
            // image(snacksBox, finishLineX, finishLineY, 70, 70)
            // image(snackImg, controllerX, controllerY, 150, 150)
            image(game, windowWidth/2, windowHeight/2);   
            break;

        case 3:
            background(255);
            image(form, windowWidth/2, windowHeight/2)
            break;
        
        case 4:
            background(255);
            image(thanks, windowWidth/2, windowHeight/2)
            break;

    
        default:
            screen = 0;
            break;
    }

    changeScreen();
}



function changeScreen(){
    if (screen === 0 && dist(pmouseX, pmouseY, btnX, btnY) < 75) {
        screen = 1;
    } 
    
    if (screen === 1 ) {
        if (keyCode === RIGHT_ARROW) {
            screen = 2;
        }
    }
    if (screen === 2) {
        if (keyCode === DOWN_ARROW) {
            screen = 3;
        }
    }
    if (screen === 3) {
        if (keyCode === ENTER) {
            screen = 4;
        }
    }
}


function mouseDragged() {
    let msn = {controlX : pmouseX, controlY: pmouseY}
    socket.emit('positions', msn);
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

// socket.on('display-positions', msn => {
//     let {controlX, controlY} = msn;
//     controllerX = controlX
//     controllerY = controlY
// })

socket.on('screens', scrns =>{
    let {initial, instructions} = scrns;
    console.log(scrns)
})