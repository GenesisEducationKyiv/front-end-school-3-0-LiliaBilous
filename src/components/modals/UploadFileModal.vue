<template>
  <BaseModal @close="$emit('close')">
    <template #title>
      <h2 class="modal-title">Upload File for <span>{{ track.title }}</span></h2>
    </template>
    <template #content>
      <form id="upload-file" @submit.prevent="handleSubmit" class="form">

        <div v-if="!audioFile" class="file-upload-wrapper">
          <label for="audioFile" class="button custom-file-upload" data-testid="button-upload-audio">
            Upload Track (MP3, WAV)
          </label>
          <input type="file" id="audioFile" accept=".mp3, .wav" @change="handleAudioUpload"
            aria-describedby="audio-file-instructions" data-testid="input-audio-file" />
          <p id="audio-file-instructions" class="visually-hidden">
            Accepted formats: MP3 or WAV. Maximum size: 10MB.
          </p>
          <p v-if="error" class="error-text" role="alert" data-testid="error-audioFile">
            {{ error }}
          </p>
        </div>
        <div v-if="audioFileUrl" class="audio-player">
          <div class="file-info">
            <p class="file-name" v-if="audioFile">{{ audioFile.name }}</p>
            <button type="button" @click="removeAudioFile" class="button danger small"
              aria-label="Remove uploaded audio file">
              Remove File
            </button>
          </div>

          <audio :src="audioFileUrl" controls class="audio-control" :aria-label="`Audio preview for ${track.title}`" />

        </div>
      </form>
    </template>
    <template #footer>
      <div class="button-row">
        <button type="button" @click="$emit('close')" class="button button-cancel" data-testid="cancel-button">
          Cancel
        </button>
        <button type="submit" form="upload-file" class="button button-submit" data-testid="submit-button">
          Save
        </button>
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { validateAudioFile } from '@/shared/utils/validation'
import type { Track } from '@/features/tracks/schema/trackSchema.ts'
import BaseModal from '@/shared/components/BaseModal.vue'

// --- Props & Emits ---
const props = defineProps<{ track: Track }>()
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'upload', id: string, file: File): void
}>()

// --- State ---
const audioFile = ref<File | null>(null)
const audioFileUrl = ref<string>('')
const error = ref<string>('')

// --- Methods ---
function handleAudioUpload(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]

  if (!file) return

  const { valid, error: validationError } = validateAudioFile(file)

  if (!valid) {
    error.value = validationError
    return
  }

  audioFile.value = file
  audioFileUrl.value = URL.createObjectURL(file)
  error.value = ''
}

function handleSubmit() {
  if (!audioFile.value) {
    error.value = 'Please upload a file first.'
    return
  }

  emit('upload', props.track.id, audioFile.value)
  emit('close')
}

function removeAudioFile() {
  audioFile.value = null
  audioFileUrl.value = ''
}
</script>
<style>
input[type="file"] {
  display: none;
}

.custom-file-upload {
  display: inline-block;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  text-align: center;
}

.custom-file-upload:hover {
  background-color: var(--secondary-color);
}

.file-upload-wrapper {}

.file-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.file-name {
  font-weight: 500;
  color: var(--text-color);
  text-transform: capitalize;
}

.audio-player {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.audio-control {
  height: 5rem;
  width: 100%;
  border-radius: 0.5rem;
}
</style>