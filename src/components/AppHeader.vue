<script setup lang="ts"></script>

<template>
  <header class="site-header">
    <RouterLink to="/" class="logo">Checkey01的小站</RouterLink>
    <nav class="nav">
      <RouterLink to="/" class="nav-link">首页</RouterLink>
      <RouterLink to="/tags" class="nav-link">标签</RouterLink>
      <RouterLink to="/links" class="nav-link">友链</RouterLink>
      <RouterLink to="/about" class="nav-link">关于我</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.site-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.25rem;
  height: 3.5rem;
  border-bottom: 1px solid #e5e7eb;
  background: #fff;
}
.logo {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  text-decoration: none;
}
.nav {
  display: flex;
  gap: 1rem;
}
.nav-link {
  color: #4b5563;
  text-decoration: none;
  font-size: 0.875rem;
}
.nav-link:hover {
  color: #2563eb;
}
@media (max-width: 640px) {
  .site-header {
    padding: 0 1rem;
  }
  .logo {
    font-size: 1rem;
  }
}
</style>
