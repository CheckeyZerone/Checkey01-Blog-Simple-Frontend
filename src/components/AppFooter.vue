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
  border-top: 1px solid #e5e7eb;
  padding: 1rem 1.25rem;
  text-align: center;
  color: #9ca3af;
  font-size: 0.875rem;
}
.site-footer p {
  margin: 0 0 0.5rem;
}
.beian {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
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
