<script setup lang="ts">
import PostCard from '@/components/PostCard.vue'
import { articles } from '@/data/articles'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const tag = computed(() => String(route.params.tag ?? ''))

const tagArticles = computed(() => articles.filter((article) => article.tags.includes(tag.value)))

function goToPost(slug: string) {
  router.push(`/post/${slug}`)
}
</script>

<template>
  <main>
    <h1>标签：{{ tag }}</h1>
    <p v-if="tagArticles.length" class="meta">{{ tagArticles.length }} 篇文章</p>
    <div v-if="tagArticles.length" class="post-list">
      <PostCard
        v-for="article in tagArticles"
        :key="article.slug"
        :article="article"
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
.meta {
  color: #6b7280;
}
</style>
