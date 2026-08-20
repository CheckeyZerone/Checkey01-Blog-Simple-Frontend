<script setup lang="ts">
import { computed } from 'vue'
import type { Article } from '../data/articles'

const props = defineProps<{
  article: Article
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
  <article class="post-card" @click="handleClick">
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
    <h3>{{ article.title }}</h3>
    <p class="excerpt">{{ article.excerpt }}</p>
    <p class="tags">
      <RouterLink
        v-for="tag in article.tags"
        :key="tag"
        :to="`/tags/${tag}`"
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
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 1.15rem 1.2rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;

  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease,
    border-color 0.22s ease;
  will-change: transform;
}
.post-card-featured {
  grid-column: 1 / -1;
}
.post-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 14px 28px rgb(32 128 240 / 0.14);
  border-color: var(--border);
}
.post-card:active {
  transform: translateY(-1px) scale(0.98);
  box-shadow: 0 6px 14px rgb(32 128 240 / 0.1);
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
  color: var(--text-main);
  display: flex;
  align-items: center;
  gap: 0.35rem;
}
.post-card-featured h3 {
  font-size: 1.25rem;
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
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.tag {
  font-size: 0.75rem;
  color: var(--main-blue);
  background: var(--light-blue);
  border: 1px solid #bfd9fb;
  border-radius: 999px;
  padding: 0.12rem 0.6rem;
  text-decoration: none;
}
.tag:hover {
  background: #dbeafe;
}
</style>
