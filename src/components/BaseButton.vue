<script setup lang="ts">
withDefaults(defineProps<{
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'danger'
  disabled?: boolean
}>(), {
  type: 'button',
  variant: 'primary',
  disabled: false
})
</script>
<template>
  <button 
    :type="type"
    :disabled="disabled"
    class="px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
    :class="{
      'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500': variant === 'primary',
      'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500': variant === 'secondary',
      'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500': variant === 'danger',
    }"
  >
    <slot></slot>
  </button>
</template>
