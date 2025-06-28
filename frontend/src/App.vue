<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import AppFooter from '@/shared/components/ui/AppFooter.vue'
import ModalHost from '@/shared/components/modal/ModalHost.vue'
import ActiveTrack from '@/shared/components/ActiveTrack.vue'
const AsyncTracksView = defineAsyncComponent({
  loader: () => import('@/features/tracks/views/TracksView.vue'),
  delay: 200,
  timeout: 10000,
  suspensible: true,
})
</script>

<template>
  <div class="wrapper">
    <section class="hero">
      <div class="hero__background"></div>
      <div class="hero__content">
        <ActiveTrack />
        <h1 class="hero__title" data-testid="tracks-header">Track Manager</h1>
      </div>
    </section>
    <Suspense>
      <template #default>
        <AsyncTracksView />
      </template>
      <template #fallback>
        <div class="spinner" data-testid="loading-indicator" data-loading="true"></div>
      </template>
    </Suspense>
    <ModalHost />
    <AppFooter />
  </div>
</template>
<style>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* max-height: 100%; */
  min-height: 100vh;
  position: relative;
  overflow: auto;
  gap: 1rem;
}

.hero {
  position: relative;
  height: var(--hero-height);
  width: 100%;
  background: center / cover url(@/assets/image.webp) no-repeat;
  border: 1px var(--color-accent-gold) solid;
}

.hero__content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: var(--color-text-base);
}

.hero__background::after {
  content: '';
  position: absolute;
  inset: 0;
  /* backdrop-filter: blur(1px); */
  z-index: 1;
}

.hero__content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero__title {
  font-size: 4rem;
  font-weight: 700;
  margin-top: 5rem;
}
</style>
