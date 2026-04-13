<script setup lang="ts">
defineProps<{
  title: string
  value: string | number
  label: string
  colorClass: string
}>()
</script>

<template>
  <div :class="['bg-white rounded-lg shadow-md p-6 border-t-4', colorClass]">
    <h2 class="text-xl font-semibold text-gray-700 mb-2">{{ title }}</h2>
    <div :class="['mt-4 flex items-baseline text-4xl font-extrabold', colorClass.replace('border-', 'text-')]">
      {{ value }}
      <span class="ml-2 text-lg font-medium text-gray-500">{{ label }}</span>
    </div>
    <div class="mt-4">
      <slot name="link"></slot>
    </div>
  </div>
</template>
