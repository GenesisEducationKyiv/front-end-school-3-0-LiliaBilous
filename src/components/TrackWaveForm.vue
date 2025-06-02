<template>
  <div v-if="trackData && trackData.audioFile" :data-testid="`audio-player-${trackData.id}`" class="audio-player">
    <audio ref="audioRef" :src="trackData.audioFile" preload="auto" @timeupdate="updateProgress"
      @loadedmetadata="updateDuration" class="audio-hidden">
      Your browser does not support the audio element.
    </audio>

    <!-- Waveform -->
    <div ref="waveformRef" class="waveform"></div>

    <!-- Controls -->
    <div class="controls">
      <button v-if="!isPlaying" @click="play" :data-testid="`play-button-${trackData.id}`" class="button play-button">
        Play
      </button>
      <button v-else @click="pause" :data-testid="`pause-button-${trackData.id}`" class="button play-button">
        Pause
      </button>

      <span :data-testid="`audio-progress-${trackData.id}`">
        {{ currentTime }} / {{ duration }}
      </span>

      <button type="button" @click="removeAudioFile" class="button danger">
        Remove File
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted, nextTick } from 'vue'
import WaveSurfer from 'wavesurfer.js'

import type { Track } from '@/features/tracks/schema/trackSchema.ts'

const props = defineProps<{ slug: string }>()
const emit = defineEmits<{ (e: 'reset', trackId: string): void }>()

const audioRef = ref<HTMLAudioElement | null>(null)
const waveformRef = ref<HTMLDivElement | null>(null)
const trackData = ref<Track | null>(null)

let waveSurfer: WaveSurfer | null = null

const isPlaying = ref(false)
const currentTime = ref('0:00')
const duration = ref('0:00')

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

function updateProgress() {
  if (audioRef.value) {
    currentTime.value = formatTime(audioRef.value.currentTime)
  }
}

function updateDuration() {
  if (audioRef.value) {
    duration.value = formatTime(audioRef.value.duration)
  }
}

function play() {
  audioRef.value?.play()
  waveSurfer?.play()
  isPlaying.value = true
}

function pause() {
  audioRef.value?.pause()
  waveSurfer?.pause()
  isPlaying.value = false
}

function removeAudioFile() {
  if (trackData.value) {
    emit('reset', trackData.value.id)
    trackData.value.audioFile = null
    trackData.value = null
    isPlaying.value = false
  }
}

function initWaveSurfer() {
  if (!waveformRef.value || !audioRef.value || !trackData.value?.audioFile) return

  waveSurfer?.destroy()
  waveSurfer = WaveSurfer.create({
    container: waveformRef.value,
    waveColor: '#B5B7C0',
    progressColor: '#e76026',
    height: 60,
    responsive: true,
    media: audioRef.value,
    interact: true,
  })

  waveSurfer.load(trackData.value.audioFile)
}

async function fetchTrackData() {
  try {
    const res = await fetch(`http://localhost:8000/api/tracks/${props.slug}`)
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)

    const data = await res.json()
    const fullTrack: Track = {
      ...data,
      audioFile: data.audioFile
        ? `http://localhost:8000/api/files/${data.audioFile}`
        : null,
    }

    trackData.value = fullTrack
    await nextTick()
    initWaveSurfer()
  } catch (err) {
    console.error('Failed to fetch track:', err)
  }
}

watch(
  () => props.slug,
  () => {
    if (props.slug) fetchTrackData()
  },
  { immediate: true }
)

onUnmounted(() => {
  waveSurfer?.destroy()
})
</script>
