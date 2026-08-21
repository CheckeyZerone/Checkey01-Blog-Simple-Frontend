<script setup lang="ts">
// 给父组件传参的类型，也导出给 PostsView 复用
export interface TagCount {
  name: string
  count: number
}

defineProps<{
  tags: TagCount[]
  activeTag: string  // ''表示全部文章
}>()

const emit = defineEmits<{
  change: [tag: string]
}>()
</script>

<template>
  <div class="tag-filter" role="group" aria-label="按标签筛选文章">
    <button
      type="button"
      class="tag-filter__item"
      :class="{'tag-filter__item--active': activeTag === ''}"
      @click="emit('change', '')"
    >
      全部({{ tags.reduce((sum, t) => sum + t.count, 0) }})
    </button>
    <button
      v-for="tag in tags"
      :key="tag.name"
      type="button"
      class="tag-filter__item"
      :class="{'tag-filter__item--active': activeTag === tag.name}"
      @click="emit('change', tag.name)"
    >
      {{ tag.name }}({{ tag.count }})
    </button>
  </div>
</template>

<style scoped>
.tag-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}
.tag-filter__item {
  border: 1px solid var(--tag-border);
  border-radius: var(--btn-radius);
  background: var(--light-blue);
  color: var(--main-blue);
  font-weight: 600;
  font-size: 0.85rem;
  padding: 0.3rem 0.85rem;
  cursor: pointer;
  transition: transform 0.16s ease, box-shadow 0.16s ease;
}
.tag-filter__item:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgb(32 128 240 / 0.15);
}
.tag-filter__item--active {
  background: var(--main-blue);
  color: #fff;
  border-color: var(--main-blue);
}
</style>
