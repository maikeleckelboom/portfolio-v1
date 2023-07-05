<script lang="ts" setup>
import { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const error = useError()

const errorMessage = ref<string>('')

if (error.value?.statusCode === 404 || '404') {
  errorMessage.value = 'Pagina niet gevonden 😔'
}

const handleError = () => clearError({ redirect: '/' })

const clientOrServerError = computed(
  () =>
    `${
      typeof error.value?.statusCode === 'number'
        ? 'Error in server response (500)'
        : 'Error in client request (404)'
    }`
)

const errorStatusCode = computed(() => error.value?.statusCode)
</script>

<template>
  <div class="grid h-d-screen place-items-center">
    <div class="grid">
      <div class="flex flex-col items-center justify-center">
        <h2 class="text-headline-large tabular-nums">
          {{ errorStatusCode }}
        </h2>
        <h1
          class="mb-4 text-center text-headline-medium text-lg font-medium text-on-surface-variant"
        >
          {{ errorMessage }}
        </h1>
        <p class="mb-4 text-center text-4xl text-title-large font-bold">
          {{ clientOrServerError }}
        </p>
        <button
          @click="handleError"
          class="text-white rounded-md bg-primary px-4 py-2 font-semibold text-on-primary"
        >
          Terug naar de homepagina
        </button>
      </div>

      <div class="mx-auto flex max-w-md flex-col p-12">
        <p class="whitespace-pre-wrap">{{ error }}</p>
      </div>
    </div>
  </div>
</template>
