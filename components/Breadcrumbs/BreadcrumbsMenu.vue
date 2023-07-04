<script lang="ts" setup>
const isOpened = ref<boolean>(false)
const open = () => {
  isOpened.value = true
}

const close = () => {
  isOpened.value = false
}

const route = useRoute()
</script>

<template>
  <li>
    <button
      @click="open"
      class="group flex h-12 w-fit items-center rounded-xl pl-4 hover:bg-outline-variant/20 active:bg-outline-variant/30"
    >
      <span class="text-shadow-bold">
        {{ route.params.slug }}
      </span>
      <span class="flex h-10 w-10 items-center justify-center">
        <Icon class="mt-1 h-6 w-6" name="ic:round-arrow-drop-down" />
      </span>
    </button>
    <BreadcrumbsMenuContent v-if="isOpened" @close="close" />
  </li>
</template>
