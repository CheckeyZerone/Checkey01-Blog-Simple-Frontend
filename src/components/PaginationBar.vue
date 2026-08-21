<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  currentPage: number
  totalPages: number
}>()

const emit = defineEmits<{
  'page-change': [page: number]
}>()

function go(page: number) {
  if (page < 1 || page > props.totalPages || page === props.currentPage) {
    return
  }
  emit('page-change', page)
}

// 页码过多时折叠显示
const pages = computed<(number | '...')[]>(() => {
  const total = props.totalPages
  const cur = props.currentPage
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }
  const result: (number | '...')[] = []
  const push = (n: number | '...') => {
    if (result[result.length-1] !== n) {
      result.push(n)
    }
  }
  push(1)
  if (cur > 3) {
    push('...')
  }
  for (let p = Math.max(2, cur - 1); p <= Math.min(total - 1, cur + 1); p++) {
    push(p)
  }
  if (cur < total - 2) {
    push('...')
  }
  push(total)
  return result
})
</script>

<template>
  <nav v-if="totalPages > 0" class="pagination" aria-label="分页">
    <button
      type="button"
      class="pagination__btn"
      :disabled="currentPage <= 1"
      @click="go(currentPage - 1)"
    >
      上一页
    </button>
    <template
      v-for="page in pages"
      :key="page === '...' ? 'e' + currentPage : 'p' + page"
    >
      <span v-if="page === '...'" class="pagination__ellipsis">...</span>
      <button
        v-else
        type="button"
        class="pagination__page"
        :class="{ 'pagination__page--active': page === currentPage }"
        @click="go(page)"
      >
        {{ page }}
      </button>
    </template>

    <button
      type="button"
      class="pagination__btn"
      :disabled="currentPage >= totalPages"
      @click="go(currentPage + 1)"
    >
      下一页
    </button>
  </nav>
</template>

