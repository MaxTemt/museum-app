<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-3xl font-bold text-gray-800">{{ title }}</h1>
    <div class="flex gap-2">
      <slot name="actions"></slot>
    </div>
  </div>
</template>
