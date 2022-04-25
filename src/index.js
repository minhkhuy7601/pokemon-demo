import Item from "./modules/Item.js";
import Line from "./modules/Line.js";

import {
  ROWS,
  COLS,
  canvas,
  ctx,
  size,
  matrix,
  lines,
  track,
} from "./modules/constant.js";
import checkTwoPoints from "./modules/ruleGame.js";

let itemsSelected = [];
let permitClick = true;
//SETUP CANVAS

async function initMatrix() {
  // EACH IMAGE APPEARS 4 TIMES
  let temp = [];
  const AMOUNT_IMAGE = 36;
  for (let i = 0; i < AMOUNT_IMAGE; i++) {
    temp.push(0);
  }

  for (let i = 0; i < ROWS; i++) {
    let newRow = new Array();
    for (let j = 0; j < COLS; j++) {
      let image;
      let value;
      let item;
      if (i > 0 && i < ROWS - 1 && j > 0 && j < COLS - 1) {
        let index = Math.floor(Math.random() * AMOUNT_IMAGE);
        while (temp[index] >= 4) {
          index = Math.floor(Math.random() * AMOUNT_IMAGE);
        }
        value = index;
        temp[index]++;
        let src = `../assets/images/${index}.png`;
        await waitForImage(src).then((res) => {
          image = res;
        });
        item = new Item(i, j, false, image, value);
      } else {
        item = new Item(i, j, true, image, 999999);
      }
      newRow.push(item);
    }
    matrix.push(newRow);
  }

  drawGame();
}

function waitForImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  matrix.forEach((val) => {
    val.forEach((v) => v.draw());
  });
  lines.forEach((val) => {
    val.draw();
  });
}

function gamePlay() {
  canvas.addEventListener("click", (e) => {
    if (permitClick) {
      let corX = e.offsetX;
      let corY = e.offsetY;
      matrix.every((row, i) => {
        let ctn = true;
        row.every((item, j) => {
          if (
            item.x <= corX &&
            corX <= item.x + size &&
            item.y <= corY &&
            corY <= item.y + size
          ) {
            if (!item.isChose) {
              conditionSelect(item);
            }
            ctn = false;
            return false;
          }
          return true;
        });
        return ctn;
      });
    }
  });
}

function conditionSelect(item) {
  let isExist = false;
  itemsSelected = itemsSelected.filter((val) => {
    if (val === item) {
      isExist = true;
      return false;
    }
    return true;
  });

  if (isExist) {
    item.isSelected = false;
    drawGame();
  } else {
    item.isSelected = true;
    itemsSelected.push(item);
    drawGame();
    if (itemsSelected.length === 2) {
      itemsSelected[0].isChose = true;
      itemsSelected[1].isChose = true;
      if (!checkTwoPoints(itemsSelected[0], itemsSelected[1])) {
        itemsSelected[0].isChose = false;
        itemsSelected[1].isChose = false;
        itemsSelected[0].isMatch = false;
        itemsSelected[1].isMatch = false;
      } else {
        for (let i = 0; i < track.length - 1; i++) {
          lines.push(new Line(track[i], track[i + 1]));
        }
      }
      drawGame();
      itemsSelected[0].isMatch = true;
      itemsSelected[1].isMatch = true;
      lines.length = 0;
      itemsSelected.forEach((val) => {
        val.isSelected = false;
      });
      itemsSelected = [];
      permitClick = false;
      setTimeout(() => {
        permitClick = true;
        drawGame();
      }, 300);
    }
  }
}

initMatrix();
gamePlay();
