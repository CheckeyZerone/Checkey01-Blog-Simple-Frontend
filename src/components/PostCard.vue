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
    <h2>{{ article.title }}</h2>
    <p class="meta">{{ article.date }} · 阅读约 {{ readingTime }} 分钟</p>
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
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem 1.25rem;
  cursor: pointer;
  transition: box-shadow 0.2s;
}
.post-card:hover {
  box-shadow: 0 4px 12px rgb(0 0 0/ 0.08);
}
.post-card h2 {
  margin: 0 0 0.25rem;
  font-size: 1.25rem;
}
.meta {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0 0 0.5rem;
}
.excerpt {
  margin: 0;
}
.tags {
  margin: 0.5rem 0 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
}
.tag {
  margin: 0.75rem;
  color: #2563eb;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 999px;
  padding: 0.125rem 0.625rem;
  text-decoration: none;
}
.tag:hover {
  background: #dbeafe;
}
</style>
