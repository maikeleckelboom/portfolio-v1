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
            expanded: false,
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
            expanded: boolean
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

const sortDirection = ref<1 | -1>(-1)
const onSortChange = (sort: 1 | -1) => (sortDirection.value = sort)

const filtersFilter = (experience: IExperience) =>
  filters.value.filter((f) => f.active).some((f) => f.name === experience.type)

const sortFilter = (a: IExperience, b: IExperience) =>
  new Date(b.dateStart).getTime() - new Date(a.dateStart).getTime()

const filteredData = computed(() => {
  if (!data.value) {
    return []
  }
  const filtered = data.value!.filter(filtersFilter)
  return sortDirection.value === -1
    ? filtered.sort(sortFilter)
    : filtered.sort((a, b) => sortFilter(b, a))
}) as ComputedRef<
  (IExperience & {
    expanded: boolean
    date: {
      start: string
      end: string
      duration: string
    }
  })[]
>
</script>

<template>
  <ol
    class="relative flex h-[calc(100dvh-66px)] flex-col gap-y-8 border-l py-2 pt-4"
  >
    <li v-for="(portfolio, n) in filteredData" :key="n" class="ml-6 gap-1">
      <div
        class="absolute -left-1.5 mt-2 h-3 w-3 rounded-full border border-outline bg-surface-container hover:bg-primary"
      />

      <h3 class="mb-1 text-base font-normal">
        <span class="mb-0.5 text-title-medium">
          {{ portfolio.roleName }}
        </span>
        <span class="w-full whitespace-nowrap">
          <span class="text-sm"> @ </span>
          <a :href="portfolio.companyWebsite" class="mt-1 text-title-medium">
            {{ portfolio.companyName }}
            <Icon class="h-3 w-3 text-primary" name="ic:baseline-open-in-new" />
          </a>
        </span>
        <span
          v-if="n === 0"
          class="ml-3 inline-flex items-center rounded-md border border-primary-container bg-primary-container px-2.5 py-1 text-label-small font-bold uppercase leading-4 text-on-primary-container"
        >
          Laatste
        </span>
      </h3>
      <time class="mb-0.5 flex text-sm font-normal leading-none">
        <span class="text-label-medium tabular-nums">
          <span class="italic opacity-70">
            {{ monthFromShortDate(portfolio.date.end) }}
          </span>
          {{ yearFromShortDate(portfolio.date.end) }}
        </span>
        <span class="mx-1">-</span>
        <span class="text-label-medium tabular-nums">
          <span class="italic opacity-70">
            {{ monthFromShortDate(portfolio.date.start) }}
          </span>
          {{ yearFromShortDate(portfolio.date.start) }}
        </span>
        <span class="ml-2 text-label-medium tabular-nums">
          ({{ portfolio.date.duration }})
        </span>
      </time>
      <!--      <p-->
      <!--        class="skew-x-3 text-label-small font-normal leading-none text-on-surface-variant"-->
      <!--      >-->
      <!--        {{ portfolio.companyDescription }}-->
      <!--      </p>-->
      <div></div>
    </li>
  </ol>
</template>

<style lang="postcss">
h1,
h2,
h3,
h4,
h5,
h6 {
  text-wrap: balance;
}

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
