import { createRouter, createWebHashHistory } from 'vue-router'
import CanvasView from '../views/CanvasView.vue'
import CharacterEditView from '../views/CharacterEditView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: CanvasView },
    { path: '/character/:id', component: CharacterEditView },
  ],
})

export default router
