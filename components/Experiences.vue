<script lang="ts" setup>
import { IExperience } from '~/types/experience'
import humanizeDuration from 'humanize-duration'
import { ComputedRef } from 'vue'

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
            date: {
              start: new Date(experience.dateStart).toLocaleDateString(
                'nl-NL',
                {
                  month: 'short',
                  year: 'numeric'
                }
              ),
              end: new Date(experience.dateEnd).toLocaleDateString('nl-NL', {
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
            }
          } as IExperience & {
            date: {
              start: string
              end: string
              duration: string
            }
          })
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

const onFilterChange = (filter: IFilter) => {
  const f =
    filters.value[filters.value.findIndex((f) => f.name === filter.name)]
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
}) as ComputedRef<
  (IExperience & {
    date: {
      start: string
      end: string
      duration: string
    }
  })[]
>
</script>

<template>
  <div class="grid gap-4">
    <div v-for="experience in filteredData" :key="experience.id">
      <div class="grid-cols-container grid gap-2 rounded-md p-4">
        <div class="flex h-full flex-col px-0.5 py-2.5 text-end">
          <span class="text-label-medium tabular-nums">
            <span class="italic opacity-70">
              {{ monthFromShortDate(experience.date.end) }}
            </span>
            {{ yearFromShortDate(experience.date.end) }}
          </span>
          <span class="text-label-medium tabular-nums">
            <span class="italic opacity-70">
              {{ monthFromShortDate(experience.date.start) }}
            </span>
            {{ yearFromShortDate(experience.date.start) }}
          </span>
        </div>
        <div class="flex flex-col">
          <div class="flex flex-col">
            <h3 class="text-title-large">
              <span class="mb-0.5 text-title-medium">
                {{ experience.roleName }}
              </span>
              <span class="text-sm"> @ </span>
              <a :href="experience.companyWebsite" class="text-title-medium">
                {{ experience.companyName }}
                <Icon
                  class="h-3 w-3 text-primary"
                  name="ic:baseline-open-in-new"
                />
              </a>
            </h3>
            <p class="mb-1.5 -skew-x-2 text-on-surface-variant">
              {{ experience.companyDescription }}
            </p>
          </div>
          <div class="mb-1.5 flex flex-col gap-1">
            <ul class="pl-1">
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
        </div>
        <div v-if="experience.tags" class="col-start-2">
          <TheTags :tags="experience.tags" />
        </div>
      </div>
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
