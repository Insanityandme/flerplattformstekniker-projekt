<script setup lang="ts">
import type { urlData } from '@/types/UrlTypes'

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
}

const props = defineProps<{
  id: number
  linkData: urlData
}>()
</script>

<template>
  <div class="card-root">
    <div class="card-top">
      <button v-on:mousedown="copyToClipboard(props.linkData.shortLink)">
        {{ props.linkData.shortLink }}
      </button>
      <img src="../assets/QRCode.svg" />
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
  flex-direction: row;
  align-items: center;
  justify-items: center;
}
.card-top > img {
  width: 100%;
  flex-basis: 20%;
}
.card-top > button {
  flex-basis: 80%;
  background-color: lightgreen;
  border-radius: 16px;
  padding: 0.5rem;
  margin: 0.2rem;
}

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
</style>
