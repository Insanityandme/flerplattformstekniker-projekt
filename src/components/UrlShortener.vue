<script setup lang="ts">
import { ref } from 'vue'
import { urlData } from '../types/UrlTypes.ts'
import UrlCreator from './UrlCreator.vue'

const urlLinks = ref<urlData>({
  shortLink: '',
  longLink: ''
});

</script>

<template>
  <section class="section-url-shortener">
    <div class="container">
      <UrlCreator :urlLinks="urlLinks" />
    </div>
  </section>
  <section class="section-url-history">
    <div class="container">
      <!-- JOHANNES: Add component in here! -->
    </div>
  </section>

</template>

