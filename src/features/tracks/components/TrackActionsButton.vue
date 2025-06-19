<template>
  <div class="track-item__actions-wrapper">
    <div>
      <BaseButton
        v-if="isMobile"
        class="more-button"
        :aria-label="`Actions for ${track.title}`"
        @click="toggleMenu(track.id)"
      >
        ⋮
      </BaseButton>

      <div
        :class="{
          'dropdown-menu': isMobile && activeTrackId === track.id && isDropdownOpen,
          'track-item__actions': !isMobile || (isMobile && activeTrackId === track.id),
        }"
      >
        <BaseButton
          v-show="!track.audioFile"
          class="track-item__button button"
          :aria-label="`Upload audio file for ${track.title}`"
          :data-testid="`upload-track-${track.id}`"
          @click="$emit('upload', track)"
        >
          Upload
        </BaseButton>

        <BaseButton
          v-if="track.audioFile"
          class="track-item__button button"
          :aria-label="`${isPlayerVisible ? 'Hide' : 'Show'} player for ${track.title}`"
          @click="handlePlay(track.id)"
        >
          {{ isPlayerVisible ? 'Hide player' : 'Player' }}
        </BaseButton>

        <BaseButton
          class="track-item__button button"
          :aria-label="`Edit metadata for ${track.title}`"
          :data-testid="`edit-track-${track.id}`"
          @click="$emit('edit', track)"
        >
          Edit
        </BaseButton>

        <BaseButton
          class="track-item__button button"
          :aria-label="`Delete ${track.title}`"
          :data-testid="`delete-track-${track.id}`"
          @click="$emit('delete', track)"
        >
          Delete
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { Track } from '@/features/tracks/schema/trackSchema.ts'
import BaseButton from '@/shared/components/ui/BaseButton.vue'

defineProps<{ track: Track }>()

const emit = defineEmits<{
  (e: 'edit', track: Track): void
  (e: 'delete', track: Track): void
  (e: 'upload', track: Track): void
  (e: 'play-track', id: string): void
}>()

const isPlayerVisible = ref(false)
const isMobile = ref(false)
const activeTrackId = ref<string | null>(null)
const isDropdownOpen = ref(false)

function handlePlay(trackId: string) {
  isPlayerVisible.value = !isPlayerVisible.value
  emit('play-track', trackId)
}

function toggleMenu(id: string) {
  if (isMobile.value) {
    if (activeTrackId.value === id && isDropdownOpen.value) {
      activeTrackId.value = null
      isDropdownOpen.value = false
    } else {
      activeTrackId.value = id
      isDropdownOpen.value = true
    }
  }
}

function checkScreenSize() {
  isMobile.value = window.innerWidth <= 800
  if (!isMobile.value) {
    activeTrackId.value = null
    isDropdownOpen.value = false
  }
}

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})
</script>

<style scoped>
.more-button-hidden,
.track-item__actions-mobile-hidden,
.track-item__actions-desktop-hidden {
  display: none;
}

.more-button {
  color: var(--secondary-alt-color);
  cursor: pointer;
  font-size: 1.2em;
  line-height: 1;
  border: 1px solid transparent;
  border-radius: 0.5rem;
}

.more-button:hover,
.more-button:focus-visible {
  border-color: var(--secondary-alt-color);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: -10%;
  background-color: var(--grey-fill-color);
  border: 1px solid var(--border-color);
  border-radius: 0.25rem;
  padding: 0.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 6rem;
}

.track-item__actions {
  display: flex;
  gap: 1rem;
}

.track-item__button {
  color: var(--primary-color);
  font-weight: 500;
  transition: all 0.3s ease-in-out;
}

.track-item__button:hover {
  background-color: var(--white-color);
}

.track-item__actions-wrapper {
  position: relative;
}

.dropdown-wrapper {
  position: relative;
}

.dropdown-item {
  padding: 0.5rem 1rem;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
}
</style>
