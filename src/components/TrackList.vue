<template>
  <div class="track-list">
    <Transition name="fade">
      <TrackBulkActions v-if="selectedIds.length" :selected-ids="selectedIds" :select-all="selectAll"
        @update:selectAll="toggleSelectAll" @delete-selected="deleteSelected" />
    </Transition>
    <TransitionGroup name="list" tag="div" class="track-list__container" v-if="tracks.length > 0">
      <TrackCard v-for="track in tracks" :key="track.id" :track="track" :selected="selectedIds.includes(track.id)"
        :playing="playingTrackId === track.id" :disable-actions="selectedIds.length > 0" @edit="emits('edit', track)"
        @delete="emits('delete', track)" @upload="emits('upload', track)" @play="handlePlay" @reset="handleReset"
        @select="handleSelect" />
    </TransitionGroup>
    <div v-else>
      <p>No tracks found.</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import TrackBulkActions from '@/components/TrackBulkActions.vue'
import TrackCard from '@/components/TrackCard.vue'
import ConfirmDeleteModal from '@/components/modals/ConfirmDeleteModal.vue'
import { useModal } from '@/shared/composables/useModal'
import type { Track } from '@/features/tracks/schema/trackSchema'

const props = defineProps<{
  tracks: Track[]
}>()

const emits = defineEmits<{
  (e: 'edit', track: Track): void
  (e: 'delete', track: Track): void
  (e: 'upload', track: Track): void
  (e: 'reset', trackId: string): void
  (e: 'bulk-delete', ids: string[]): void
}>()

const playingTrackId = ref<string | null>(null)
const selectedIds = ref<string[]>([])
const selectAll = ref(false)

const { showModal, hideModal } = useModal()

function handlePlay(trackId: string) {
  playingTrackId.value = playingTrackId.value === trackId ? null : trackId
}

function handleReset(trackId: string) {
  emits('reset', trackId)
}

function handleSelect(trackId: string) {
  const updated = [...selectedIds.value]
  const index = updated.indexOf(trackId)
  if (index === -1) {
    updated.push(trackId)
  } else {
    updated.splice(index, 1)
  }
  selectedIds.value = updated
}

function toggleSelectAll(val: boolean) {
  selectAll.value = val
  selectedIds.value = val ? props.tracks.map(t => t.id) : []
}

function deleteSelected() {
  showModal(ConfirmDeleteModal, {
    props: {
      track: { id: '', title: `${selectedIds.value.length} selected tracks` }
    },
    listeners: {
      close: hideModal,
      confirm: () => {
        emits('bulk-delete', selectedIds.value)
        selectedIds.value = []
        selectAll.value = false
        hideModal()
      }
    }
  })
}

watch(
  () => props.tracks,
  () => {
    if (selectAll.value) {
      selectedIds.value = props.tracks.map(t => t.id)
    }
  }
)
</script>
<!-- <script setup lang="ts">
import { ref, watch } from 'vue'
import TrackBulkActions from '@/components/TrackBulkActions.vue'
import TrackCard from '@/components/TrackCard.vue'
import type { Track } from '@/features/tracks/schema/trackSchema'

const props = defineProps<{
  tracks: Track[]
  selectedIds: string[]
  selectAll: boolean
}>()

const emits = defineEmits<{
  (e: 'edit', track: Track): void
  (e: 'delete', track: Track): void
  (e: 'upload', track: Track): void
  (e: 'reset', trackId: string): void
  (e: 'update:selected-ids', ids: string[]): void
}>()

const playingTrackId = ref<string | null>(null)

function handlePlay(trackId: string) {
  playingTrackId.value = playingTrackId.value === trackId ? null : trackId
}

function handleEdit(track: Track) {
  emits('edit', track)
}

function handleDelete(track: Track) {
  emits('delete', track)
}

function handleUpload(track: Track) {
  emits('upload', track)
}

function handleReset(trackId: string) {
  emits('reset', trackId)
}

function handleSelect(trackId: string) {
  const updated = [...props.selectedIds]
  const index = updated.indexOf(trackId)
  if (index === -1) {
    updated.push(trackId)
  } else {
    updated.splice(index, 1)
  }
  emits('update:selected-ids', updated)
}

watch(
  () => props.selectAll,
  (val) => {
    emits('update:selected-ids', val ? props.tracks.map(t => t.id) : [])
  }
)

watch(
  () => props.tracks,
  () => {
    if (props.selectAll) {
      emits('update:selected-ids', props.tracks.map(t => t.id))
    }
  }
)
</script> -->
