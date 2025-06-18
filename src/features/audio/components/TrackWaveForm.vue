<template>
  <div
    v-if="trackBySlug && trackBySlug.audioFile"
    :data-testid="`audio-player-${trackBySlug.id}`"
    class="audio-player"
  >
    <audio
      ref="audioRef"
      :src="trackBySlug.audioFile"
      preload="auto"
      @timeupdate="updateProgress"
      @loadedmetadata="updateDuration"
      class="audio-hidden"
    >
      Your browser does not support the audio element.
    </audio>

    <!-- Waveform -->
    <div ref="waveformRef" class="waveform"></div>

    <!-- Controls -->
    <div class="controls">
      <button
        v-if="!isPlaying"
        @click="play"
        :data-testid="`play-button-${trackBySlug.id}`"
        class="button play-button"
      >
        Play
      </button>
      <button
        v-else
        @click="pause"
        class="button play-button"
        :data-testid="`pause-button-${trackBySlug.id}`"
      >
        Pause
      </button>

      <span :data-testid="`audio-progress-${trackBySlug.id}`">
        {{ currentTime }} / {{ duration }}
      </span>
      <button type="button" @click="removeAudioFile" class="button danger">Remove File</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import { useAudioPlayer } from '@/features/audio/composables/useAudioPlayer'
import { useTrackAudioStore } from '@/features/audio/store/audioStore'

const props = defineProps<{ slug: string }>()
const emit = defineEmits<{
  (e: 'reset', trackId?: string): void
}>()

const audioRef = ref<HTMLAudioElement | null>(null)
const waveformRef = ref<HTMLDivElement | null>(null)

const audioStore = useTrackAudioStore()
const { fetchTrackBySlug } = audioStore
const { trackBySlug } = storeToRefs(audioStore)

const {
  isPlaying,
  currentTime,
  duration,
  updateProgress,
  updateDuration,
  play,
  pause,
  initWaveSurfer,
} = useAudioPlayer(audioRef, waveformRef, trackBySlug.value?.audioFile ?? '')

const fetchData = async () => {
  const result = await fetchTrackBySlug(props.slug)
  if (result.isOk()) {
    await nextTick()
    initWaveSurfer()
  }
}

watch(
  () => props.slug,
  () => {
    if (props.slug) fetchData()
  },
  { immediate: true }
)

const removeAudioFile = () => {
  emit('reset', trackBySlug.value?.id)
  pause()
}
</script>

<style scoped>
.audio-player {
  padding: 1rem;
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.waveform {
  width: 100%;
  height: 60px;
}

.controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  justify-content: space-around;
}

/* .audio-hidden {
  display: none;
} */

.play-button {
  background-color: var(--secondary-alt-color);
}

@media screen and (max-width: 50rem) {
  .audio-player {
    padding: 0.25rem;
    margin-top: 16px;
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
