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
    mazeImg = loadImage('/app/assets/maze.png');
    snackImg = loadImage('/app/assets/minisnack.png');
    initial = loadImage('/app/assets/Initial.jpg');
    instructions = loadImage('/app/assets/Instructions.jpg')
    game = loadImage('/app/assets/Game.jpg')
    form = loadImage('/app/assets/Winner.jpg')
    thanks = loadImage('/app/assets/thanks.jpg')
    snacksBox = loadImage('/app/assets/snacks-box.png');
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

    mazeArray = [
        [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
        [0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0],
        [0,1,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0],
        [0,1,0,1,0,1,1,1,1,1,1,1,1,1,0,1,0],
        [0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0],
        [0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,0],
        [0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0],
        [0,1,0,1,1,1,1,1,0,1,0,1,0,1,0,1,0],
        [0,1,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0],
        [0,1,0,1,1,1,0,1,1,1,0,1,0,1,0,1,0],
        [0,1,0,1,0,1,0,0,0,0,0,1,0,1,0,1,0],
        [0,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,0],
        [0,1,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0],
        [0,1,0,1,1,1,0,1,1,1,0,1,1,1,1,1,0],
        [0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,1,0],
        [0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0],
        [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    ]
}

function draw() {
    switch (screen) {
        case 0:
            background(255);
            rect(qrCodeX, qrCodeY, 150, 150);
            image(initial, windowWidth/2, windowHeight/2);
            break;

        case 1:
            background(255);
            image(instructions, windowWidth/2, windowHeight/2)
            break;    

        case 2:
            background(0.95)
            newCursor(pmouseX, pmouseY);
            image(snacksBox, finishLineX, finishLineY, 70, 70)
            image(snackImg, controllerX, controllerY, 150, 150)
            image(mazeImg, windowWidth/2, windowHeight/2);
//             let mazeWidth = 25;
//             let mazeHeight = 25;

//             for (let y = 0; y < 17; y++) {
//             for (let x = 0; x < 17; x++) {
//             if (mazeArray[y][x] == 1) {
//                 noFill();
//             } else {
//                 fill(255, 165, 0);
//             }
//             rectMode(CORNER);
//             rect(x * mazeWidth, y * mazeHeight, mazeWidth, mazeHeight);
//     }
//   }    
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
    if (screen === 0 && dist(pmouseX, pmouseY, qrCodeX, qrCodeY) < 75) {
        screen = 1;
    } 
    
    if (screen === 1) {
        if (keyCode === RIGHT_ARROW) {
            screen = 2;
        }
    }
    if (screen === 2 && dist(pmouseX, pmouseY, finishLineX, finishLineY) < 25) {
            screen = 3;
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

socket.on('display-positions', msn => {
    let {controlX, controlY} = msn;
    controllerX = controlX
    controllerY = controlY
})