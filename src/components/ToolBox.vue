<template>
  <div v-if="visible" class="toolbox">
    <button class="toolbox-toggle" @click="toggle">✕</button>
    <h3>Ikoner</h3>
    <ul>
      <li v-for="icon in iconsData" :key="icon.id" class="icon-list-item">
        <img v-if="icon.src" :src="icon.src" alt="ikon" class="icon-img" />
        <input v-model="icon.name" placeholder="Navn" class="icon-name-input" />
        <RouterLink :to="'/character/' + icon.id" class="icon-edit-btn">Rediger</RouterLink>
        <button @click="removeIcon(icon.id)" class="icon-remove-btn">Fjern</button>
      </li>
    </ul>
    <input type="file" @change="onFileChange" accept="image/*" multiple class="icon-file-input" />
    <slot />
  </div>
  <button v-else class="toolbox-toggle-open" @click="toggle">☰</button>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { iconsData } from '../services/sharedStore';

const visible = ref(true);
function toggle() {
  visible.value = !visible.value;
}

function removeIcon(id) {
  iconsData.value = iconsData.value.filter(icon => {
    return icon.id !== id;
  });
}

function onFileChange(e) {
  const files = Array.from(e.target.files);
  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = function(evt) {
      const name = file.name.replace(/\.[^/.]+$/, '');
      iconsData.value.push({
        id: Date.now() + Math.random(),
        name,
        src: evt.target.result
      });
    };
    reader.readAsDataURL(file);
  });
  e.target.value = '';
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
.icon-list-item {
  margin-bottom: 8px;
  display: flex;
  align-items: center;
}
.icon-img {
  width: 32px;
  height: 32px;
  object-fit: contain;
  margin-right: 8px;
  background: #fff2;
  border-radius: 4px;
}
.icon-name-input {
  margin-right: 8px;
}
.icon-remove-btn {
  margin-left: 8px;
}
.icon-edit-btn {
  margin-left: 8px;
  padding: 2px 8px;
  background: #444;
  color: #fff;
  border-radius: 4px;
  text-decoration: none;
  font-size: 0.9em;
}
.icon-edit-btn:hover {
  background: #666;
}
.icon-file-input {
  margin-bottom: 8px;
}
</style>
