<script setup lang="ts">
import QRHistoryCard from '@/components/QRHistoryCard.vue'

const props = defineProps<{
  qrCodes: string[]
}>()
</script>

<template>
  <ul>
    <li v-for="(qr, index) in props.qrCodes" :key="index">
      <QRHistoryCard :id="index" :qrImageSrc="qr" />
    </li>
  </ul>
</template>

<style scoped>
ul {
  padding: 0;
  border: 0;
}
li {
  word-wrap: break-word;
  list-style: none;
  margin-bottom: 1rem;
  box-shadow: 0 0 5px #999;
  border-radius: 16px;
  padding: 0.5rem;
}
</style>
