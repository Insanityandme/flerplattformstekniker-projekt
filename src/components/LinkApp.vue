<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SavedLinks from '@/components/SavedLinks.vue'
import UrlShortener from '@/components/UrlShortener.vue'
import QRCreator from '@/components/QRCreator.vue'
import SavedQRCodes from '@/components/SavedQRCodes.vue'
import type { urlData } from '@/types/UrlTypes.ts'

const savedLinks = ref<urlData[]>([])
const savedQRCodes = ref<string[]>([])

const handleCreateLink = (link: urlData) => {
  savedLinks.value.unshift(link)
  localStorage.setItem('savedLinks', JSON.stringify(savedLinks.value))
}

const handleCreateQR = (base64ImageSrc: string) => {
  savedQRCodes.value.unshift(base64ImageSrc)
  localStorage.setItem('savedQRCodes', JSON.stringify(savedQRCodes.value))
}

onMounted(() => {
  const saved = localStorage.getItem('savedLinks')
  if (!saved) return

  const links = JSON.parse(saved)
  savedLinks.value = links

  const savedQRCodesRaw = localStorage.getItem('savedQRCodes')
  if (!savedQRCodesRaw) return

  const qrCodes = JSON.parse(savedQRCodesRaw)
  savedQRCodes.value = qrCodes
})
</script>

<template>
  <div class="container">
    <h4>Url Toolbox</h4>
    <p>Shorten long URLs or generate QR codes!</p>

    <div class="section-top-row">
      <section class="section-url-shortener">
        <UrlShortener @handleCreateLink="handleCreateLink" />
        <SavedLinks :links="savedLinks" />
      </section>

      <section class="section-qr-generator">
        <QRCreator @handleCreateQR="handleCreateQR" />
        <SavedQRCodes :qrCodes="savedQRCodes" />
      </section>
    </div>
  </div>
</template>

<style scoped>
h4,
p {
  text-align: center;
}

.section-url-shortener {
  display: flex;
  flex-direction: column;
}

.section-top-row {
  display: flex;
  justify-content: center;
  max-width: 100%;
  gap: 2rem;
}
</style>
