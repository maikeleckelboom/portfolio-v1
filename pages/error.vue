<script lang="ts" setup>
// default props available on error.vue
const props = defineProps({
  error: Object
})

// customise 404 message from script section
const error = useError()
if (error.value.statusCode === 404 || '404') {
  error.value.message = '[script]: Oops! Page not found 😔'
}

// clear error and redirect to home page
const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <template>
    <button @click="handleError">Clear errors</button>
  </template>
</template>
