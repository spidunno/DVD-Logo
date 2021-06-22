function generateRandomNumber(min,max) {
        highlightedNumber = Math.random() * (max - min) + min;

    return highlightedNumber
};
let ballX;
let ballY;
let logoW = 100;
let logoH = 101;
let velX = generateRandomNumber(4,5);
let velY = generateRandomNumber(4,5);
let cnvX = window.innerWidth;
let cnvY = window.innerHeight;
let img;
let vcrEas;
let time = {
  h: 00,
  m: 00,
  s: 00
}
let bounces = 0;
var ping;
var playSound = false;

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

function preload() {
  vcrEas = loadFont('assets/VCR_OSD_MONO_1.001.ttf');
}

let button;

function playSoundFromFile(url){
  var audio = document.createElement('audio');
  audio.style.display = "none";
  audio.src = url;
  audio.autoplay = true;
  audio.onended = function(){
    audio.remove() //Remove when played.
  };
  document.body.appendChild(audio);
}

function setup() {
  img = loadImage('https://img.pngio.com/white-dvd-icon-free-white-dvd-icons-dvd-logo-white-256_256.jpg');
  cnv = createCanvas(cnvX,cnvY);
  cnv.position(0,0);
  ballX = window.innerWidth / 2;
  ballY = window.innerHeight / 2;
  startCount(1000);
  // ping = new Audio("https://dm0qx8t0i9gc9.cloudfront.net/previews/audio/BsTwCwBHBjzwub4i4/beep-digital_zkK8VYN__NWM.mp3")
	button = createButton('Enable sound');
	button.position(window.innerWidth - 100, window.innerHeight - 25);
	button.mousePressed(() => {playSound = !playSound});
	button.class("button");
}

function bounce() {
  bounces += 1
  if (playSound === true) {
    // ping.play();
		playSoundFromFile("https://dm0qx8t0i9gc9.cloudfront.net/previews/audio/BsTwCwBHBjzwub4i4/beep-digital_zkK8VYN__NWM.mp3");
  }
}

function startCount(delayPerSecondInMillseconds = 1000) {
    setInterval(function() {
    time.s += 1;
    if (time.s >= 60) {
        time.s = 0;
        time.m += 1;
    if (time.m >= 60) {
        time.m = 0;
        time.h += 1;
    }
    }},delayPerSecondInMillseconds);
    return true;
}

function draw() {
	button.position(window.innerWidth - 100, window.innerHeight - 25);
	button.html((playSound === true ? "Disable" : "Enable") + " sound");
  cnvX = window.innerWidth;
  cnvY = window.innerHeight;
  resizeCanvas(cnvX,cnvY);
  background(0);
  image(img,ballX,ballY,logoW * 2,logoH * 2);
  ballX += velX;
  ballY += velY;
  if (ballX <= -1) {
    velX = -velX;
    ballX = -1;
    bounce();
  }
  if (ballX >= cnvX - (99 * 2)) {
    velX = -velX;
    ballX = cnvX - (99 * 2);
    bounce();
  }
  if (ballY <= -27 * 2) {
    velY = -velY;
    ballY = -27 * 2;
    bounce();
  }
  if (ballY >= cnvY - 72 * 2) {
    velY = -velY;
    ballY = cnvY - 72 * 2;
    bounce();
  }
  fill(225);
  textFont(vcrEas);
  textSize(50);
  text(time.h + ':' + time.m + ':' + time.s,30,50);
  text("Bounces:" + bounces,window.innerWidth - 500,50);
  textSize(10);
}
