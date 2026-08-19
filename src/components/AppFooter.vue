<script setup lang="ts"></script>

<template>
  <footer class="site-footer">
    <p class="copyright">© 2026 Checkey01的小站</p>
    <div class="beian">
      <a
        href="https://beian.miit.gov.cn/"
        target="_blank"
        rel="noopener noreferrer"
        class="beian-link"
      >
        京ICP备XXXXXXXX号
      </a>
      <a
        href="https://beian.mps.gov.cn/"
        target="_blank"
        rel="noopener noreferrer"
        class="beian-link"
      >
        <img src="/beian.png" alt="公安备案图标" class="beian-icon" />
        京公网安备XXXXXXXXXXXX号
      </a>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  border-top: 1px solid var(--border);
  background: #fff;
  padding: 1.1rem 1.5rem;
  text-align: center;
  color: var(--text-info);
  font-size: 0.8rem;
}
.site-footer .copyright {
  margin: 0 0 0.35rem;
}
.beian {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.9rem;
  flex-wrap: wrap;
}
.beian-link {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  color: #9ca3af;
  text-decoration: none;
}
.beian-link:hover {
  color: #2563eb;
}
.beian-icon {
  height: 1rem;
  width: auto;
}
</style>
