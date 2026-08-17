<script setup lang="ts">
import { articles } from '@/data/articles'
import { renderMarkdown } from '@/utils/markdown'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const article = computed(() => {
  return articles.find((item) => {
    return item.slug === route.params.slug
  })
})

const html = computed(() => {
  return article.value ? renderMarkdown(article.value.content) : ''
})
</script>

<template>
  <main>
    <template v-if="article">
      <article>
        <h1>{{ article.title }}</h1>
        <p class="meta">{{ article.date }}</p>
        <p class="tags">
          <RouterLink v-for="tag in article.tags" :key="tag" :to="`/tags/${tag}`" class="tag">
            {{ tag }}
          </RouterLink>
        </p>
        <div class="content" v-html="html"></div>
      </article>
    </template>
    <template v-else>
      <h1>文章不存在</h1>
      <p>未找到文章《{{ route.params.slug }}》</p>
      <RouterLink to="/">← 返回首页</RouterLink>
    </template>
  </main>
</template>

<style scoped>
.content :deep(pre) {
  background: #f6f8fa;
  padding: 1rem;
  overflow-x: auto;
  border-radius: 6px;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin: 0 0 1rem;
}
.tag {
  font-size: 0.75rem;
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
