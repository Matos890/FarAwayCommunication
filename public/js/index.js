import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
const cover = require("canvas-image-cover");
const canvas = document.getElementById("myCanvas");
const canvas1 = document.getElementById("myCanvas1");
const frame = document.querySelectorAll("[class^='frame']");
const frame1 = document.querySelector(".frame1");
const ctx = canvas.getContext("2d");
const ctx1 = canvas1.getContext("2d");

ctx.globalCompositeOperation = "source-over";

const imageSources = [
  "/img/Emblemata_1624.jpg",
  "/img/chappe.png",
  "/img/chappe.png",
  "/img/administrative_francia.png",
  "/img/chappebackground.png",
];
const imageSources1 = [];

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
  {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
    const { frameX, frameY, frameWidth, frameHeight } = getDimension();
    images.forEach((imgObj, i) => {
      if (imgObj.src.includes("background")) {
        ctx1.globalAlpha = 0.2;
        ctx1.drawImage(
          imgObj,
          frameX[i],
          frameY[i],
          frameWidth[i],
          frameHeight[i]
        );
      } else if (i === 0) {
        cover(imgObj, frameX[i], frameY[i], frameWidth[i], frameHeight[i], {
          mode: "cover",
        })
          .zoom(0.6)
          .pan(0.7, 0.3)
          .render(ctx);
      } else {
        ctx.drawImage(
          imgObj,
          frameX[i],
          frameY[i],
          frameWidth[i],
          frameHeight[i]
        );
      }
      console.log(imgObj.src);
    });
  }
}

preloadImages(imageSources, () => {
  window.addEventListener("resize", draw);
  window.addEventListener("load", draw);

  // gsap.to(frame1, {
  //   marginLeft: 200,
  //   duration: 2,
  //   onUpdate: draw,
  //   scrollTrigger:{
  //     trigger:frame1,
  //     markers:true,

  //   }
  // });
});
//// SCROLLER
const sections = gsap.utils.toArray(".mainWrapper scroller ");

let scrollTween = gsap.to('.mainWrapper', {
  xPercent: 100 * (sections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".scroller",
    pin:true,
    scrub:true,
    pinSpacing:false,
    markers:true,
    start:'center center',
    end: "+=3000",
  },
});