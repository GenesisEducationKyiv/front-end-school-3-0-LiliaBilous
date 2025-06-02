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
        :current-page="trackStore.page" :total-pages="trackStore.totalPages" @change="onPageChange" />
    </div>

  </main>
</template>


<script setup lang="ts">
import type { Track } from '@/features/tracks/types/Tracks'
import { ref, onMounted } from 'vue'
import { useTrackStore } from '@/features/tracks/stores/trackStore'
import { notifySuccess, notifyError } from '@/shared/services/toastService'
import { useModal } from '@/shared/composables/useModal'

import TrackList from '@/components/TrackList.vue'
import CreateTrackModal from '@/components/modals/CreateTrackModal.vue'
import EditTrackModal from '@/components/modals/EditTrackModal.vue'
import ConfirmDeleteModal from '@/components/modals/ConfirmDeleteModal.vue'
import UploadFileModal from '@/components/modals/UploadFileModal.vue'
import PaginationControls from '@/components/common/PaginationControls.vue'
import TrackToolbar from '@/components/TrackToolbar.vue'

const trackStore = useTrackStore()
const { showModal, hideModal } = useModal()

const selectedTrack = ref<Track | null>(null)
const selectedIds = ref<string[]>([])
const selectAll = ref(false)

onMounted(() => {
  trackStore.fetchTracks()
})

function onPageChange(page: number) {
  trackStore.page = page
  selectAll.value = false
  selectedIds.value = []
  trackStore.fetchTracks()
}

// This function is used to open  modals
function openCreateModal() {
  showModal(CreateTrackModal, {
    listeners: {
      close: hideModal,
      'new-track': (track: unknown) => addNewTrack(track as Track)
    }
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
      }
    }
  })
}

function openEditModal(track: Track) {
  selectedTrack.value = { ...track }
  showModal(EditTrackModal, {
    props: { track: selectedTrack.value },
    listeners: {
      close: hideModal,
      'updated': (track: unknown) => handleTrackUpdate(track as Track)
    }
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
      }
    }
  })
}
function deleteSelected(ids: string[]) {
  try {
    trackStore.removeTracks(ids)
    notifySuccess('Selected tracks deleted')
  } catch {
    notifyError('Failed to delete selected tracks')
  }
}


function addNewTrack(newTrack: Track) {
  try {
    trackStore.addTrack(newTrack)
    notifySuccess('New track added')
  } catch {
    notifyError('Failed to add track')
  }
}

function handleTrackUpdate(updatedTrack: Track) {
  try {
    trackStore.editTrack(updatedTrack)
    notifySuccess('Track updated successfully')
  } catch {
    notifyError('Failed to update track')
  }
}

function handleFileUpload(id: string, file: File) {
  try {
    trackStore.uploadFile(id, file)
    notifySuccess('File uploaded successfully')
  } catch {
    notifyError('Upload failed')
  }
}

function handleFileRemove(id: string) {
  try {
    trackStore.deleteFile(id)
    notifySuccess('File removed successfully')
  } catch {
    notifyError('Failed to remove file')
  }
}

function deleteSingleTrack(id: string) {
  try {
    trackStore.removeTrack(id)
    notifySuccess('Track deleted successfully')
  } catch {
    notifyError('Failed to delete track')
  }
}

</script>
