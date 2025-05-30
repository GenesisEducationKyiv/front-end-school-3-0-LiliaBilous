<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import AppFooter from '@/components/common/AppFooter.vue'

const AsyncTracksView = defineAsyncComponent({
  loader: () => import('@/views/TracksView.vue'),
  delay: 200,
  timeout: 10000,
  suspensible: true,
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

    <!-- Footer -->
    <AppFooter />
  </div>
</template>
