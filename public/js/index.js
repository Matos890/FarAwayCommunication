import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
const canvas = document.getElementById("myCanvas");
const frame = document.querySelectorAll("[class^='frame']");
const frame1 = document.querySelector('.frame1');
const ctx = canvas.getContext("2d");

ctx.globalCompositeOperation = "source-over";

const imageSources = [
  "/img/Emblemata_1624.jpg",
  "/img/huntersInTheSnow.jpg",
  "/img/Bruegel_portrait.jpg",
];

const images = [];

function preloadImages(sources, callback) {
  let loadedImages = 0;
  sources.forEach((src, index) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      loadedImages++;
      if (loadedImages === sources.length) {
        callback();
      }
    };
    images[index] = img;
  });
}

function getDimension() {
  let canvasX = canvas.getBoundingClientRect().left;
  let canvasY = canvas.getBoundingClientRect().top;
  let frameX = [];
  let frameY = [];
  let frameWidth = [];
  let frameHeight = [];
  frame.forEach((frame, i) => {
    let rect = frame.getBoundingClientRect();
    frameX.push(rect.left - canvasX);
    frameY.push(rect.top - canvasY);
    frameWidth.push(frame.offsetWidth);
    frameHeight.push(frame.offsetHeight);
  });
  return { frameX, frameY, frameWidth, frameHeight };
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const { frameX, frameY, frameWidth, frameHeight } = getDimension();
  images.forEach((imgObj, i) => {
    ctx.drawImage(imgObj, frameX[i], frameY[i], frameWidth[i], frameHeight[i]);
  });
}

preloadImages(imageSources, () => {
  window.addEventListener("resize", draw);
  window.addEventListener("load", draw);

  gsap.to(frame1, {
    marginLeft: 200,
    duration: 2,
    onUpdate: draw,
    scrollTrigger:{
      trigger:frame1,
      markers:true,

    }
  });
});
