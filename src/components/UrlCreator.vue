<script setup lang="ts">
import { ref } from 'vue'
import { createShortUrl } from '../api/UrlService.ts'
import type { urlResponse, urlError } from '../types/UrlTypes.ts'

const emit = defineEmits(['handleURLShorten'])

const url = ref('')

async function handleSubmit() {
  const response: urlResponse = await createShortUrl(url.value)
  console.log(response)

  if (!response.ok) {
    const error: urlError | undefined = response.error
    console.error('LOG: ' + error?.code)
    console.error('LOG: ' + error?.errors)
    return
  }

  if (!response.data) {
    return
  }
  emit('handleURLShorten', response.data)
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="url-form">
    <h2>Shorten a URL</h2>

    <label>
      Original URL:
      <input v-model="url" type="url" placeholder="Paste your URL here" required />
    </label>

    <button type="submit">Generate Short URL</button>
  </form>
</template>

<style scoped>
h3 {
  font-size: 1.2rem;
}

h1 {
  text-align: center;
}

.url-form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 400px;
}

input {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.25rem;
  box-sizing: border-box;
}

button {
  margin-top: 1rem;
  padding: 0.5rem;
  cursor: pointer;
}
</style>
