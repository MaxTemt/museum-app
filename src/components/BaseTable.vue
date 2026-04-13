<script setup lang="ts">
defineProps<{
  columns: { key: string, label: string }[]
  data: any[]
}>()
</script>
<template>
  <div class="overflow-x-auto bg-white rounded-lg shadow">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th 
            v-for="col in columns" 
            :key="col.key"
            scope="col" 
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {{ col.label }}
          </th>
          <th scope="col" class="relative px-6 py-3">
            <span class="sr-only">Действия</span>
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="(row, index) in data" :key="row.id || index">
          <td 
            v-for="col in columns" 
            :key="col.key"
            class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
          >
            <slot :name="`cell-${col.key}`" :row="row">
              {{ row[col.key] }}
            </slot>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <slot name="actions" :row="row"></slot>
          </td>
        </tr>
        <tr v-if="data.length === 0">
          <td :colspan="columns.length + 1" class="px-6 py-4 text-center text-sm text-gray-500">
            Нет данных для отображения
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
