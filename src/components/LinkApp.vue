<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import SavedLinks from '@/components/SavedLinks.vue'
import UrlShortener from '@/components/UrlShortener.vue'
import QRCreator from '@/components/QRCreator.vue'
import SavedQRCodes from '@/components/SavedQRCodes.vue'
import ExtensionInfo from '@/components/ExtensionInfo.vue'
import type { urlData } from '@/types/UrlTypes'
import { updateExtension } from '@/util/utilities'

enum AppView {
  None,
  URLShortener,
  QRGenerator,
  Extension,
}
const selectedView = ref<AppView>(AppView.URLShortener)
const savedLinks = ref<urlData[]>([])
const savedQRCodes = ref<string[]>([])

onMounted(() => {
  const localStorageLinks = localStorage.getItem('savedLinks')
  if (localStorageLinks) {
    const links = JSON.parse(localStorageLinks)
    savedLinks.value = links
  }

  const localStorageQRCodes = localStorage.getItem('savedQRCodes')
  if (localStorageQRCodes) {
    const qrCodes = JSON.parse(localStorageQRCodes)
    savedQRCodes.value = qrCodes
  }
})

watch(
  savedLinks,
  (newLinks) => {
    updateExtension(newLinks)
    localStorage.setItem('savedLinks', JSON.stringify(newLinks))
  },
  { deep: true },
)

watch(
  savedQRCodes,
  (newQRCodes) => {
    localStorage.setItem('savedQRCodes', JSON.stringify(newQRCodes))
  },
  { deep: true },
)

const handleSetView = (view: AppView) => {
  selectedView.value = view
}

const handleCreateLink = (link: urlData) => {
  savedLinks.value.unshift(link)
}

const handleCreateQR = (base64ImageSrc: string) => {
  savedQRCodes.value.unshift(base64ImageSrc)
}

const handleDeleteLink = (index: number) => {
  savedLinks.value.splice(index, 1)
}
</script>

<template>
  <div class="container">
    <div class="view-switch-buttons">
      <button
        :disabled="selectedView === AppView.URLShortener"
        @mousedown="handleSetView(AppView.URLShortener)"
      >
        <img
          src="@/assets/link.svg"
          alt="Link icon"
          aria-label="Switch view to url shortener"
          draggable="false"
        />
      </button>
      <button
        :disabled="selectedView === AppView.QRGenerator"
        @mousedown="handleSetView(AppView.QRGenerator)"
      >
        <img
          src="@/assets/qr.svg"
          alt="QR code icon"
          aria-label="Switch view to qr code
          generator"
          draggable="false"
        />
      </button>
      <button
        :disabled="selectedView === AppView.Extension"
        @mousedown="handleSetView(AppView.Extension)"
      >
        <img
          src="@/assets/extension.svg"
          alt="Extension icon"
          aria-label="Switch view to extension"
          draggable="false"
        />
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
      <SavedLinks :links="savedLinks" :handle-delete="handleDeleteLink" />
    </section>

    <!-- QR Creator -->
    <section v-else-if="selectedView === AppView.QRGenerator" class="section-qr-generator">
      <h5>QR Generator</h5>
      <QRCreator @handleCreateQR="handleCreateQR" />
      <SavedQRCodes :qrCodes="savedQRCodes" />
    </section>

    <!-- Extension -->
    <section v-else-if="selectedView === AppView.Extension">
      <h5>Extension Installation Guide</h5>
      <ExtensionInfo />
    </section>
  </div>
</template>

<style scoped>
h4,
p {
  text-align: center;
}
h5 {
  text-align: center;
}

.view-switch-buttons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}
.view-switch-buttons > button {
  border-radius: 8px;
}
.view-switch-buttons > button:disabled {
  background-color: lightgreen;
}
.view-switch-buttons > button > img {
  width: 32px;
  max-width: 100%;
  height: auto;
  cursor: pointer;
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
