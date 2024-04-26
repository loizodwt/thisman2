
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const clearBtn = document.getElementById('clearBtn');
const colorPicker = document.getElementById('colorPicker');
const sizeSlider = document.getElementById('sizeSlider');
const eraserCheckbox = document.getElementById('eraserCheckbox');


canvas.width = 400; 
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


function stopDrawing() {
  isDrawing = false;
}


function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}


function updateColor() {
  strokeColor = colorPicker.value;
}


function updateSize() {
  strokeWidth = sizeSlider.value;
}


function updateEraser() {
  isEraserEnabled = eraserCheckbox.checked;
}


canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

clearBtn.addEventListener('click', clearCanvas);


colorPicker.addEventListener('change', updateColor);


sizeSlider.addEventListener('input', updateSize);


eraserCheckbox.addEventListener('change', updateEraser);

