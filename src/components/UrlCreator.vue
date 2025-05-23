<script setup lang="ts">
import { ref } from 'vue'
import { createShortUrl } from '@/api/UrlService.ts'
import type { urlResponse, urlError } from '@/types/UrlTypes'

const emit = defineEmits(['handleURLShorten'])

const url = ref('')
const alias = ref('')
const errors = ref<string[] | undefined>()

async function handleSubmit() {
  errors.value = []
  const response: urlResponse = await createShortUrl(url.value, alias.value)
  console.log(response)

  if (!response.ok) {
    const error: urlError | undefined = response.error
    console.error('LOG: ' + error?.code)
    console.error('LOG: ' + error?.errors)
    errors.value = error?.errors
    return
  }

  if (response.data) {
    emit('handleURLShorten', response.data)
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="url-form">
    <label>Original URL:</label>
    <input v-model="url" type="url" placeholder="Paste your URL here" required />

    <label>Custom URL:</label>
    <input v-model="alias" type="text" placeholder="Enter alias" />

    <button type="submit">Generate Short URL</button>
  </form>

  <p v-for="(error, index) in errors" :key="index">
    {{ error }}
  </p>
</template>

<style scoped>
.url-form {
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
}

.url-form > h4 {
  margin: 0 0 1rem 0;
}

.url-form > input {
  margin: 0 0 1rem 0;
  width: 100%;
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
  width: 100%;
}
</style>
