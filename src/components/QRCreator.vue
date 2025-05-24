<script setup lang="ts">
import { ref, watch } from 'vue'
import { createQR } from '@/api/QRService'
import { debounce } from '@/util/utilities'
import type { DotType, CornerType } from 'qrcode-with-logos/types/src/core/types'

const emit = defineEmits(['handleCreateQR'])

const dotTypes: DotType[] = [
  'square',
  'dot',
  'dot-small',
  'tile',
  'rounded',
  'diamond',
  'star',
  'fluid',
  'fluid-line',
  'stripe',
  'stripe-row',
  'stripe-column',
]

const cornerTypes: CornerType[] = [
  'square',
  'rounded',
  'circle',
  'rounded-circle',
  'circle-rounded',
  'circle-diamond',
  'circle-star',
]

const url = ref<string>('')
const imgUrl = ref<string>('')
const logoData = ref<string>('')
const qrSrc = ref<string>('/placeholder-qr.png')
const errors = ref<string[]>([])

const dotColor = ref<string>('#000000')
const cornerColor = ref<string>('#000000')
const dotType = ref<DotType>('square')
const cornerType = ref<CornerType>('square')

function changeLogo() {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'

  input.onchange = async () => {
    const file = input.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      logoData.value = result
    }
    reader.onerror = () => {
      errors.value.push('Failed to read image file.')
    }

    reader.readAsDataURL(file)
  }

  input.click()
}

async function generateQR() {
  try {
    const src = await createQR(
      url.value,
      imgUrl.value || undefined,
      logoData.value || undefined,
      false,
      { type: dotType.value, color: dotColor.value },
      { type: cornerType.value, color: cornerColor.value },
    )

    if (src) {
      qrSrc.value = src
    }
  } catch (error) {
    errors.value.push('Failed to generate QR code.')
    console.error(error)
  }
}

async function downloadQR() {
  try {
    await createQR(
      url.value,
      imgUrl.value || undefined,
      logoData.value || undefined,
      true,
      { type: dotType.value, color: dotColor.value },
      { type: cornerType.value, color: cornerColor.value },
    )
  } catch (error) {
    errors.value.push('Failed to download QR code.')
    console.error(error)
  }
}

async function handleSubmit() {
  errors.value = []
  await generateQR()
  emit('handleCreateQR', qrSrc.value)
}

const debouncedGenerateQR = debounce(generateQR, 10)

watch([url, imgUrl, logoData, dotColor, cornerColor, dotType, cornerType], () => {
  debouncedGenerateQR()
})
</script>

<template>
  <form @submit.prevent="handleSubmit" class="qr-form">
    <label>Original URL:</label>
    <input v-model="url" type="url" placeholder="Paste your URL here" />

    <label>Custom image:</label>
    <input v-model="imgUrl" type="text" placeholder="Enter custom image" />

    <button type="submit">Save QR Code</button>
    <br />

    <div class="qr-container">
      <img :src="qrSrc" alt="QR Code" width="280" height="280" />

      <div class="options-container">
        <div class="column">
          <label>Dot Color:</label>
          <input v-model="dotColor" type="color" />

          <label>Dot Type:</label>
          <select v-model="dotType">
            <option v-for="type in dotTypes" :key="type" :value="type">{{ type }}</option>
          </select>

          <button type="button" @click="downloadQR">Download</button>
        </div>

        <div class="column">
          <label>Corner Color:</label>
          <input v-model="cornerColor" type="color" />

          <label>Corner Type:</label>
          <select v-model="cornerType">
            <option v-for="type in cornerTypes" :key="type" :value="type">{{ type }}</option>
          </select>

          <button type="button" @click="changeLogo">Change Logo</button>
        </div>
      </div>
    </div>
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

.qr-container {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 2rem;
  max-width: 100%;
}

.options-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 1rem;
}

.options-container .column {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.5rem;
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

select {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.25rem;
}
</style>
