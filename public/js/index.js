const canvas = document.getElementById("myCanvas");
const frame = document.querySelectorAll(".frame");


function getDimension() {
  let canvasX = canvas.getBoundingClientRect().left;
  let canvasY = canvas.getBoundingClientRect().top;
  let frameX = [];
  let frameY = [];
  let frameWidth = [];
  let frameHeight = [];
  frame.forEach((frame, i) => {
    frameX.push(frame.getBoundingClientRect().left - canvasX);
    frameY.push(frame.getBoundingClientRect().top - canvasY);
    frameWidth.push(frame.offsetWidth);
    frameHeight.push(frame.offsetHeight);
    console.log(frameX, frameY, frameHeight, frameWidth);
    console.log(i);
  });
  return { frameX, frameY, frameWidth, frameHeight };
}

const ctx = canvas.getContext("2d");
const images = [
  "/img/huntersInTheSnow.jpg",
  "/img/Bruegel_portrait.jpg",
  "/img/Emblemata_1624.jpg",
];
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const { frameX, frameY, frameWidth, frameHeight } = getDimension();
  images.forEach((image, i) => {
    const imgObj = new Image();
    imgObj.src = image;
    imgObj.width = frameWidth[i];
    imgObj.height = frameHeight[i];
    imgObj.onload = function () {
      ctx.drawImage(imgObj, frameX[i], frameY[i], imgObj.width, imgObj.height);
      console.log(imgObj.src);
    };
  });
}

window.addEventListener("load", draw);
window.addEventListener("resize", draw);
