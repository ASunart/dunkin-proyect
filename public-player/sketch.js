const NGROK = `${window.location.hostname}`;
console.log('Server IP: ', NGROK);
let socket = io(NGROK, { path: '/real-time' });

//let socket = io("http://localhost:5050", { path: '/real-time' })
let canvas;
let controllerX, controllerY = 0;
let finishX, finishY;
//Images
let gameScreen;

let isTouched = false;

// 
const initial = document.querySelector('.instructions');
const instructions = document.querySelector('.start-game');
const form = document.querySelector('.sent')


console.log(instructions);

if (initial) {
    initial?.addEventListener('click', ()=>{
        socket.emit('screens', {src: 'instructions'})
    });
}
if (instructions) {
    instructions?.addEventListener('click', ()=>{
        socket.emit('screens', {src: 'game'})
        DeviceOrientationEvent.requestPermission();
    })
}

if (form) {
    form?.addEventListener('click', ()=>{
    socket.emit('screens', {src: 'thanks'})
    })
}


// form.addEventListener('click', ()=>{
//     socket.emit('screens', {src: 'thanks'})
// });

function preload() {
    gameScreen = loadImage('./assets/controller.png');
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
    finishX = windowWidth / 2 + 100;
    finishY = windowHeight/2 + 140;

    imageMode(CENTER);
    rectMode(CENTER);

    const userAgent = window.navigator.userAgent;
    let deviceType;

    if (/iPhone|iPad|iPod/.test(userAgent)) {
        deviceType = 'iOS';
    } else if (/Android/.test(userAgent)) {
        deviceType = 'Android';
    } else {
        deviceType = 'Other';
    }
    socket.emit('device-size', { deviceType, windowWidth, windowHeight });
    imageMode(CENTER);
}

function draw() {
    noFill()
    noStroke()
    background(255, 5)
    fill(225, 19, 131)
    ellipse(windowWidth/2-100, 200, 50, 50)
    fill(0, 255, 0)
    textSize(20)
    ellipse(finishX, finishY, 25, 25)
    text('Finish on the green one', windowWidth/2-100, windowHeight/2 +230)
    image(gameScreen, windowWidth/2, windowHeight/2, 200, 200);
    fill(225, 19, 131)
    textSize(24)
    text('Start from the pink dot', windowWidth/2-110, windowHeight/2 +200)
    redirect();
    }

    function redirect() {
        if (dist(pmouseX, pmouseY, finishX, finishY)<18) {
            window.location.href = 'form.html';
        }
    }

function touchMoved() {
    let msn = {pmouseX, pmouseY}
    socket.emit('mobile-positions', msn);
    background(225, 19, 131);
}

function touchStarted() {
    isTouched = true;
}

function touchEnded() {
    isTouched = false;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function newCursor(x, y) {
    noStroke();
    fill(225, 0, 0);
    ellipse(x, y, 10, 10);
}

