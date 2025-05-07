<script setup lang="ts">
type Link = {
  link: string
  shortLink: string
}

const props = defineProps<{
  links: Link[]
}>()
</script>

<template>
  <div class="container">
    <h3>My shortened links</h3>
    <ul>
      <li v-for="(link, index) in props.links" :key="index">
        <a :href="link.shortLink">{{ link.shortLink }} ({{ link.link }})</a>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
