const NGROK = `${window.location.hostname}`;
console.log('Server IP: ', NGROK);
let socket = io(NGROK, { path: '/real-time' });

//let socket = io("http://localhost:5050", { path: '/real-time' })
let canvas;
let controllerX, controllerY = 0;
//Images
let mazeImg, snackImg, snacksBox;

// 
const initial = document.querySelector('.instructions');
const instructions = document.querySelector('.start-game');
const form = document.querySelector('.send')

console.log(instructions);

if (initial) {
    initial?.addEventListener('click', ()=>{
        socket.emit('screens', {src: 'instructions'})
    });
}


if (instructions) {
    instructions?.addEventListener('click', ()=>{
        socket.emit('screens', {src: 'form'})
    })
}


// form.addEventListener('click', ()=>{
//     socket.emit('screens', {src: 'thanks'})
// });



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

}

function draw() {
    background(255)
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

