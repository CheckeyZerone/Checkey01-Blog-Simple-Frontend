<script setup lang="ts">
import { useRouter } from 'vue-router';
import { articles } from '../data/articles'
import { computed } from 'vue';
import PostCard from '@/components/PostCard.vue';

const router = useRouter();

// 按照日期排序
const sortedArticles = computed(() =>
[...articles].sort((a, b) => b.date.localeCompare(a.date)),
)

function goToPost(slug: string) {
  router.push(`/post/${slug}`);
}
</script>

<template>
  <main>
    <h1>我的博客</h1>
    <div class="post-list">
      <PostCard
        v-for="article in sortedArticles"
        :key="article.slug"
        :article="article"
        @select="goToPost"
      />
    </div>

    <!-- <ul>
      <li v-for="article in articles" :key="article.slug">
        <RouterLink :to="`/post/${article.slug}`">
          <h2>{{ article.title }}</h2>
        </RouterLink>
        <p>{{ article.date }}</p>
        <p>{{ article.excerpt }}</p>
      </li>
    </ul> -->
  </main>
</template>

<style scoped>
.post-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
