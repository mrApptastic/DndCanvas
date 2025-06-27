<template>
  <div v-if="visible" class="toolbox">
    <button class="toolbox-toggle" @click="toggle">✕</button>
    <slot />
  </div>
  <button v-else class="toolbox-toggle-open" @click="toggle">☰</button>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(true)
function toggle() {
  visible.value = !visible.value
}
</script>

<style scoped>
.toolbox {
  position: fixed;
  top: 20px;
  right: 20px;
  min-width: 180px;
  background: #222c;
  color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px #0006;
  padding: 16px 16px 8px 16px;
  z-index: 10;
  transition: opacity 0.2s;
}
.toolbox-toggle {
  position: absolute;
  top: 4px;
  right: 4px;
  background: none;
  border: none;
  color: #fff;
  font-size: 1.2em;
  cursor: pointer;
}
.toolbox-toggle-open {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 11;
  background: #222c;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1.5em;
  padding: 8px 14px;
  cursor: pointer;
  box-shadow: 0 2px 8px #0006;
}
</style>
