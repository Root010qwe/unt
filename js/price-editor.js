const canvas = document.getElementById("priceCanvas");
const ctx = canvas.getContext("2d");

const bgUpload = document.getElementById("bgUpload");
const titleText = document.getElementById("titleText");
const contactText = document.getElementById("contactText");
const nameColor = document.getElementById("nameColor");
const priceColor = document.getElementById("priceColor");
const badgeColor = document.getElementById("badgeColor");
const badgeTextColor = document.getElementById("badgeTextColor");

const addItemButton = document.getElementById("addItem");
const itemsContainer = document.getElementById("itemsContainer");
const downloadImageButton = document.getElementById("downloadImage");
const resetDefaultsButton = document.getElementById("resetDefaults");

const defaultItems = [
  ["Пельмени из грудки индейки (1 кг)", "700 руб."],
  ["Пельмени из говядины (1 кг)", "700 руб."],
  ["Манты 1 кг", "700 руб."],
  ["Вареники с домашним сыром и творогом (1 кг)", "400 руб."],
  ["Котлеты из говядины", "1 шт — 100 руб."],
  ["Сырники 1 шт.", "40 руб."]
];

let backgroundImage = null;

function hexToRgba(hex, alpha) {
  const pure = hex.replace("#", "");
  const value = Number.parseInt(pure, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function createItemRow(name = "", price = "") {
  const row = document.createElement("div");
  row.className = "item-row";
  row.innerHTML = `
    <input type="text" class="item-name" placeholder="Название" value="${name}">
    <input type="text" class="item-price" placeholder="Цена" value="${price}">
    <button type="button" aria-label="Удалить позицию">×</button>
  `;

  row.querySelector("button").addEventListener("click", () => {
    row.remove();
    drawCanvas();
  });

  row.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", drawCanvas);
  });

  itemsContainer.appendChild(row);
}

function wrapText(text, maxWidth, font = "bold 56px Inter") {
  ctx.font = font;
  const words = text.split(" ");
  const lines = [];
  let line = "";

  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width < maxWidth) {
      line = test;
    } else {
      lines.push(line);
      line = word;
    }
  }

  if (line) {
    lines.push(line);
  }

  return lines;
}

function drawBackground() {
  if (backgroundImage) {
    const ratio = Math.max(canvas.width / backgroundImage.width, canvas.height / backgroundImage.height);
    const drawWidth = backgroundImage.width * ratio;
    const drawHeight = backgroundImage.height * ratio;
    const x = (canvas.width - drawWidth) / 2;
    const y = (canvas.height - drawHeight) / 2;

    ctx.drawImage(backgroundImage, x, y, drawWidth, drawHeight);
  } else {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "#b7ab92");
    gradient.addColorStop(1, "#847a64");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  ctx.fillStyle = hexToRgba("#000000", 0.16);
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawCanvas() {
  drawBackground();

  ctx.textAlign = "center";
  ctx.fillStyle = nameColor.value;
  ctx.font = "500 128px Georgia, serif";
  ctx.fillText(titleText.value || "ПРАЙС", canvas.width / 2, 180);

  const rows = [...document.querySelectorAll(".item-row")];
  let y = 320;

  rows.forEach((row) => {
    const name = row.querySelector(".item-name").value.trim();
    const price = row.querySelector(".item-price").value.trim();

    if (!name && !price) {
      return;
    }

    const lines = wrapText(name, 680);

    ctx.textAlign = "left";
    ctx.fillStyle = nameColor.value;
    ctx.font = "bold 56px Inter, Arial";

    lines.forEach((line) => {
      ctx.fillText(line, 70, y);
      y += 64;
    });

    ctx.textAlign = "right";
    ctx.fillStyle = priceColor.value;
    ctx.font = "700 62px Georgia, serif";
    ctx.fillText(price, 1010, y - 8);
    y += 42;
  });

  const badgeWidth = 640;
  const badgeHeight = 118;
  const badgeX = (canvas.width - badgeWidth) / 2;
  const badgeY = canvas.height - 170;

  ctx.fillStyle = badgeColor.value;
  ctx.beginPath();
  ctx.roundRect(badgeX, badgeY, badgeWidth, badgeHeight, 22);
  ctx.fill();

  ctx.textAlign = "center";
  ctx.fillStyle = badgeTextColor.value;
  ctx.font = "700 72px Georgia, serif";
  ctx.fillText(contactText.value || "+7 900 000-00-00", canvas.width / 2, badgeY + 82);
}

function resetItems() {
  itemsContainer.innerHTML = "";
  defaultItems.forEach(([name, price]) => createItemRow(name, price));
}

[titleText, contactText, nameColor, priceColor, badgeColor, badgeTextColor].forEach((input) => {
  input.addEventListener("input", drawCanvas);
});

addItemButton.addEventListener("click", () => {
  createItemRow();
  drawCanvas();
});

bgUpload.addEventListener("change", (event) => {
  const [file] = event.target.files;

  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      backgroundImage = img;
      drawCanvas();
    };
    img.src = String(reader.result);
  };
  reader.readAsDataURL(file);
});

downloadImageButton.addEventListener("click", () => {
  drawCanvas();
  const link = document.createElement("a");
  link.download = "price-story.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});

resetDefaultsButton.addEventListener("click", () => {
  titleText.value = "ПРАЙС";
  contactText.value = "+7 960 439-17-69";
  nameColor.value = "#f7f6f0";
  priceColor.value = "#411826";
  badgeColor.value = "#591f2f";
  badgeTextColor.value = "#f8efe4";
  backgroundImage = null;
  bgUpload.value = "";
  resetItems();
  drawCanvas();
});

resetItems();
drawCanvas();
