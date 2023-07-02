<script setup lang="ts">
import { ITimelineItem } from '~/types/portfolio'

const props = defineProps<{
  data: ITimelineItem
}>()
</script>

<template>
  <div class="flex flex-col">
    <fieldset class="grid grid-cols-2 gap-4">
      <div class="flex flex-col">
        <sub
          class="mb-1.5 flex -skew-x-6 text-label-small text-on-surface-variant md:text-label-medium"
        >
          Functietitel
        </sub>
        <h1 class="mb-4 text-body-large">{{ data.roleName }}</h1>
      </div>
      <div class="flex flex-col">
        <sub
          class="mb-1.5 flex -skew-x-6 text-label-small text-on-surface-variant md:text-label-medium"
        >
          Dienstverband
        </sub>
        <h1 class="mb-4 text-body-large capitalize">
          {{ data.type === 'job' ? 'Baan' : 'Stage' }}
          <span>- {{ data.contractType }}</span>
        </h1>
      </div>
    </fieldset>
    <fieldset class="grid grid-cols-2 gap-4">
      <div class="flex flex-col">
        <sub
          class="mb-1.5 flex -skew-x-6 text-label-small text-on-surface-variant md:text-label-medium"
        >
          Bedrijf
        </sub>
        <h1 class="mb-4 text-body-large">{{ data.companyName }}</h1>
      </div>
      <div class="flex flex-col">
        <sub
          class="mb-1.5 flex -skew-x-6 text-label-small text-on-surface-variant md:text-label-medium"
        >
          Locatie
        </sub>
        <h1 class="mb-4 text-body-large">{{ data.companyLocation }}</h1>
      </div>
    </fieldset>
    <fieldset>
      <sub
        class="mb-1.5 flex -skew-x-6 text-label-small text-on-surface-variant md:text-label-medium"
      >
        Bedrijfsomschrijving
      </sub>
      <h1 class="mb-4 text-body-large">
        {{ data.companyDescription }}
      </h1>
    </fieldset>
    <fieldset>
      <sub
        class="mb-1.5 flex -skew-x-6 text-label-small text-on-surface-variant md:text-label-medium"
      >
        Periode
      </sub>
      <h1 class="mb-4 text-body-large">
        {{ data.dates.start }} - {{ data.dates.end }} ({{
          data.dates.duration
        }})
      </h1>
    </fieldset>
    <fieldset>
      <sub
        class="mb-1.5 flex -skew-x-6 flex-col text-label-small text-on-surface-variant md:text-label-medium"
      >
        Taken en verantwoordelijkheden
      </sub>
      <ul class="">
        <li
          v-for="listItem in data.roleDescription.split('--').slice(1)"
          class="list-disc pl-5 text-body-large"
        >
          {{ listItem }}
        </li>
      </ul>
    </fieldset>
    <fieldset class="mt-6 flex">
      <TheTags :tags="data.tags" />
    </fieldset>
  </div>
</template>
