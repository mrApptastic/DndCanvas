<script setup>
import { onMounted, ref, onBeforeUnmount, watch } from 'vue';
import { squareSize, zoom, offsetX, offsetY, showGrid, panMode } from '../services/sharedStore';

const props = defineProps({ backgroundImage: String });

const canvasRef = ref(null);
const gridCanvasRef = ref(null);

const defaultImgUrl = 'https://5e.tools/img/adventure/CoS/map-4.02-walls-player.webp';
const img = new window.Image();
let imgLoaded = false;

function setImage(src) {
  imgLoaded = false;
  img.src = src;
}

img.onload = () => {
  imgLoaded = true;
  drawAll();
};

function drawAll() {
  const base = canvasRef.value;
  const grid = gridCanvasRef.value;
  if (!base || !grid || !imgLoaded) {
    return;
  }
  // Always match canvas to viewport
  const w = window.innerWidth;
  const h = window.innerHeight;
  base.width = grid.width = w;
  base.height = grid.height = h;
  // Draw image (may overflow canvas)
  const ctx = base.getContext('2d');
  ctx.clearRect(0, 0, base.width, base.height);
  const scale = zoom.value;
  const imgW = img.width * scale;
  const imgH = img.height * scale;
  const x = offsetX.value;
  const y = offsetY.value;
  ctx.drawImage(img, x, y, imgW, imgH);
  // Draw grid if enabled
  const gridCtx = grid.getContext('2d');
  gridCtx.clearRect(0, 0, grid.width, grid.height);
  if (showGrid.value) {
    grid.style.display = '';
    gridCtx.strokeStyle = '#222';
    gridCtx.lineWidth = 1;
    for (let gx = 0; gx <= grid.width; gx += squareSize.value) {
      gridCtx.beginPath();
      gridCtx.moveTo(gx, 0);
      gridCtx.lineTo(gx, grid.height);
      gridCtx.stroke();
    }
    for (let gy = 0; gy <= grid.height; gy += squareSize.value) {
      gridCtx.beginPath();
      gridCtx.moveTo(0, gy);
      gridCtx.lineTo(grid.width, gy);
      gridCtx.stroke();
    }
  } else {
    grid.style.display = 'none';
  }
}

function resizeCanvases() {
  drawAll();
}

// Drag state
const isDragging = ref(false);
let lastX = 0;
let lastY = 0;

function onMouseDown(e) {
  if (!panMode.value) {
    return;
  }
  isDragging.value = true;
  lastX = e.clientX;
  lastY = e.clientY;
  document.body.style.cursor = 'grab';
}
function onMouseMove(e) {
  if (!isDragging.value) {
    return;
  }
  const dx = e.clientX - lastX;
  const dy = e.clientY - lastY;
  offsetX.value += dx;
  offsetY.value += dy;
  lastX = e.clientX;
  lastY = e.clientY;
}
function onMouseUp() {
  isDragging.value = false;
  document.body.style.cursor = panMode.value ? 'grab' : '';
}

watch(panMode, (val) => {
  document.body.style.cursor = val ? 'grab' : '';
});

onMounted(() => {
  window.addEventListener('resize', resizeCanvases);
  setImage(props.backgroundImage || defaultImgUrl);
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeCanvases);
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseup', onMouseUp);
});

watch([squareSize, showGrid, zoom, offsetX, offsetY], () => {
  drawAll();
});

watch(() => props.backgroundImage, (val) => {
  setImage(val || defaultImgUrl);
});
</script>

<template>
  <canvas ref="canvasRef" @mousedown="onMouseDown"></canvas>
  <canvas ref="gridCanvasRef"></canvas>
</template>

<style scoped>
canvas {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}

canvas:first-of-type {
  z-index: 0;
}

canvas:nth-of-type(2) {
  z-index: 1;
  pointer-events: none;
}
</style>
