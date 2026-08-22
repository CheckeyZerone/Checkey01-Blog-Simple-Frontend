<script setup lang="ts">
import { computed } from 'vue'
import type { Article } from '../data/articles'

const props = defineProps<{
  article: Article
  featured?: boolean
  wide?: boolean
}>()

const emit = defineEmits<{
  select: [slug: string]
}>()

// 阅读时间：去掉 Markdown 符号后按 300 字/分钟估算，最少1分钟
const readingTime = computed(() => {
  const chars: number = props.article.content.replace(/[#*>\-\s]/g, '').length
  return Math.max(1, Math.ceil(chars / 300))
})

// 点击整张卡片时，把 slug 发给父组件
function handleClick() {
  emit('select', props.article.slug)
}
</script>

<template>
  <article
    class="card post-card"
    :class="{ 'post-card--featured': featured, 'post-card--wide': wide }"
    @click="handleClick"
  >
    <p class="meta">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        data-lucide="calendar"
        aria-hidden="true"
        class="lucide lucide-calendar"
      >
        <path d="M8 2v4"></path>
        <path d="M16 2v4"></path>
        <rect width="18" height="18" x="3" y="4" rx="2"></rect>
        <path d="M3 10h18"></path>
      </svg>
      {{ article.date }} · 阅读约 {{ readingTime }} 分钟
    </p>
    <h3>
      {{ article.title }}
      <span v-if="featured" class="badge-star" aria-hidden="true">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polygon
            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
          ></polygon>
        </svg>
      </span>
    </h3>
    <p class="excerpt">{{ article.excerpt }}</p>
    <p class="tags">
      <RouterLink
        v-for="tag in article.tags"
        :key="tag"
        :to="`/posts?tag=${tag}`"
        class="tag"
        @click.stop
      >
        {{ tag }}
      </RouterLink>
    </p>
  </article>
</template>

<style scoped>
.post-card {
  padding: 1.15rem 1.2rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}
.post-card--wide {
  grid-column: 1 / -1;
}

.post-card--wide h3 {
  font-size: 1.25rem;
}
.meta {
  color: var(--text-info);
  font-size: 0.78rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-bottom: 0.6rem;
}
.post-card h3 {
  margin: 0 0 0.4rem;
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 0.35rem;
}
.post-card h3 .badge-star {
  color: var(--yellow);
  display: inline-flex;
}
.excerpt {
  margin: 0 0 0.8rem;
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.65;
  flex: 1;
}
.tags {
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
</style>
