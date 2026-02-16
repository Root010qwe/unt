const canvas = document.getElementById("priceCanvas");
const ctx = canvas.getContext("2d");

const bgUpload = document.getElementById("bgUpload");
const titleText = document.getElementById("titleText");
const contactText = document.getElementById("contactText");
const titleColor = document.getElementById("titleColor");
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
  ["Котлеты из говядины 1 шт", "100 руб."],
  ["Сырники 1 шт.", "40 руб."]
];

const layout = {
  titleY: 170,
  rowsStartY: 280,
  nameX: 70,
  nameMaxWidth: 700,
  priceX: 1010,
  rowGap: 24,
  nameLineHeight: 58,
  minRowHeight: 62,
  badgeWidth: 640,
  badgeHeight: 118,
  badgeY: canvas.height - 170,
  maxBottomY: canvas.height - 215
};

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

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.className = "item-name";
  nameInput.placeholder = "Название товара";
  nameInput.value = name;

  const priceInput = document.createElement("input");
  priceInput.type = "text";
  priceInput.className = "item-price";
  priceInput.placeholder = "700 руб.";
  priceInput.value = price;

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.setAttribute("aria-label", "Удалить позицию");
  removeButton.textContent = "×";

  removeButton.addEventListener("click", () => {
    row.remove();
    drawCanvas();
  });

  [nameInput, priceInput].forEach((input) => {
    input.addEventListener("input", drawCanvas);
  });

  row.append(nameInput, priceInput, removeButton);
  itemsContainer.appendChild(row);
}

function wrapText(text, maxWidth, font) {
  const safeText = text.trim();

  if (!safeText) {
    return [""];
  }

  ctx.font = font;
  const words = safeText.split(/\s+/);
  const lines = [];
  let line = "";

  for (const word of words) {
    const testLine = line ? `${line} ${word}` : word;
    if (ctx.measureText(testLine).width <= maxWidth) {
      line = testLine;
    } else {
      if (line) {
        lines.push(line);
      }
      line = word;
    }
  }

  if (line) {
    lines.push(line);
  }

  return lines.length ? lines : [safeText];
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

function drawRows() {
  const rows = [...document.querySelectorAll(".item-row")];
  let y = layout.rowsStartY;

  ctx.textBaseline = "top";

  for (const row of rows) {
    const name = row.querySelector(".item-name").value;
    const price = row.querySelector(".item-price").value;

    if (!name.trim() && !price.trim()) {
      continue;
    }

    const lines = wrapText(name, layout.nameMaxWidth, "700 54px Inter, Arial");
    const nameHeight = Math.max(layout.minRowHeight, lines.length * layout.nameLineHeight);
    const rowHeight = nameHeight + layout.rowGap;

    if (y + rowHeight > layout.maxBottomY) {
      break;
    }

    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillStyle = nameColor.value;
    ctx.font = "700 54px Inter, Arial";

    lines.forEach((line, index) => {
      ctx.fillText(line, layout.nameX, y + index * layout.nameLineHeight);
    });

    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.fillStyle = priceColor.value;
    ctx.font = "700 58px Georgia, serif";
    ctx.fillText(price.trim(), layout.priceX, y + nameHeight / 2);

    y += rowHeight;
  }

  ctx.textBaseline = "alphabetic";
}

function drawCanvas() {
  drawBackground();

  ctx.textAlign = "center";
  ctx.fillStyle = titleColor.value;
  ctx.font = "500 126px Georgia, serif";
  ctx.fillText(titleText.value || "ПРАЙС", canvas.width / 2, layout.titleY);

  drawRows();

  const badgeX = (canvas.width - layout.badgeWidth) / 2;

  ctx.fillStyle = badgeColor.value;
  ctx.beginPath();
  ctx.roundRect(badgeX, layout.badgeY, layout.badgeWidth, layout.badgeHeight, 22);
  ctx.fill();

  ctx.textAlign = "center";
  ctx.fillStyle = badgeTextColor.value;
  ctx.font = "700 72px Georgia, serif";
  ctx.fillText(contactText.value || "+7 900 000-00-00", canvas.width / 2, layout.badgeY + 82);
}

function resetItems() {
  itemsContainer.innerHTML = "";
  defaultItems.forEach(([name, price]) => createItemRow(name, price));
}

[titleText, contactText, titleColor, nameColor, priceColor, badgeColor, badgeTextColor].forEach((input) => {
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
  titleColor.value = "#f7f6f0";
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
