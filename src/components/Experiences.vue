<script lang="ts" setup>
import { IExperience } from '~/types/experience'

const client = useSupabaseClient()
const { data } = await useAsyncData(
  'experiences',
  async () =>
    await client
      .from('experiences')
      .select('*')
      .order('dates', { ascending: false }),
  {
    transform: ({ data }) => data as IExperience[]
  }
)
</script>

<template>
  <div>
    <pre>{{ data }}</pre>
  </div>
</template>
