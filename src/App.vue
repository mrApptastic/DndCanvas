<script setup>
import CanvasLayer from './components/CanvasLayer.vue';
import ToolBox from './components/ToolBox.vue';
import IconLayer from './components/IconLayer.vue';
import { squareSize, zoom, offsetX, offsetY, showGrid, panMode } from './services/sharedStore';
import { ref } from 'vue';

const uploadedImage = ref(null);

function handleFileUpload(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader()
    reader.onload = (event) => {
      uploadedImage.value = event.target.result;
    };
    reader.readAsDataURL(file);
  }
}
</script>

<template>
  <CanvasLayer :background-image="uploadedImage" />
  <IconLayer />
  <ToolBox>
    <br/>
    <hr/>
    <div style="display: flex; flex-direction: column; gap: 10px; min-width: 180px;">
      <label>
        Grid størrelse:
        <input type="number" v-model.number="squareSize" min="5" max="200" step="1" />
      </label>
      <label>
        Zoom:
        <input type="number" v-model.number="zoom" min="0.1" max="5" step="0.01" />
      </label>
      <label>
        X offset:
        <input type="number" v-model.number="offsetX" min="-2000" max="2000" step="1" />
      </label>
      <label>
        Y offset:
        <input type="number" v-model.number="offsetY" min="-2000" max="2000" step="1" />
      </label>
      <label style="display: flex; align-items: center; gap: 6px;">
        <input type="checkbox" v-model="showGrid" /> Vis grid
      </label>
      <label style="display: flex; align-items: center; gap: 6px;">
        <input type="checkbox" v-model="panMode" /> Pan mode (træk med mus)
      </label>
      <label>
        Baggrundsbillede:
        <input type="file" accept="image/*" @change="handleFileUpload" />
      </label>
    </div>
  </ToolBox>
</template>

<style scoped>
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
}
body {
  overflow: hidden;
}
</style>
