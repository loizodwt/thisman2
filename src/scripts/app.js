
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const clearBtn = document.getElementById('clearBtn');
const colorPicker = document.getElementById('colorPicker');
const sizeSlider = document.getElementById('sizeSlider');
const eraserCheckbox = document.getElementById('eraserCheckbox');


canvas.width = 400; // Remplacez 800 par la largeur souhaitée en pixels
canvas.height = 400;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let strokeColor = colorPicker.value;
let strokeWidth = sizeSlider.value;
let isEraserEnabled = false;


function startDrawing(e) {
  isDrawing = true;
  lastX = e.clientX - canvas.offsetLeft;
  lastY = e.clientY - canvas.offsetTop;
}


function draw(e) {
  if (!isDrawing) return;
  
  const x = e.clientX - canvas.offsetLeft;
  const y = e.clientY - canvas.offsetTop;
  
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.strokeStyle = isEraserEnabled ? 'white' : strokeColor;
  ctx.lineWidth = strokeWidth;
  ctx.stroke();
  
  lastX = x;
  lastY = y;
}

// Функція для зупинки малювання
function stopDrawing() {
  isDrawing = false;
}

// Очистка полотна
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Оновлення кольору пензля
function updateColor() {
  strokeColor = colorPicker.value;
}

// Оновлення розміру пензля
function updateSize() {
  strokeWidth = sizeSlider.value;
}

// Оновлення стану гумки
function updateEraser() {
  isEraserEnabled = eraserCheckbox.checked;
}

// Додаємо обробники подій для малювання
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Додаємо обробник події для кнопки очищення
clearBtn.addEventListener('click', clearCanvas);

// Додаємо обробник події для вибору кольору
colorPicker.addEventListener('change', updateColor);

// Додаємо обробник події для зміни розміру
sizeSlider.addEventListener('input', updateSize);

// Додаємо обробник події для вибору гумки
eraserCheckbox.addEventListener('change', updateEraser);

