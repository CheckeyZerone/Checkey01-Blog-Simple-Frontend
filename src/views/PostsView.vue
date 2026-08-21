<script setup lang="ts">
import PaginationBar from '@/components/PaginationBar.vue';
import PostCard from '@/components/PostCard.vue';
import TagFilterBar from '@/components/TagFilterBar.vue';
import type { TagCount } from '@/components/TagFilterBar.vue';
import { articles } from '@/data/articles';
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()

const PAGE_SIZE = 6

// 当前激活的标签，来自URL的 ?tag=xxx (空串表示「全部」)
const activeTag = computed(() => {
  const raw = route.query.tag
  return typeof raw === 'string' ? raw : ''
})

// 汇总所有标签及数量，按数量排序
const tags = computed<TagCount[]>(() => {
  const counts = new Map<string, number>()
  for (const article of articles) {
    for (const tag of article.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
  }
  return [...counts.entries()]
    .map(([name, count]) => ({name, count}))
    .sort((a, b) => b.count - a.count)
})

// 按标签过滤 + 按日期倒序排序
const filteredArticles = computed(() => {
  const list = activeTag.value
    ? articles.filter((article) => article.tags.includes(activeTag.value))
    : [...articles]
    return list.sort((a, b) =>
    Number(b.featured) - Number(a.featured) ||
    b.date.localeCompare(a.date)
  )
})

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredArticles.value.length / PAGE_SIZE)),
)

// 当前页码：筛选项变化时回到第一页
const currentPage = ref(1)
watch(activeTag, () => {
  currentPage.value = 1
})

// 当前页切出来的文章
const pageArticles = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return filteredArticles.value.slice(start, start + PAGE_SIZE)
})

// 点筛选条：该 URL 的 query，由 activeTag 响应式驱动重新过滤
function changeTag(tag: string) {
  router.push({ path: '/posts', query: tag ? {tag} : {} })
}

function goToPost(slug: string) {
  router.push(`/posts/${slug}`)
}
</script>

<template>
  <main class="container">
    <h1 class="page-title">文章</h1>

    <TagFilterBar :tags="tags" :active-tag="activeTag" @change="changeTag"/>

    <div v-if="pageArticles.length" class="post-grid">
      <PostCard
        v-for="(article, index) in pageArticles"
        :key="article.slug"
        :article="article"
        :featured="article.featured && currentPage === 1 && index === 0"
        @select="goToPost"
      />
    </div>
    <div v-else class="empty">还没有相关文章</div>
    <PaginationBar
      :current-page="currentPage"
      :total-pages="totalPages"
      @page-change="currentPage = $event"
    />
  </main>
</template>

<style scoped>
.page-title {
  margin: 1rem 0 1.5rem;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--text-primary);
}

.post-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.2rem;
}

.empty {
  padding: 3rem 0;
  text-align: center;
  color: var(--text-info);
}

@media (max-width: 736px) {
  .post-grid {
    grid-template-columns: 1fr;
  }
}
</style>
