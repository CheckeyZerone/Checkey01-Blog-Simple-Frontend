<script setup lang="ts">
import AppFooter from './components/AppFooter.vue'
import AppHeader from './components/AppHeader.vue'
</script>

<template>
  <div class="layout">
    <AppHeader />
    <main class="content">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.content {
  flex: 1;
  width: 100%;
  max-width: 72rem;
  margin: 0 auto;
  padding: 1.5rem 1.25rem;
}
@media (max-width: 640px) {
  .content {
    padding: 2rem 1.5rem 2.75rem;
  }
}
</style>
