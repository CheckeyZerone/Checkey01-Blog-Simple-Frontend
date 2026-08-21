<script setup lang="ts">
import { useRouter } from 'vue-router'
import { articles } from '../data/articles'
import { computed } from 'vue'
import PostCard from '@/components/PostCard.vue'
import HomeHero from '@/components/HomeHero.vue'

const router = useRouter()

// 按照日期排序
const sortedArticles = computed(() =>
[...articles].sort(
  (a, b) =>
    Number(b.featured) - Number(a.featured) ||
    b.date.localeCompare(a.date),
  ),
)


function goToPost(slug: string) {
  router.push(`/posts/${slug}`)
}
</script>

<template>
  <main>
    <HomeHero />
    <div class="post-list">
      <PostCard
        v-for="article in sortedArticles"
        :key="article.slug"
        :article="article"
        :featured="article.featured"
        @select="goToPost"
      />
    </div>
  </main>
</template>

<style scoped>
.post-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
