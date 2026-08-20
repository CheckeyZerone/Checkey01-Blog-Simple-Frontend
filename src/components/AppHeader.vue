<script setup lang="ts"></script>

<template>
  <header class="site-header">
    <div class="wrap">
      <RouterLink to="/" class="logo">
        <img src="/blog-logo-text.svg" alt="Checkey01的小站" class="logo-svg" />
      </RouterLink>
      <nav class="nav">
        <RouterLink to="/" class="nav-link" exact-active-class="active">首页</RouterLink>
        <RouterLink to="/posts" class="nav-link" active-class="active">文章</RouterLink>
        <RouterLink to="/links" class="nav-link" active-class="active">友链</RouterLink>
        <RouterLink to="/about" class="nav-link" active-class="active">关于我</RouterLink>
      </nav>
      <div class="search">
        <div class="search-icon-area">
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
            data-lucide="search"
            aria-hidden="true"
            class="search-icon"
          >
            <path d="m21 21-4.34-4.34"></path>
            <circle cx="11" cy="11" r="8"></circle>
          </svg>
        </div>

        <input
          type="search"
          class="search-input"
          placeholder="搜索文章/相册..."
          aria-label="搜索文章"
        />
      </div>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.25rem;
  /* height: 3.5rem; */
  border-bottom: 1px solid var(--border);
  background: #fff;
}
.wrap {
  width: 72rem;
  height: auto;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 1rem;
  box-sizing: border-box;
}
.logo {
  justify-self: start;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin-right: auto;
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  text-decoration: none;
}

.logo-svg {
  width: auto;
  height: 3.5rem;
}

.nav {
  justify-self: center;
  margin: 0 auto;
  display: flex;
  gap: 1.5rem;
}
.nav-link {
  padding: 0.3rem 0.05rem;
  border-bottom: 2px solid transparent;
  font-size: 0.9rem;
  color: var(--text-secondary);
  text-decoration: none;
  white-space: nowrap;
}

.nav-link:hover {
  color: var(--main-color);
  /* border-bottom: 1px dashed; */
}

.nav-link.active {
  color: var(--main-color);
  border-bottom-color: var(--main-color);
  font-weight: 500;
}

.search {
  justify-self: end;
  margin-left: auto;
  display: flex;
  align-items: center;
  width: 11rem;
  height: 2.2rem;
  border: 1px solid #d9dee8;
  border-radius: 999px;
  background: #f7f9fc;
  color: var(--text-primary);
  padding: 0 0.4rem;
}

.search-icon-area {
  display: flex;
  width: 2.2rem;
  height: 2.2rem;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.search-icon-area:hover {
  cursor: pointer;
}

.search-icon {
  display: block;
  width: 1rem;
  height: 1rem;
  color: #9aa3b2;
  pointer-events: none;
}

.search-input {
  flex: 1;
  min-width: 0;
  height: 100%;
  padding: 0 0.8rem 0 0.2rem;
  border: none;
  border-radius: 999px;
  background: transparent;
  color: var(--text-primary);
  font-family: inherit;
  outline: none;
}

@media (max-width: 640px) {
  .wrap {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
  }

  .logo,
  .nav,
  .search {
    justify-self: center;
    margin: 0;
    width: auto;
  }

  .logo {
    font-size: 1rem;
  }

  .nav {
    gap: 0.75rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .site-header {
    height: auto;
    padding: 0.7rem 1rem;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .search {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: auto;
    min-width: 12rem;
  }
  .search-input {
    flex: 1;
    width: auto;
    min-width: 7.5rem;
  }
}
</style>
