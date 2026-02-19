<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { iconsData } from '../services/sharedStore';

const route = useRoute();
const router = useRouter();

const character = computed(() =>
  iconsData.value.find(icon => String(icon.id) === String(route.params.id))
);

function goBack() {
  router.push('/');
}
</script>

<template>
  <div class="edit-view">
    <button class="back-btn" @click="goBack">← Tilbage</button>
    <div v-if="character" class="edit-form">
      <h2>Rediger karakter</h2>
      <img v-if="character.src" :src="character.src" alt="karakter" class="character-img" />
      <label>
        Navn:
        <input v-model="character.name" class="name-input" placeholder="Navn" />
      </label>
      <label>
        X position:
        <input type="number" v-model.number="character.x" class="pos-input" />
      </label>
      <label>
        Y position:
        <input type="number" v-model.number="character.y" class="pos-input" />
      </label>
      <button class="back-btn" @click="goBack">Gem og luk</button>
    </div>
    <div v-else class="not-found">
      <p>Karakter ikke fundet.</p>
    </div>
  </div>
</template>

<style scoped>
.edit-view {
  min-height: 100vh;
  background: #1a1a1a;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
}
.back-btn {
  background: #333;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 18px;
  font-size: 1em;
  cursor: pointer;
  margin-bottom: 24px;
  align-self: flex-start;
}
.back-btn:hover {
  background: #555;
}
.edit-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: #222c;
  border-radius: 10px;
  padding: 32px;
  min-width: 320px;
}
.edit-form h2 {
  margin: 0 0 8px 0;
}
.character-img {
  width: 96px;
  height: 96px;
  object-fit: contain;
  border-radius: 8px;
  background: #fff2;
  align-self: center;
}
.name-input,
.pos-input {
  margin-left: 8px;
  padding: 6px 10px;
  border-radius: 4px;
  border: 1px solid #555;
  background: #333;
  color: #fff;
  font-size: 1em;
}
.not-found {
  color: #aaa;
  font-size: 1.2em;
}
</style>
