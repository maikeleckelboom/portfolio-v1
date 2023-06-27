<script lang="ts" setup>
const socials = ref([
  {
    name: 'github',
    url: 'https://github.com/maikeleckelboom',
    icon: 'ci:github'
  },
  {
    name: 'linkedin',
    url: 'https://www.linkedin.com/in/maikeleckelboom/',
    icon: 'ci:linkedin'
  }
])

const contact = ref([
  {
    name: 'phone',
    url: 'tel:+31612345678',
    icon: 'ic:baseline-phone'
  },
  {
    name: 'email',
    url: 'mailto:eckelboommaikel@gmail.com',
    icon: 'ic:baseline-email'
  }
])
</script>

<template>
  <ul class="mb-4 mt-8 flex gap-2">
    <li v-for="social in [...contact, ...socials]" :key="social.name">
      <a :href="social.url" class="flex aspect-square rounded-md p-2">
        <Icon :name="social.icon" />
      </a>
    </li>
  </ul>
</template>
