<script setup lang="ts">
import { ref, Ref } from 'vue'
import { createShortUrl } from '../api/UrlService.ts'
import { urlResponse, urlData, urlError } from '../types/UrlTypes.ts'

const props = defineProps<{
  urlLinks: Ref<urlData>
}>()

const url = ref('');

async function handleSubmit() {
  const response : urlResponse = await createShortUrl(url.value);

  if (!response.ok) {
    const error : urlError = response.error;
    console.log("LOG: " + error.code);
    console.log("LOG: " + error.errors);
  }

  console.log(props.urlLinks);

  props.urlLinks.value.shortLink = response.data.shortLink;
  props.urlLinks.value.longLink = url.value;
}
</script>

<template>
 <form @submit.prevent="handleSubmit" class="url-form">
    <h2>Shorten a URL</h2>

    <label>
      Original URL:
      <input
        v-model="url"
        type="url"
        placeholder="Paste your URL here"
        required
      />
    </label>

    <button type="submit">Generate Short URL</button>

    <p v-if="props.urlLinks.shortLink">{{ props.urlLinks.shortLink }}</p>
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
