<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  id: number
  qrImageSrc: string
}>()

const copied = ref(false)

const copyToClipboard = async (dataUrl: string) => {
  try {
    const res = await fetch(dataUrl)
    const blob = await res.blob()

    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob,
      }),
    ])

    copied.value = true
    setTimeout(() => (copied.value = false), 1500)
  } catch (err) {
    console.error('Failed to copy image:', err)
  }
}
</script>

<template>
  <div class="card-root">
    <div class="card-top">
      <div class="tooltip-wrapper">
        <img
          :src="props.qrImageSrc"
          alt="QR Code"
          class="qr-image"
          @click="copyToClipboard(props.qrImageSrc)"
          tabindex="0"
          role="button"
          aria-label="Copy QR code to clipboard"
        />
        <span class="tooltip">{{ copied ? 'Copied!' : 'Click to copy QR code' }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-root {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-top {
  display: flex;
  justify-content: center;
  width: 100%;
}

.tooltip-wrapper {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.qr-image {
  max-width: 200px;
  border-radius: 16px;
  user-select: none;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
}

.tooltip-wrapper .tooltip {
  visibility: hidden;
  background-color: #444;
  color: #fff;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  position: absolute;
  bottom: 110%; /* above the image */
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  z-index: 10;
  pointer-events: none;
}

.tooltip-wrapper:hover .tooltip,
.tooltip-wrapper:focus-within .tooltip {
  visibility: visible;
  opacity: 1;
}
</style>
