<script setup lang="ts">
import { articles } from '../data/articles'
</script>

<template>
  <main>
    <h1>我的博客</h1>
    <ul>
      <li v-for="article in articles" :key="article.slug">
        <RouterLink :to="`/post/${article.slug}`">
          <h2>{{ article.title }}</h2>
        </RouterLink>
        <p>{{ article.date }}</p>
        <p>{{ article.excerpt }}</p>
      </li>
    </ul>
  </main>
</template>
