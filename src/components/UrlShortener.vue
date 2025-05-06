<script setup lang="ts">
import { ref } from 'vue'
import UrlCreator from './UrlCreator.vue'

const url = ref('')

function handleGeneratedUrl(payload) {
  url.value = payload
}
</script>

<template>
  <section class="section-url-shortener">
    <div class="container">
      <UrlCreator @generatedUrl="handleGeneratedUrl" />
    </div>
  </section>
  <section class="section-url-history">
    <div class="container">
      <!-- JOHANNES: Add component in here! -->
    </div>
  </section>

</template>

