<template>
  <div class="track-item__actions-wrapper">
    <BaseButton
      class="more-button"
      :aria-label="`Actions for ${track.title}`"
      aria-haspopup="menu"
      :aria-expanded="activeTrackId === track.id && isDropdownOpen"
      aria-controls="track-actions-dropdown"
      @click="toggleMenu(track.id)"
    >
      ⋮
    </BaseButton>

    <div
      class="track-item__actions"
      :class="{ dropdown: activeTrackId === track.id && isDropdownOpen }"
    >
      <BaseButton
        v-show="!track.audioFile"
        class="track-item__button button button-upload"
        :aria-label="`Upload audio file for ${track.title}`"
        :data-testid="`upload-track-${track.id}`"
        @click="$emit('upload', track)"
      >
        Upload
      </BaseButton>

      <BaseButton
        v-if="track.audioFile"
        class="track-item__button button button-upload"
        :aria-label="`${isPlayerVisible ? 'Hide' : 'Show'} player for ${track.title}`"
        @click="handlePlay(track.id)"
      >
        {{ isPlayerVisible ? 'Hide player' : 'Player' }}
      </BaseButton>

      <BaseButton
        class="track-item__button button edit-button"
        :aria-label="`Edit metadata for ${track.title}`"
        :data-testid="`edit-track-${track.id}`"
        @click="$emit('edit', track)"
      >
        Edit
      </BaseButton>

      <BaseButton
        class="track-item__button button delete-button"
        :aria-label="`Delete ${track.title}`"
        :data-testid="`delete-track-${track.id}`"
        @click="$emit('delete', track)"
      >
        Delete
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
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
const activeTrackId = ref<string | null>(null)
const isDropdownOpen = ref(false)

function handlePlay(trackId: string) {
  isPlayerVisible.value = !isPlayerVisible.value
  emit('play-track', trackId)
}

function toggleMenu(id: string) {
  if (activeTrackId.value === id && isDropdownOpen.value) {
    isDropdownOpen.value = false
    activeTrackId.value = null
  } else {
    isDropdownOpen.value = true
    activeTrackId.value = id
  }
}
</script>

<style>
.track-item__actions-wrapper {
  position: relative;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}

.track-item__actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.more-button {
  display: none;
}

@media (max-width: 53rem) {
  .more-button {
    display: inline-block;
    color: var(--color-text-base);
    cursor: pointer;
    font-size: 1.25rem;
    border: 1px solid transparent;
    border-radius: var(--border-radius-0-5);
    background: transparent;
    transition: var(--transition);
  }

  .track-item__actions {
    display: none;
  }

  .track-item__actions.dropdown {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    position: absolute;
    top: 100%;
    right: 0;
    background-color: var(--color-bg-glass);
    border-radius: var(--border-radius-0-5);
    padding: 0.75rem;
    box-shadow: var(--box-shadow-main);
    z-index: 1000;
    min-width: 10rem;
  }
}

.track-item__button {
  font-weight: 500;
  border: 1px solid transparent;
  border-radius: var(--border-radius-0-5);
  padding: 0.5rem 0.75rem;
  color: var(--color-text-base);
  transition: var(--transition);
}

.track-item__button:focus-visible {
  box-shadow: var(--box-shadow-button);
}

.button-upload:hover {
  color: var(--color-primary-blue);
  box-shadow: inset var(--box-shadow-blue);
}

.edit-button:hover {
  color: var(--color-primary-purple);
  box-shadow: inset var(--box-shadow-2);
}

.delete-button:hover {
  color: var(--color-primary-pink);
  box-shadow: inset var(--box-shadow-1);
}
</style>
