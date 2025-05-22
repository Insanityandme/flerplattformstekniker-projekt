<script setup lang="ts">
import { ref } from 'vue'
import { createQR } from '../api/QRService'

const emit = defineEmits(['handleCreateQR'])

const url = ref('')
const image = ref('')
const errors = ref<string[] | undefined>()

async function handleSubmit() {
  errors.value = []
  // For single QR code
  const qrImg = await createQR(url.value, image.value)

  if (qrImg) {
    // emit a base64 representation of the image for storage
    emit('handleCreateQR', qrImg)
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="qr-form">
    <label>Original URL:</label>
    <input v-model="url" type="url" placeholder="Paste your URL here" required />

    <label>Custom image:</label>
    <input v-model="image" type="text" placeholder="Enter custom image" />

    <button type="submit">Generate QR Code</button>
  </form>

  <p v-for="(error, index) in errors" :key="index">
    {{ error }}
  </p>
</template>

<style scoped>
.qr-form {
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
}

.qr-form > h4 {
  margin: 0 0 1rem 0;
}

.qr-form > input {
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
