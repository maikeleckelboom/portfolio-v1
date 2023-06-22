<script lang="ts" setup>
import { IExperience } from '~/types/experience'

const { data } = await useAsyncData(
  'experiences',
  async () =>
    await $fetch('/api/experiences', {
      method: 'GET',
      headers: useRequestHeaders(['cookie'])
    }),
  {
    transform: ({ data }) => {
      if (!Array.isArray(data)) return data

      return (data as IExperience[]).map((experience: IExperience) => {
        const dateStart = new Date(experience.dateStart).toLocaleDateString(
          'nl-NL',
          {
            month: 'short',
            year: 'numeric'
          }
        )
        const dateEnd = new Date(experience.dateEnd).toLocaleDateString(
          'nl-NL',
          {
            month: 'short',
            year: 'numeric'
          }
        )

        return {
          ...experience,
          dateStart,
          dateEnd
        }
      }) satisfies IExperience[]
    }
  }
)

const yearFromDate = (date: string) => {
  return new Date(date).getFullYear()
}

const getYearsOfExperience = () => {
  if (!data.value) return 0
  return data
    .value!.map(
      (experience) =>
        yearFromDate(experience.dateEnd) - yearFromDate(experience.dateStart)
    )
    .reduce((a, b) => a + b, 0)
}

const yearFromShortDate = (date: string) => {
  return new Date(date).toLocaleDateString('nl-NL', {
    year: 'numeric'
  })
}

const monthFromShortDate = (date: string) => {
  return new Date(date).toLocaleDateString('nl-NL', {
    month: 'short'
  })
}

const getYearsOfExperienceRange = () => {
  if (!data.value) return ''
  const years = data.value?.map((experience) => {
    return yearFromShortDate(experience.dateStart)
  })
  return `${Math.min(...years)} - ${Math.max(...years)}`
}

const yearsOfExperience = computed(getYearsOfExperienceRange)
</script>

<template>
  <div class="flex flex-col">
    <div class="pb-4">
      <CardsToolbar />
    </div>
    <div
      v-for="(experience, key) in data"
      :key="key"
      class="grid-cols-container grid"
    >
      <div class="flex flex-col py-1">
        <span class="text-end text-label-medium tabular-nums">
          <span class="italic opacity-70">
            {{ monthFromShortDate(experience.dateEnd) }}
          </span>
          {{ yearFromShortDate(experience.dateEnd) }}
        </span>
        <span class="text-end text-label-small tabular-nums">
          <span class="italic opacity-70">
            {{ monthFromShortDate(experience.dateStart) }}
          </span>
          {{ yearFromShortDate(experience.dateStart) }}
        </span>
      </div>
      <div class="">
        <div class="flex flex-col">
          <h3 class="text-on-surface-variant">
            <span class="mb-0.5 text-title-medium">
              {{ experience.roleName }}
            </span>
            <span class="mb-0.5 px-0.5 text-title-medium">@</span>
            <a :href="experience.companyWebsite" class="text-title-medium"
              >{{ experience.companyName }}
            </a>
          </h3>
          <p class="mb-1.5 -skew-x-2 text-on-surface-variant">
            {{ experience.companyDescription }}
          </p>
          <strong v-if="experience.roleDescriptionLabel" class="mb-1.5">
            {{ experience.roleDescriptionLabel }}
          </strong>
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

        <div class="col-start-2 mb-4 mt-3">
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
