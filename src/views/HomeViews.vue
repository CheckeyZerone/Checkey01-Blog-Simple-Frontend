<script setup lang="ts">
import { useRouter } from 'vue-router'
import { articles } from '../data/articles'
import { computed } from 'vue'
import PostCard from '@/components/PostCard.vue'
import HomeHero from '@/components/HomeHero.vue'
import AlbumCard from '@/components/AlbumCard.vue'
import { albums } from '@/data/albums'
import { friendLinks } from '@/data/links'

const router = useRouter()

// 按照日期排序
const sortedArticles = computed(() =>
  [...articles]
    .sort((a, b) => Number(b.featured) - Number(a.featured) || b.date.localeCompare(a.date))
    .slice(0, 3),
)

function goToPost(slug: string) {
  router.push(`/posts/${slug}`)
}
// 首页只展示精选友链（最多 3 条）
const featuredFriendLinks = computed(() => friendLinks.filter((f) => f.featured).slice(0, 3))
</script>

<template>
  <main>
    <HomeHero />
    <!-- 最新文章区域 -->
    <section class="articles-section">
      <div class="section-head">
        <h2>最新文章</h2>
        <RouterLink to="/posts" class="section-more">查看全部 →</RouterLink>
      </div>
      <div class="post-grid">
        <PostCard
          v-for="(article, index) in sortedArticles"
          :key="article.slug"
          :article="article"
          :featured="article.featured && index === 0"
          @select="goToPost"
        />
      </div>
    </section>
    <!-- 最新相册区域 -->
    <section class="albums-section">
      <div class="section-head">
        <h2>最新相册</h2>
        <!-- TODO: 等到相册列表和相册页面开始制作时修改 -->
        <span class="section-more section-more--placeholder">进入相册 →</span>
      </div>
      <div class="album-grid">
        <AlbumCard
          v-for="(album, index) in albums"
          :key="album.slug"
          :album="album"
          :index="index"
        />
      </div>
    </section>
    <!-- 友链区域 -->
    <RouterLink to="/links" class="friend-strip">
      <span class="friend-strip__head">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
        </svg>
        友情链接
      </span>
      <span class="friend-strip__list">
        <span
          v-for="(friend, index) in featuredFriendLinks"
          :key="index"
          class="friend-strip__item"
        >
          <b>{{ friend.name }}</b>
          <small>{{ friend.description }}</small>
        </span>
      </span>
    </RouterLink>
  </main>
</template>

<style scoped>
.section-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  margin: 0 0 1rem;
}
.section-head h2 {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.55rem;
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-primary);
}
.section-head h2::before {
  content: '';
  width: 0.35rem;
  height: 1.1rem;
  border-radius: 999px;
  background: var(--main-blue);
}
.section-more {
  color: var(--main-blue);
  font-size: 0.85rem;
  text-decoration: none;
  white-space: nowrap;
}
.section-more--placeholder {
  cursor: default;
}

.post-grid,
.album-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.1rem;
}

.albums-section {
  margin-top: 2.75rem;
}

.friend-strip {
  display: block;
  margin-top: 2.25rem;
  padding: 1.1rem 1.3rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  background: #fff;
  color: inherit;
  text-decoration: none;
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease;
}
.friend-strip:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-card-hover);
}
.friend-strip__head {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin: 0 0 0.75rem;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-primary);
}
.friend-strip__head svg {
  color: var(--yellow);
}
.friend-strip__list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}
.friend-strip__item {
  flex: 1 1 200px;
  padding: 0.7rem 0.9rem;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: #f7f9fc;
}
.friend-strip__item b {
  display: block;
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--text-primary);
}
.friend-strip__item small {
  color: var(--text-info);
  font-size: 0.78rem;
}

@media (max-width: 1024px) {
  .post-grid,
  .album-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 736px) {
  .post-grid,
  .album-grid {
    grid-template-columns: 1fr;
  }
  .albums-section {
    margin-top: 1.75rem;
  }
  .friend-strip__list {
    flex-direction: column;
  }
}

@media (prefers-reduced-motion: reduce) {
  .friend-strip {
    transition: none;
  }
  .friend-strip:hover {
    transform: none;
  }
}
</style>
