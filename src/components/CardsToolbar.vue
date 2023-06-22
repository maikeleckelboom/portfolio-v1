<script lang="ts" setup>
const activeFilters = ref([
  {
    name: 'stage',
    active: true,
    icon: ['ic:outline-psychology', 'ic:baseline-psychology', 'ic:round-check']
  },
  {
    name: 'werk',
    active: true,
    icon: ['ic:outline-cases', 'ic:round-cases', 'ic:round-check']
  }
  // {
  //   name: 'school',
  //   active: true,
  //   icon: ['ic:outline-school', 'ic:baseline-school']
  // }
])

const toggleFilter = (filter: string) => {
  const filterIndex = activeFilters.value.findIndex((f) => f.name === filter)
  activeFilters.value[filterIndex].active =
    !activeFilters.value[filterIndex].active
}

const sortMenuOpened = ref<boolean>(true)
</script>

<template>
  <div class="flex flex-wrap justify-start gap-2 px-2 pb-4 md:justify-end">
    <div class="flex w-40 flex-col justify-end">
      <label class="mb-2 mr-2 text-label-medium text-on-surface-variant">
        Sorteren op:
      </label>
      <div class="flex flex-row gap-2">
        <button
          :class="{
            'border-secondary-container bg-secondary-container': sortMenuOpened
          }"
          class="flex h-[32px] w-fit items-center rounded-lg border border-outline px-4 text-label-medium text-on-surface"
          @click="sortMenuOpened = !sortMenuOpened"
        >
          <Icon
            :class="{ 'rotate-180 text-primary': sortMenuOpened }"
            class="h-[18px] w-[18px] text-on-surface-variant"
            name="ic:round-keyboard-arrow-up"
          />
          <span class="ml-2">
            {{ sortMenuOpened ? 'Nieuwste eerst' : 'Oudste eerst' }}
          </span>
        </button>
      </div>
    </div>

    <div class="flex w-52 flex-col">
      <label
        class="mb-2 text-label-small text-on-surface-variant md:text-label-medium"
      >
        Filteren op:
      </label>
      <div class="flex flex-row gap-2">
        <button
          v-for="filter in activeFilters"
          :class="{
            'border-secondary-container bg-secondary-container': filter.active
          }"
          class="flex h-[32px] w-fit items-center rounded-lg border border-outline px-4 text-label-large text-on-surface"
          @click="toggleFilter(filter.name)"
        >
          <Icon
            :class="{ 'h-6 w-6 text-primary': filter.active }"
            :name="filter.icon[filter.active ? 2 : 0]"
            class="h-[18px] w-[18px] text-on-surface-variant"
          />
          <span class="ml-2 capitalize">
            {{ filter.name }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>
