<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SavedLinks from './SavedLinks.vue'
import UrlCreator from './UrlCreator.vue'
import type { urlData } from '../types/UrlTypes.ts'

const savedLinks = ref<urlData[]>([])

const handleCreateLink = (link: urlData) => {
  savedLinks.value.push(link)
  localStorage.setItem('savedLinks', JSON.stringify(savedLinks))
}

onMounted(() => {
  const saved = localStorage.getItem('savedLinks')
  const links = JSON.parse(saved)
  savedLinks.value = links
})
</script>

<template>
  <div class="container">
    <UrlCreator @onCreateLink="handleCreateLink" />
    <SavedLinks :links="savedLinks" />
  </div>
</template>

<style scoped></style>
