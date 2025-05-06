<script setup lang="ts">
const url = ref('');
const emit = defineEmits(['generatedUrlEvent']);

function handleSubmit() {
  shortenedUrl.value = `short.ly/${url.value.slice(-6)}`;

  emit('generatedUrlEvent', {
    link: url.value,
    shortLink: shortenedUrl.value,
  });
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

    <!-- TODO: Missing this for now -->
    <p v-if="shortenedUrl">{{ shortenedUrl }}</p>
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
