<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SavedLinks from '@/components/SavedLinks.vue'
import UrlShortener from '@/components/UrlShortener.vue'
import QRCreator from '@/components/QRCreator.vue'
import SavedQRCodes from '@/components/SavedQRCodes.vue'
import type { urlData } from '@/types/UrlTypes.ts'

const savedLinks = ref<urlData[]>([])
const savedQRCodes = ref<string[]>([])

enum AppView {
  None,
  URLShortener,
  QRGenerator,
  TODO,
}
const selectedView = ref<AppView>(AppView.URLShortener)

const handleSetView = (view: AppView) => {
  selectedView.value = view
}

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
    <div class="view-switch-buttons">
      <button
        :disabled="selectedView === AppView.URLShortener"
        @mousedown="handleSetView(AppView.URLShortener)"
      >
        URL Shortener
      </button>
      <button
        :disabled="selectedView === AppView.QRGenerator"
        @mousedown="handleSetView(AppView.QRGenerator)"
      >
        QR Code Creator
      </button>
      <button :disabled="selectedView === AppView.TODO" @mousedown="handleSetView(AppView.TODO)">
        TODO
      </button>
    </div>

    <!-- Welcome menu -->
    <div v-if="selectedView === AppView.None">
      <h4>Url Toolbox</h4>
      <p>Shorten long URLs or generate QR codes!</p>
    </div>

    <!-- URL Shortener -->
    <section v-else-if="selectedView === AppView.URLShortener" class="section-url-shortener">
      <h5>Url Shortener</h5>
      <UrlShortener @handleCreateLink="handleCreateLink" />
      <SavedLinks :links="savedLinks" />
    </section>

    <!-- QR Creator -->
    <section v-else-if="selectedView === AppView.QRGenerator" class="section-qr-generator">
      <h5>QR Generator</h5>
      <QRCreator @handleCreateQR="handleCreateQR" />
      <SavedQRCodes :qrCodes="savedQRCodes" />
    </section>

    <!-- TODO -->
    <section v-else-if="selectedView === AppView.TODO">
      <h5>TODO</h5>
    </section>
  </div>
</template>

<style scoped>
h4,
p {
  text-align: center;
}

.view-switch-buttons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}
.view-switch-buttons > button {
  flex-grow: 1;
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
