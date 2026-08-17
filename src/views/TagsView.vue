<script setup lang="ts">
import { computed } from 'vue'
import { articles } from '@/data/articles'

// 汇总所有标签及文章数量，按数量降序排序
const tags = computed(() => {
  const counts = new Map<string, number>()
  for (const article of articles) {
    for (const tag of article.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
})
</script>

<template>
  <main>
    <h1>标签</h1>
    <ul v-if="tags.length" class="tag-list">
      <li v-for="tag in tags" :key="tag.name">
        <RouterLink :to="`/tags/${tag.name}`" class="tag">
          {{ tag.name }}（{{ tag.count }}）
        </RouterLink>
      </li>
    </ul>
    <p v-else>还没有任何标签</p>
    <RouterLink to="/">← 返回首页</RouterLink>
  </main>
</template>

<style scoped>
.tag-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}
.tag {
  display: inline-block;
  color: #2563eb;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 999px;
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
  text-decoration: none;
}
.tag:hover {
  background: #dbeafe;
}
</style>
