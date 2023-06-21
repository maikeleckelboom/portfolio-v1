<script lang="ts" setup>
import { IExperience } from '~/types/experience'

const { data: experienceList } = await useAsyncData(
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
        return {
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
          })
        }
      })
    }
  }
)
</script>

<template>
  <div class="flex max-w-xl flex-col">
    <div
      v-for="(experience, key) in experienceList"
      :key="key"
      class="grid grid-cols-[auto,1fr] gap-x-3 gap-y-1.5 p-2 py-4 md:gap-x-6"
    >
      <div class="flex flex-col border-r-outline-variant p-1">
        <span class="text-end text-label-medium tabular-nums">
          <span class="italic opacity-70">{{
            experience.dateEnd.split(' ').at(0)
          }}</span>
          {{ experience.dateEnd.split(' ').at(1) }}
        </span>
        <span class="text-end text-label-small tabular-nums">
          <span class="italic opacity-70">{{
            experience.dateStart.split(' ').at(0)
          }}</span>
          {{ experience.dateStart.split(' ').at(1) }}
        </span>
      </div>
      <div class="">
        <div class="flex flex-col">
          <h3 class="text-on-surface-variant">
            <span class="mb-0.5 text-title-medium">
              {{ experience.roleName }}
            </span>
            <span class="mb-0.5 ml-1 mr-0.5 text-title-medium">@</span>
            <a :href="experience.companyWebsite" class="text-title-medium"
              >{{ experience.companyName }}
            </a>
          </h3>
          <p class="mb-1.5 -skew-x-6 text-on-surface-variant">
            {{ experience.companyDescription }}
          </p>
          <strong v-if="experience.roleDescriptionLabel" class="mb-1.5">
            {{ experience.roleDescriptionLabel }}
          </strong>
        </div>
        <div class="mb-1.5 flex flex-col gap-1">
          <ul class="pl-2">
            <li
              v-for="bulletPoint in experience.roleDescription
                .trim()
                .split('- ')
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
      <div class="col-start-2">
        <TheTags :tags="experience.tags" />
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
      @apply ml-8 flex items-center justify-center;
    }
  }
}
</style>
