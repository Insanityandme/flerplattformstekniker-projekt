<script setup lang="ts">
import type { urlData } from '../types/UrlTypes.ts'

const props = defineProps<{
  links: urlData[]
}>()
</script>

<template>
  <div class="container">
    <h3>My shortened links</h3>
    <ul>
      <li v-for="(link, index) in props.links" :key="index">
        <a :href="link.shortLink">{{ link.shortLink }} ({{ link.longLink }})</a>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
