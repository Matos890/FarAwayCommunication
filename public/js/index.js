import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Timeline } from "gsap/gsap-core";

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
  "/img/Emblemata_1624_bookmark.jpg",
  "/img/chappebackground.png",
  "/img/Franklin_hand_bookmark.jpg",
  "/img/Faraday.png",
  "/img/henry.png",
  "/img/giornalisti_bookmark.png",
  "/img/morse.png",
  "/img/submarine_bookmark.jpg"
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
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    canvas.setAttribute("width", screenWidth);
    canvas.setAttribute("height", screenHeight);
    canvas1.setAttribute("width", screenWidth);
    canvas1.setAttribute("height", screenHeight);
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
      } else if (imgObj.src.includes("bookmark")) {
        cover(imgObj, frameX[i], frameY[i], frameWidth[i], frameHeight[i], {
          mode: "cover",
        })
          .zoom(1.5)
          .pan(0.7, 0)
          .render(ctx);
      } else {
        ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
        ctx.shadowBlur = 7;
        ctx.shadowOffsetX = 10;
        ctx.shadowOffsetY = 10;
        ctx.drawImage(
          imgObj,
          frameX[i],
          frameY[i],
          frameWidth[i],
          frameHeight[i]
        );
      }
    });
  }
}
function updateCanvas() {
  draw();
  requestAnimationFrame(updateCanvas);
}
function calculatePositionsGif() {
  const container1 = document.querySelector(".containerFrame2");
  const positionContainer1X = container1.getBoundingClientRect().left;
  const canvasPositionX = canvas.getBoundingClientRect().left;
  const gifX = positionContainer1X - canvasPositionX;

  const container2 = document.querySelector(".containerFrame2Copy");
  const positionContainer2X = container2.getBoundingClientRect().left;
  const endTrigger = positionContainer2X - canvasPositionX;

  const distance = endTrigger - gifX;

  return {
    positionContainer1X,
    gifX,
    positionContainer2X,
    endTrigger,
    distance,
  };
}
function calculateXPosition() {}
preloadImages(imageSources, () => {
  window.addEventListener("resize", draw);
  window.addEventListener("load", draw);
  // const container1 = document.querySelector(".containerFrame2");
  // const positionContainer1X = container1.getBoundingClientRect().left;
  // const canvasPositionX = canvas.getBoundingClientRect().left;
  // const gifX = positionContainer1X - canvasPositionX;
  // const container2 = document.querySelector(".containerFrame2Copy");
  // const positionContainer2X = container2.getBoundingClientRect().left;
  // const endTrigger = positionContainer2X - canvasPositionX;
  // const distance = endTrigger - gifX;
  let { positionContainer1X, gifX, positionContainer2X, endTrigger, distance } =
    calculatePositionsGif();

  window.addEventListener("resize", () => {
    ({ positionContainer1X, gifX, positionContainer2X, endTrigger, distance } =
      calculatePositionsGif());
  });
  gsap.from(".titoloChappe", {
    opacity: 0,
    y: "3vh",
    duration: 1,
    ease: "power1.inOut",
  });
  gsap.from(".spanBookmark", {
    opacity: 0,
    y: "10vh",
    stagger: 0.2,
    duration: 5,
  });
  const sections = gsap.utils.toArray(".mainWrapper .scroller ");
  let scrollTween = gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    duration: 5,
    delay: 0.2,
    ease: "none",
    scrollTrigger: {
      trigger: ".sectioni",
      // markers:true,
      pin: true,
      scrub: 5,
      pinSpacing: false,
      invalidateOnRefresh: true,
      markers: true,
      start: "center center",
      end: "+=8000",
      onUpdate: () => {
        requestAnimationFrame(draw);
      },
    },
  });
  const gifMoving = function () {
    gsap.to(".gif1", {
      x: () => {
        const container1 = document.querySelector(".containerFrame2");
        const positionContainer1X = container1.getBoundingClientRect().left;
        const canvasPositionX = canvas.getBoundingClientRect().left;
        const gifX = positionContainer1X - canvasPositionX;

        const container2 = document.querySelector(".containerFrame2Copy");
        const positionContainer2X = container2.getBoundingClientRect().left;
        const endTrigger = positionContainer2X - canvasPositionX;

        const distance = endTrigger - gifX;
        return distance;
      },
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".gif1",
        // endTrigger:'containerFrame2Copy',
        containerAnimation: scrollTween,
        horizontal: true,
        pin: true,
        scrub: true,
        pinType: "transform",
        pinSpacing: false,
        invalidateOnRefresh: true,
        start: () => `0   ${gifX}`,
        end: () => `center  -${endTrigger}`,
      },
    });

    //-- MAP ANIMATION //
    const tl = gsap.timeline();

    tl.add("start")
      .from(
        map,
        {
          opacity: 0,
          duration: 2,
        },
        "start"
      )
      .from(
        pallini,
        {
          opacity: 0,
          duration: 2,
        },
        "start"
      )
      .from(cities, { opacity: 0, duration: 2 })
      .from(primaEra, { opacity: 0, duration: 2 })
      .from(secondaEra, { opacity: 0, duration: 2 })
      .from(terzaEra, { opacity: 0, duration: 2 })
      .from(after1830, {
        opacity: 0,
        duration: 2,
      });
    ScrollTrigger.create({
      animation: tl, // La timeline da collegare
      containerAnimation: scrollTween,
      trigger: ".p-03", // L'elemento che fa scattare lo ScrollTrigger
      start: "left center",

      end: "+=200", // Quando deve iniziare l'animazione
      // markers: true  // Mostrare i markers per il debug
    });
  };

  window.addEventListener("resize", gifMoving());
  requestAnimationFrame(updateCanvas);
});
