<template>
  <footer class="footer">
    <div class="footer__container">
      <p class="footer__text">Test task from Genesis Academy</p>
      <div class="footer__copyright">
        Made by
        <a href="https://github.com/LiliaBilous" target="_blank" class="footer__link">
          LiliiaBilous
        </a>
        in 2025
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  width: 90%;
  margin-bottom: 1rem;
  container-type: inline-size;
}

.footer__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: var(--color-bg-glass);
  border-radius: var(--border-radius-1);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--color-glow-soft);
}

.footer__text {
  color: var(--color-text-base);
}

.footer__copyright {
  color: var(--color-text-muted);
}

.footer__link {
  color: var(--color-primary-cyan);
  transition: var(--transition);
}

.footer__link:hover {
  color: var(--color-primary-blue);
}

@container (max-width: 800px) {
  .footer__container {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
    padding: 1rem;
  }
}
</style>
