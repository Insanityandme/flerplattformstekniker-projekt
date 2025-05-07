<script setup lang="ts">
import type { urlData } from '../types/UrlTypes.ts'

const props = defineProps<{
  links: urlData[]
}>()
</script>

<template>
  <ul>
    <li v-for="(link, index) in props.links" :key="index">
      <a :href="link.shortLink">{{ link.shortLink }} ({{ link.longLink }})</a>
    </li>
  </ul>
</template>

<style scoped></style>
