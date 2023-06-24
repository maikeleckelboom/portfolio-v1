<script lang="ts" setup>
const emit = defineEmits<{
  (event: 'sort', sort: 'ascend' | 'descend'): void
  (event: 'filter', filters: IFilter): void
}>()

const props = defineProps<{
  sort?: 'ascend' | 'descend'
  filters: IFilter[]
}>()

const filters = ref(props.filters)

const toggleFilter = async (filter: string) => {
  const filterIndex = filters.value.findIndex((f) => f.name === filter)
  filters.value[filterIndex].active = !filters.value[filterIndex].active
  await nextTick()
  emit('filter', filters.value[filterIndex])
}

const sortDirection = ref<'ascend' | 'descend'>('ascend')

watch(sortDirection, (dir) => emit('sort', dir))

const toggleSortDirection = () => {
  sortDirection.value = sortDirection.value === 'ascend' ? 'descend' : 'ascend'
}
</script>

<template>
  <div class="flex flex-wrap justify-start gap-2 px-2 md:justify-end">
    <div class="flex flex-col justify-end">
      <label
        class="sr-only mb-2 mr-2 text-label-medium text-on-surface-variant"
      >
        Sorteren op:
      </label>
      <div class="flex flex-row gap-2">
        <button
          :disabled="!filters.some((f) => f.active)"
          class="flex h-[32px] min-w-fit items-center rounded-lg border border-outline-variant px-4 hover:bg-surface-level-2 active:bg-surface-level-3 disabled:pointer-events-none disabled:opacity-60"
          @click="toggleSortDirection"
        >
          <Icon
            :class="{ 'rotate-180 text-primary': sortDirection === 'ascend' }"
            class="h-[18px] w-[18px] text-center text-on-surface-variant"
            name="ic:round-keyboard-arrow-up"
          />
          <span class="sr-only ml-2 text-label-medium text-on-surface">
            {{ sortDirection === 'ascend' ? 'Nieuwste' : 'Oudste' }}
          </span>
        </button>
      </div>
    </div>
    <div class="flex flex-col">
      <label
        class="sr-only mb-2 text-label-small text-on-surface-variant md:text-label-medium"
      >
        Filteren op:
      </label>
      <div class="flex flex-row gap-2">
        <button
          v-for="filter in filters"
          :class="{
            'border-secondary-container bg-secondary-container': filter.active,
            'pointer-events-none opacity-50': filter.disabled
          }"
          class="flex h-[32px] w-fit items-center rounded-lg border border-outline-variant px-4 hover:bg-surface-level-2 active:bg-surface-level-3"
          @click="toggleFilter(filter.name)"
        >
          <Icon
            v-if="filter.icon"
            :class="{ 'h-6 w-6 text-primary': filter.active }"
            :name="
              Array.isArray(filter.icon)
                ? filter.icon[filter.active ? 1 : 0]
                : filter.icon
            "
            class="h-[18px] w-[18px] text-on-surface-variant"
          />
          <span
            :class="{
              'text-on-surface': filter.active,
              'text-on-surface-variant': !filter.active
            }"
            class="ml-2 text-label-large capitalize"
          >
            {{ filter.label }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>
