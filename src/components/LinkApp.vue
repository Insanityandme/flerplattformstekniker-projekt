<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SavedLinks from './SavedLinks.vue'
import UrlShortener from './UrlShortener.vue'
import type { urlData } from '../types/UrlTypes.ts'

const savedLinks = ref<urlData[]>([])

const handleCreateLink = (link: urlData) => {
  savedLinks.value.unshift(link)
  localStorage.setItem('savedLinks', JSON.stringify(savedLinks.value))
}

onMounted(() => {
  const saved = localStorage.getItem('savedLinks')
  if (!saved) return

  const links = JSON.parse(saved)
  savedLinks.value = links
})
</script>

<template>
  <div class="container">
    <section class="section-url-shortener">
      <UrlShortener @handleCreateLink="handleCreateLink" />
    </section>
    <section class="section-url-history">
      <SavedLinks :links="savedLinks" />
    </section>
  </div>
</template>

<style scoped>

.section-url-shortener {
  display: flex;
  flex-direction: column;
}

</style>
