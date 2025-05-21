<script setup lang="ts">
import { ref } from 'vue'
import type { urlData } from '@/types/UrlTypes'

const props = defineProps<{
  id: number
  linkData: urlData
}>()

const copied = ref(false)

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
  copied.value = true
  setTimeout(() => (copied.value = false), 1500)
}
</script>

<template>
  <div class="card-root">
    <div class="card-top">
      <div class="tooltip-wrapper">
        <button @mousedown="copyToClipboard(props.linkData.shortLink)">
          {{ copied ? 'Copied!' : props.linkData.shortLink }}
        </button>
        <span class="tooltip">{{ copied ? 'Copied!' : 'Copy to clipboard' }}</span>
      </div>
    </div>
    <div class="card-bottom">
      <a :href="props.linkData.longLink" target="_blank">{{ props.linkData.longLink }}</a>
    </div>
  </div>
</template>

<style scoped>
.card-root {
  display: flex;
  flex-direction: column;
}

.card-top {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

/*
.card-top>img {
  width: 100%;
  max-width: 20%;
  height: auto;
}
*/

.card-bottom {
  display: flex;
  justify-content: center;
  padding: 0.2rem;
  word-wrap: normal;
}

.card-bottom > a {
  text-wrap-mode: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.tooltip-wrapper > button {
  cursor: pointer;
  flex-grow: 1;
  max-width: 100%;
  background-color: lightgreen;
  border-radius: 16px;
  padding: 0.5rem;
}

.tooltip-wrapper {
  position: relative;
  display: flex;
  width: 100%;
}

.tooltip-wrapper .tooltip {
  visibility: hidden;
  background-color: #444;
  color: #fff;
  font-size: 0.7rem;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  position: absolute;
  bottom: 110%;
  /* Slightly above the button */
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  z-index: 1;
}

.tooltip-wrapper:hover .tooltip {
  visibility: visible;
  opacity: 1;
}
</style>
