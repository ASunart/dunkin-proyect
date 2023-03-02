const NGROK = `${window.location.hostname}`;
console.log('Server IP: ', NGROK);
let socket = io(NGROK, { path: '/real-time' });

//let socket = io("http://localhost:5050", { path: '/real-time' })
let canvas;
let controllerX, controllerY = 0;
//Images
let gameScreen;

let isTouched = false;

// 
const initial = document.querySelector('.instructions');
const instructions = document.querySelector('.start-game');
const form = document.querySelector('.send')
const formInfo = document.querySelector('.form');


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
// if () {
    
// }
}

// if (form) {
//     instructions?.addEventListener('click', ()=>{
//     socket.emit('screens', {src: 'instructions'})
//     })
// }


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
    background(255, 5)
    image(gameScreen, windowWidth/2, windowHeight/2, 300, 300);
    newCursor(controllerX, controllerY);
    }



function touchMoved() {
    let msn = {pmouseX, pmouseY}
    socket.emit('mobile-positions', msn);
    background(255, 0 , 0);
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

