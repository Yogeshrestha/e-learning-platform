window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  lastX = 0;
  lastY = 0;
});

const canvas = document.getElementById('whiteboard');
const ctx = canvas.getContext('2d');
let drawing = false;
let eraserMode = false;
let penColor = '#000';
let penSize = 5;
let lastX = 0;
let lastY = 0;

const toolbar = document.getElementById('toolbar');
const pencilTool = document.getElementById('pencil-tool');
const eraserTool = document.getElementById('eraser-tool');
const clearCanvas = document.getElementById('clear-canvas');
const colorInput = document.getElementById('color-input');
const sizeInput = document.getElementById('size-input');

// Set the pen color and size based on the input elements
function setPenColor() {
  penColor = colorInput.value;
  ctx.strokeStyle = penColor;
}

function setPenSize() {
  const value = sizeInput.value;
  if (isNaN(value) || value < 1 || value > 50) {
    console.error('Invalid pen size');
    return;
  }
  penSize = value;
  ctx.lineWidth = penSize;
}

colorInput.addEventListener('input', setPenColor);
sizeInput.addEventListener('input', setPenSize);

// Event listeners
canvas.addEventListener('mousedown', (e) => {
  e.preventDefault();
  startDrawing(e);
});

canvas.addEventListener('mousemove', (e) => draw(e));
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  lastX = 0;
  lastY = 0;
});

// Function to start drawing
function startDrawing(e) {
  drawing = true;
  [lastX, lastY] = getMousePos(canvas, e);
  draw({ clientX: lastX, clientY: lastY });
  setPenColor();
  setPenSize();
}

// Function to draw
function draw(e) {
  if (!drawing) return;
  ctx.lineWidth = penSize;
  ctx.lineCap = 'round';
  ctx.strokeStyle = eraserMode ? '#fff' : penColor;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  [lastX, lastY] = getMousePos(canvas, e);
  ctx.lineTo(lastX, lastY);
  ctx.stroke();
}

// Function to stop drawing
function stopDrawing() {
  drawing = false;
  ctx.beginPath();
  [lastX, lastY] = [0, 0];
}

// Function to toggle eraser mode
function toggleEraserMode() {
  eraserMode = !eraserMode;
  pencilTool.classList.toggle('active', !eraserMode);
  eraserTool.classList.toggle('active', eraserMode);
  if (eraserMode) {
    setPenColor('#fff');
  } else {
    setPenColor(penColor);
  }
  setPenSize();
}

// Function to get the mouse position
function getMousePos(canvas, evt) {
  const rect = canvas.getBoundingClientRect();
  return [evt.clientX - rect.left, evt.clientY - rect.top];
}

// Add event listeners for the toolbar buttons
clearCanvas.addEventListener('click', () => ctx.clearRect(0, 0, canvas.width, canvas.height));
pencilTool.addEventListener('click', () => toggleEraserMode());
eraserTool.addEventListener('click', () => toggleEraserMode());
