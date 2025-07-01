<template>
  <div class="icon-layer">
    <div v-for="icon in iconsData" :key="icon.id"
      class="icon-draggable"
      @mousedown="startDrag(icon, $event)"
      :class="{ 'is-dragging': dragIcon && dragIcon.id === icon.id }"
      :style="iconPositionStyle(icon)"
    >
      <img :src="icon.src" :alt="'icon-' + icon.id" draggable="false" class="icon-img" />
    </div>
  </div>
</template>

<script setup>
import { iconsData } from '../services/sharedStore';
import { squareSize } from '../services/sharedStore';
import { ref } from 'vue';

let dragIcon = null;
let dragOffset = { x: 0, y: 0 };

function startDrag(icon, e) {
  dragIcon = icon;
  dragOffset.x = e.clientX - (icon.x || 0);
  dragOffset.y = e.clientY - (icon.y || 0);
  document.addEventListener('mousemove', onDrag);
  document.addEventListener('mouseup', stopDrag);
}

function onDrag(e) {
  if (!dragIcon) {
    return;
  }
  dragIcon.x = e.clientX - dragOffset.x;
  dragIcon.y = e.clientY - dragOffset.y;
}

function stopDrag() {
  dragIcon = null;
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', stopDrag);
}

function iconPositionStyle(icon) {
  return {
    left: (icon.x || 0) + 'px',
    top: (icon.y || 0) + 'px',
    width: squareSize.value + 'px',
    height: squareSize.value + 'px'
  };
}
</script>

<style scoped>
.icon-layer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 5;
}
.icon-draggable {
  position: absolute;
  pointer-events: auto;
  box-shadow: 0 2px 8px #0006;
  border-radius: 6px;
  background: #fff8;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
  user-select: none;
}
.icon-draggable.is-dragging {
  opacity: 0.7;
}
.icon-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: none;
}
</style>
