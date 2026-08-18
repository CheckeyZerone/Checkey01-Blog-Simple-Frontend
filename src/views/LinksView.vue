<script setup lang="ts">
import { friendLinks } from '@/data/links'
</script>

<template>
  <main>
    <h1>友情链接</h1>
    <p class="intro">欢迎交换友链</p>
    <ul class="link-list">
      <li v-for="friendLink in friendLinks" :key="friendLink.url" class="link-card">
        <a :href="friendLink.url" target="_blank" rel="noopener noreferrer">
          <h2>{{ friendLink.name }}</h2>
          <p>{{ friendLink.description }}</p>
        </a>
      </li>
    </ul>
  </main>
</template>

<style scoped>
.intro {
  color: var(--text-secondary);
}
.link-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.link-card {
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 1rem 1.25rem;
  transition: box-shadow 0.2s;
}
.link-card a {
  text-decoration: none;
  color: inherit;
}
.link-card h2 {
  margin: 0 0 0.25rem;
  font-size: 1.125rem;
  color: var(--text-primary);
}
.link-card p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.875rem;
}
</style>
