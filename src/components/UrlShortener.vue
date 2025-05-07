<script setup lang="ts">
import { ref } from 'vue'
import type { urlData } from '../types/UrlTypes.ts'
import UrlCreator from './UrlCreator.vue'

const urlLinks = ref<urlData>({
  shortLink: '',
  longLink: '',
})

const emit = defineEmits(['handleCreateLink'])

const handleURLShorten = (urlData: urlData) => {
  urlLinks.value = urlData
  emit('handleCreateLink', urlData)
}
</script>

<template>
  <UrlCreator @handleURLShorten="handleURLShorten" />

  <p v-if="urlLinks && urlLinks.shortLink">
    Short link: <a :href="urlLinks.shortLink" target="_blank">{{ urlLinks.shortLink }}</a>
  </p>
</template>

<style scoped>
p {
  margin-bottom: 2rem;
}

</style>
