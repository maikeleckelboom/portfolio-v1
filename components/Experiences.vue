<script lang="ts" setup>
import { CardsToolbar } from '#components'
import { IExperience } from '~/types/experience'
import humanizeDuration from 'humanize-duration'

const { data } = await useAsyncData(
  'experiences',
  async () =>
    await $fetch('/api/experiences', {
      method: 'GET',
      headers: useRequestHeaders(['cookie'])
    }),
  {
    transform: ({ data }) =>
      (data as IExperience[]).map(
        (experience) =>
          ({
            ...experience,
            dateStart: new Date(experience.dateStart).toLocaleDateString(
              'nl-NL',
              {
                month: 'short',
                year: 'numeric'
              }
            ),
            dateEnd: new Date(experience.dateEnd).toLocaleDateString('nl-NL', {
              month: 'short',
              year: 'numeric'
            }),
            duration: humanizeDuration(
              new Date(experience.dateEnd).getTime() -
                new Date(experience.dateStart).getTime(),
              {
                language: 'nl',
                largest: 1
              }
            )
          } as IExperience & { duration: string })
      )
  }
)

const filters = ref<IFilter[]>([
  {
    name: 'job',
    label: 'Werk',
    icon: ['ic:round-cases', 'ic:round-check'],
    active: true
  },
  {
    name: 'internship',
    label: 'Stage',
    icon: ['ic:baseline-psychology', 'ic:round-check'],
    active: true
  }
])

const onFilterChange = (filter: string) => {
  const findFn = (f) => f.name === filter
  const f = filters.value[filters.value.findIndex(findFn)]
  f.active = !f.active
}

const sortDirection = ref<'ascend' | 'descend'>('ascend')
const onSortChange = (sort: 'ascend' | 'descend') =>
  (sortDirection.value = sort)

const filtersFilter = (experience: IExperience) =>
  filters.value.filter((f) => f.active).some((f) => f.name === experience.type)

const sortFilter = (a: IExperience, b: IExperience) =>
  new Date(b.dateStart).getTime() - new Date(a.dateStart).getTime()

const filteredData = computed(() => {
  if (!data.value) {
    return []
  }
  const filtered = data.value!.filter(filtersFilter)
  return sortDirection.value === 'ascend'
    ? filtered.sort(sortFilter)
    : filtered.sort((a, b) => sortFilter(b, a))
})
</script>

<template>
  <div class="flex flex-col">
    <div v-for="experience in filteredData" :key="experience.id">
      <div class="grid-cols-container grid">
        <div class="flex flex-col py-1">
          <span class="text-end text-label-medium tabular-nums">
            <span class="italic opacity-70">
              {{ monthFromShortDate(experience.dateEnd) }}
            </span>
            {{ yearFromShortDate(experience.dateEnd) }}
          </span>
          <span class="text-end text-label-medium tabular-nums">
            <span class="italic opacity-70">
              {{ monthFromShortDate(experience.dateStart) }}
            </span>
            {{ yearFromShortDate(experience.dateStart) }}
          </span>
        </div>
        <div class="flex flex-col">
          <div class="flex flex-col">
            <h3 class="text-on-surface-variant">
              <span class="mb-0.5 text-title-medium">
                {{ experience.roleName }}
              </span>
              <a :href="experience.companyWebsite" class="text-title-medium">
                @{{ experience.companyName }}
              </a>
            </h3>
            <p class="mb-1.5 -skew-x-2 text-on-surface-variant">
              {{ experience.companyDescription }}
            </p>
          </div>
          <div class="mb-1.5 flex flex-col gap-1">
            <ul class="pl-3">
              <li
                v-for="bulletPoint in experience.roleDescription
                  .split('--')
                  .slice(1)"
                class="list-disc"
              >
                <span class="text-body-medium">
                  {{ bulletPoint }}
                </span>
              </li>
            </ul>
          </div>
          <div v-if="experience.tags" class="col-start-2 mb-4 mt-3">
            <TheTags :tags="experience.tags" />
          </div>
        </div>
      </div>
    </div>
    <div class="py-6">
      <CardsToolbar
        ref="toolbar"
        :filters="filters"
        @filter="onFilterChange"
        @sort="onSortChange"
      />
    </div>
  </div>
</template>

<style lang="postcss">
ul:has(.list-disc) {
  list-style-position: inside;

  .list-disc {
    list-style-type: disc;

    &::marker {
      @apply flex items-center justify-center;
    }
  }
}
</style>
