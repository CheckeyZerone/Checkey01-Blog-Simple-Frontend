<script setup lang="ts"></script>

<template>
  <section class="hero">
    <span class="hero-badge">Welcome to my blog</span>
    <h1>欢迎来到 Checkey01 的小站</h1>
    <p class="hero-sub">
      我们的幸福将属于千百万人，我们的事业将悄然无声地存在下去，但是它会永远发挥作用，而面对我们的骨灰，高尚的人们将洒下热泪。
    </p>
    <div class="hero-cta">
      <RouterLink to="/tags" class="btn">浏览文章</RouterLink>
      <RouterLink to="/about" class="btn ghost">关于我</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  border-radius: 20px;
  padding: 2.75rem 2.5rem;
  background: linear-gradient(135deg, var(--light-blue) 0%, #fff6e5 100%);
  border: 1px solid #dbe7fb;
  overflow: hidden;
  margin-bottom: 2.25rem;
}

.hero::before {
  width: 13rem;
  height: 13rem;
  right: -3.5rem;
  top: -4rem;
  background: radial-gradient(circle, rgb(110 225 152 / 0.35) 0%, rgb(110 225 252 / 0) 70%);
}
.hero::after {
  width: 8rem;
  height: 8rem;
  right: 7rem;
  bottom: -4.5rem;
  background: radial-gradient(circle, rgb(255 197 61 / 0.3) 0%, rgb(255 197 61 / 0) 70%);
}
.hero::before,
.hero::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.hero-badge {
  display: block;
  font-size: 0.76rem;
  color: var(--main-blue);
  letter-spacing: 0.18em;
  text-transform: uppercase;
}
.hero h1 {
  margin: 1rem 0 0.5rem;
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  line-height: 1.25;
  font-weight: 600;
  color: var(--text-primary);
}
.hero-sub {
  margin: 0 0 1.25rem;
  color: var(--text-secondary);
  max-width: 34rem;
}
.hero-cta {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
}
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: var(--main-blue);
  color: #ffffff;
  border: 0;
  border-radius: 999px;
  padding: 0.6rem 1.3rem;
  font-size: 0.9rem;
  font-weight: 500;
  font-family: inherit;
  text-decoration: none;

  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    background-color 0.18s ease,
    color 0.18s ease,
    border-color 0.18s ease;
  will-change: transform;
}
.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 18px rgb(32 128 240 / 0.28);
}
.btn:active {
  transform: translateY(0) scale(0.97);
  box-shadow: 0 4px 10px rgb(32 128 240 / 0.2);
}
.btn.ghost {
  background: #fff;
  color: var(--main-blue);
  border: 1px solid #bfd9fb;
}
.btn.ghost:hover {
  border-color: var(--main-blue);
  box-shadow: 0 4px 12px rgb(32 128 240 / 0.14);
}
</style>
