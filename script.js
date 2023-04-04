const boxes = document.querySelectorAll(".box");
const images = document.querySelectorAll(".image");

const submitBtn = document.querySelector(".submit_btn");
const resetBtn = document.querySelector(".reset_btn");

const resultP = document.querySelector(".result_p");

let orginImageOrder = [
  "1-1-1-number-png.png",
  "2-2-2-number-png.png",
  "5-2-3-number-png.png",
  "1-2-4-number-png.png",
  "11-2-5-number-png.png",
];

let imageArray = ["", "", "", "", ""];

const sortRandomly = () => [0, 1, 2, 3, 4].sort(() => Math.random() - 0.5);

function generateImage() {
  for (let i = 0; i < images.length; i++) {
    images[i].style.backgroundImage = `url(images/${imageArray[i]})`;
  }
}

let dragOver = "";
let dragLeave = "";
let clickEvent = "";

boxes.forEach((box) => {
  box.addEventListener("dragover", (e) => {
    e.preventDefault();
    box.classList.add("hovered");
    if (dragOver === "") {
      dragOver = box.classList[1];
    }
  });
  box.addEventListener("dragleave", () => {
    box.classList.remove("hovered");
  });
  box.addEventListener("drop", () => {
    if (dragLeave === "") {
      dragLeave = box.classList[1];
    }
    const temp = imageArray[dragOver - 1];
    imageArray[dragOver - 1] = imageArray[dragLeave - 1];
    imageArray[dragLeave - 1] = temp;
    generateImage();
    dragOver = "";
    dragLeave = "";
  });

  box.addEventListener("click", function (e) {
    box.style.backgroundColor = "green";
    if (clickEvent === "") {
      clickEvent = box.classList[1];
    } else {
      const secondEvent = box.classList[1];
      const temp = imageArray[clickEvent - 1];
      imageArray[clickEvent - 1] = imageArray[secondEvent - 1];
      imageArray[secondEvent - 1] = temp;
      generateImage();
      clickEvent = "";
      boxes.forEach((element) => {
        element.style.backgroundColor = "rgb(187, 255, 232)";
      });
    }
  });
});

function start() {
  const orderArray = sortRandomly();
  imageArray[0] = orginImageOrder[orderArray[0]];
  imageArray[1] = orginImageOrder[orderArray[1]];
  imageArray[2] = orginImageOrder[orderArray[2]];
  imageArray[3] = orginImageOrder[orderArray[3]];
  imageArray[4] = orginImageOrder[orderArray[4]];
  generateImage();
}

start();

submitBtn.addEventListener("click", function () {
  let winResult = true;
  for (let i = 0; i < imageArray.length; i++) {
    if (imageArray[i] !== orginImageOrder[i]) {
      winResult = false;
    }
  }
  if (winResult) {
    resultP.style.color = "green";
    resultP.style.display = "block";
    resultP.innerHTML = "You win";
  } else {
    resultP.style.color = "red";
    resultP.style.display = "block";
    resultP.innerHTML = "You loss";
  }
});

resetBtn.addEventListener("click", function () {
  imageArray = ["", "", "", "", ""];
  resultP.style.display = "none";
  start();
});
