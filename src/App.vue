<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import AppFooter from '@/components/common/AppFooter.vue'
import ModalHost from '@/shared/components/ModalHost.vue'
const AsyncTracksView = defineAsyncComponent({
  loader: () => import('@/views/TracksView.vue'),
  delay: 200,
  timeout: 10000,

})
</script>

<template>
  <div class="wrapper">
    <!-- Hero section -->
    <section class="hero">
      <div class="hero__background"></div>
      <div class="hero__content">
        <h1 class="hero__title" data-testid="tracks-header">
          Track Manager
        </h1>
      </div>
    </section>

    <!-- Tracks View -->
    <Suspense>
      <template #default>
        <AsyncTracksView />
      </template>
      <template #fallback>
        <div class="spinner" data-testid="loading-indicator" data-loading="true"></div>
      </template>
    </Suspense>
    <ModalHost />
    <!-- Footer -->
    <AppFooter />
  </div>
</template>
<style>
.hero {
  position: relative;
  height: var(--hero-height);
  width: 100%;
  background: center / cover url(@/assets/image.webp) no-repeat;
}

.hero__content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: var(--white-color);
  padding-top: 6rem;
}

.hero__title {
  font-size: 3em;
  font-weight: 700;
}
</style>