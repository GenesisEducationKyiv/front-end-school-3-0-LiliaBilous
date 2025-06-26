<!-- ActiveTrack.vue -->
<template>
    <div>
        🎧 Active track: {{ activeTrack ?? 'Loading...' }}
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import gql from 'graphql-tag'
import { useSubscription } from '@vue/apollo-composable'

const ACTIVE_TRACK = gql`
  subscription {
    activeTrackTitle
  }
`

const { result } = useSubscription(ACTIVE_TRACK)

const activeTrack = computed(() => result.value?.activeTrackTitle);
</script>
