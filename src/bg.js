const body = document.querySelector("body");

const IMG_NUMBER = 4;

function getImageSrc(imgNumber) {
  return `images/${imgNumber + 1}.jpg`;
}

function generateImg(imgNumber) {
  const image = new Image();
  image.src = getImageSrc(imgNumber);
  image.classList.add("bgImage");
  return image;
}

function setBgImage(imgNumber) {
  const img = generateImg(imgNumber);
  body.appendChild(img);
}

function generateRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNumber = generateRandom();
  setBgImage(randomNumber);
}

init();
