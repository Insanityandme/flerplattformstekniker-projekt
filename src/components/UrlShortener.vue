<script setup lang="ts">
import { ref } from 'vue'
import type { urlData } from '@/types/UrlTypes'
import UrlCreator from '@/components/UrlCreator.vue'

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
</template>
