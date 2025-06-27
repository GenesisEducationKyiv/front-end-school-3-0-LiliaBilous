<template>
  <main class="main">
    <div class="main__container">
      <TrackToolbar />

      <div v-if="trackStore.isLoading" data-testid="loading-tracks" data-loading="true" class="loading-indicator">
        Loading tracks...
      </div>

      <button data-testid="create-track-button" class="main__create-track-button button" @click="openCreateModal"
        :disabled="trackStore.isLoading" :aria-disabled="trackStore.isLoading" :data-loading="trackStore.isLoading">
        + Create Track
      </button>

      <TrackList v-if="!trackStore.isLoading" :tracks="trackStore.tracks" @edit="openEditModal"
        @delete="openConfirmDelete" @upload="openUploadModal" @reset="handleFileRemove" @bulk-delete="deleteSelected" />

      <PaginationControls v-if="!trackStore.isLoading && trackStore.totalPages > 1" data-testid="pagination"
        :current-page="filterStore.page" :total-pages="trackStore.totalPages" @change="onPageChange" />
    </div>
  </main>
</template>

<script setup lang="ts">
import type { Track } from '@/features/tracks/schema/trackSchema.ts'
import { ref, onMounted } from 'vue'
import { useTrackStore } from '@/features/tracks/stores/trackStore'
import { useTrackFileStore } from '@/features/tracks/stores/useTrackFileStore.ts'
import { useTrackFilterStore } from '@/features/filters/store/trackFilterStore.ts'
import { notifySuccess, notifyError } from '@/shared/services/toastService'
import { useModal } from '@/shared/composables/useModal'

import TrackList from '@/features/tracks/components/TrackList.vue'
import CreateTrackModal from '@/features/tracks/components/modals/CreateTrackModal.vue'
import EditTrackModal from '@/features/tracks/components/modals/EditTrackModal.vue'
import ConfirmDeleteModal from '@/features/tracks/components/modals/ConfirmDeleteModal.vue'
import UploadFileModal from '@/features/tracks/components/modals/UploadFileModal.vue'
import PaginationControls from '@/shared/components/ui/PaginationControls.vue'
import TrackToolbar from '@/features/filters/components/TrackToolbar.vue'

const trackStore = useTrackStore()
const trackFileStore = useTrackFileStore()
const filterStore = useTrackFilterStore()
const { showModal, hideModal } = useModal()

const selectedTrack = ref<Track | null>(null)
const selectedIds = ref<string[]>([])
const selectAll = ref(false)

onMounted(() => {
  trackStore.fetchTracks()
})

function onPageChange(page: number) {
  filterStore.page = page
  selectAll.value = false
  selectedIds.value = []
  trackStore.fetchTracks()
}

function openCreateModal() {
  showModal(CreateTrackModal, {
    listeners: {
      close: hideModal,
      'new-track': (track: unknown) => addNewTrack(track as Track),
    },
  })
}
function openUploadModal(track: Track) {
  selectedTrack.value = { ...track }
  showModal(UploadFileModal, {
    props: { track: selectedTrack.value },
    listeners: {
      close: hideModal,
      upload: (id: unknown, file: unknown) => {
        if (typeof id === 'string' && file instanceof File) {
          handleFileUpload(id, file)
        }
      },
    },
  })
}
function openEditModal(track: Track) {
  selectedTrack.value = { ...track }
  showModal(EditTrackModal, {
    props: { track: selectedTrack.value },
    listeners: {
      close: hideModal,
      updated: (track: unknown) => handleTrackEdit(track as Track),
    },
  })
}
function openConfirmDelete(track: Track) {
  selectedTrack.value = { ...track }
  showModal(ConfirmDeleteModal, {
    props: { track: selectedTrack.value },
    listeners: {
      close: hideModal,
      confirm: (...args: unknown[]) => {
        const [id] = args
        if (typeof id === 'string') {
          deleteSingleTrack(id)
          hideModal()
        }
      },
    },
  })
}
async function addNewTrack(newTrack: Track) {
  const result = await trackStore.addTrack(newTrack)

  if (result.isOk()) {
    notifySuccess('New track added')
  } else {
    notifyError(`Failed to add track: ${result.error.message}`)
  }
}
async function handleTrackEdit(updatedTrack: Track) {
  const result = await trackStore.editTrack(updatedTrack)
  if (result.isOk()) {
    notifySuccess('Track updated successfully')
  } else {
    notifyError('Failed to update track')
  }
}
async function deleteSingleTrack(id: string) {
  const result = await trackStore.removeTrack(id)
  if (result.isOk()) {
    notifySuccess('Track deleted successfully')
  } else {
    notifyError(`Failed to delete track: ${result.error.message}`)
  }
}
async function deleteSelected(ids: string[]) {
  const result = await trackStore.removeTracks(ids)
  if (result.isOk()) {
    notifySuccess('Selected tracks deleted')
  } else {
    notifyError('Failed to delete selected tracks')
  }
}
async function handleFileUpload(id: string, file: File) {
  const result = await trackFileStore.uploadFile(id, file)
  if (result.isOk()) {
    notifySuccess('File uploaded successfully')
  } else {
    notifyError('Upload failed')
  }
}
async function handleFileRemove(id: string) {
  const result = await trackFileStore.deleteFile(id)
  if (result.isOk()) {
    notifySuccess('File removed successfully')
  } else {
    notifyError('Failed to remove file')
  }
}
</script>
<style>
.main {
  position: relative;
  z-index: 3;
  margin-top: calc(var(--hero-height) * -0.45);
  max-width: 86rem;
  width: 90%;
  background: var(--color-bg-glass);
  border: 1px solid var(--color-glow-soft);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: var(--border-radius-1);
  padding: 2rem;
  box-shadow: var(--box-shadow-main);
}

.main__container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  container-type: inline-size;
}

.main__create-track-button {
  position: relative;
  font-size: 1.125rem;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius-0-5);
  color: var(--color-text-base);
  background: linear-gradient(260deg,
      var(--color-primary-purple),
      var(--color-primary-pink),
      var(--color-primary-orange));
  border: none;
  cursor: pointer;
  overflow: hidden;
  z-index: 1;
  transition: var(--transition);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--gradient-wave);
    opacity: 0;
    transition: var(--transition);
    z-index: -1;
  }
}

.main__create-track-button:hover::before {
  opacity: 1;
}
</style>
