<script setup lang="ts">
import type { urlData } from '@/types/UrlTypes'
import LinkHistoryCard from '@/components/LinkHistoryCard.vue'

const props = defineProps<{
  links: urlData[]
}>()
</script>

<template>
  <ul>
    <li v-for="(link, index) in props.links" :key="index">
      <LinkHistoryCard :id="index" :linkData="link" />
    </li>
  </ul>
</template>

<style scoped>
ul {
  padding: 0;
  border: 0;
}
li {
  word-wrap: break-word;
  list-style: none;
  margin-bottom: 1rem;
  box-shadow: 0 0 5px #999;
  border-radius: 16px;
  padding: 0.5rem;
}
</style>
