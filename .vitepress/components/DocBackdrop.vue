<script setup lang="ts">
import { isBetweenHalloweenAndHalfOfNovember } from '../composables/date'
</script>

<template>
  <ClientOnly>
    <img
      v-if="isBetweenHalloweenAndHalfOfNovember(new Date())"
      class="max-w-none w-[90rem] flex-none"
      decoding="async"
      src="/new-bg-halloween.avif"
      alt="backdrop"
    >
    <img
      v-else
      class="max-w-none w-[90rem] flex-none"
      decoding="async"
      src="/new-bg.avif"
      alt="backdrop"
    >
  </ClientOnly>
</template>
