<script setup lang="ts">
import type { Album } from '@/data/albums'
import { computed } from 'vue'

const props = defineProps<{
  album: Album
  index?: number
}>()

// 相册占位符
const gradientClass = computed(() => {
  const gradients = ['g1', 'g2', 'g4']
  return gradients[(props.index ?? 0) % gradients.length]
})
</script>

<template>
  <figure class="album-card" :class="`album-card--${gradientClass}`">
    <figcaption class="album-card__caption">
      <b>{{ album.title }}</b>
      <small>{{ album.photoCount }} 张照片</small>
    </figcaption>
  </figure>
</template>

<style scoped>
.album-card {
  position: relative;
  min-height: 12.5rem;
  margin: 0;
  border-radius: var(--radius-card);
  border: 1px solid var(--border);
  overflow: hidden;
}
.album-card--g1 {
  background: linear-gradient(135deg, #2080f0, #6ee1fc);
}
.album-card--g2 {
  background: linear-gradient(135deg, #263473, #4a5fbf);
}
.album-card--g4 {
  background: linear-gradient(135deg, #ffc53d, #ffdf8e);
}
.album-card__caption {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.7rem 0.85rem 0.6rem;
  background: linear-gradient(rgb(38 52 115 / 0) 0%, rgb(38 52 115 / 0.8) 100%);
  color: #fff;
  font-size: 0.8rem;
}
.album-card__caption b {
  display: block;
  font-weight: 600;
}
.album-card__caption small {
  display: block;
  font-size: 0.7rem;
  opacity: 0.8;
}
@media (max-width: 736px) {
  .album-card {
    min-height: 13rem;
  }
}
</style>
