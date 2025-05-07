<script setup lang="ts">
import { ref } from 'vue'
import type { urlData } from '../types/UrlTypes.ts'
import UrlCreator from './UrlCreator.vue'

const urlLinks = ref<urlData>({
  shortLink: '',
  longLink: '',
})

const handleURLShorten = (urlData: urlData) => {
  urlLinks.value = urlData
}
</script>

<template>
  <section class="section-url-shortener">
    <div class="container">
      <UrlCreator @handleURLShorten="handleURLShorten" />

      <p v-if="urlLinks && urlLinks.longLink && urlLinks.shortLink">
        {{ urlLinks.shortLink }} - {{ urlLinks.longLink }}
      </p>
    </div>
  </section>
  <section class="section-url-history">
    <div class="container">
      <!-- JOHANNES: Add component in here! -->
    </div>
  </section>
</template>
