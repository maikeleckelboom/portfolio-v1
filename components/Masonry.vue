<script lang="ts" setup>
type IMasonry = {
  image: string
  children?: IMasonry[]
}

interface Props {
  items: IMasonry[]
}

const props = defineProps<Props>()
</script>

<template>
  <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
    <div class="grid gap-4">
      <div>
        <img
          alt=""
          class="h-auto max-w-full rounded-lg"
          src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg"
        />
      </div>
      <div>
        <img
          alt=""
          class="h-auto max-w-full rounded-lg"
          src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg"
        />
      </div>
      <div>
        <img
          alt=""
          class="h-auto max-w-full rounded-lg"
          src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg"
        />
      </div>
    </div>
    <div class="grid gap-4">
      <div>
        <img
          alt=""
          class="h-auto max-w-full rounded-lg"
          src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg"
        />
      </div>
      <div>
        <img
          alt=""
          class="h-auto max-w-full rounded-lg"
          src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg"
        />
      </div>
      <div>
        <img
          alt=""
          class="h-auto max-w-full rounded-lg"
          src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg"
        />
      </div>
    </div>
    <div class="grid gap-4">
      <div>
        <img
          alt=""
          class="h-auto max-w-full rounded-lg"
          src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg"
        />
      </div>
      <div>
        <img
          alt=""
          class="h-auto max-w-full rounded-lg"
          src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg"
        />
      </div>
      <div>
        <img
          alt=""
          class="h-auto max-w-full rounded-lg"
          src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg"
        />
      </div>
    </div>
    <div class="grid gap-4">
      <div>
        <img
          alt=""
          class="h-auto max-w-full rounded-lg"
          src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg"
        />
      </div>
      <div>
        <img
          alt=""
          class="h-auto max-w-full rounded-lg"
          src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg"
        />
      </div>
      <div>
        <img
          alt=""
          class="h-auto max-w-full rounded-lg"
          src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg"
        />
      </div>
    </div>
    <div v-for="item in props.items" :key="item.id" class="grid gap-4">
      <div>
        <img :src="item.image" alt="" class="h-auto max-w-full rounded-lg" />
      </div>
      <div>
        <img :src="item.image" alt="" class="h-auto max-w-full rounded-lg" />
      </div>
      <div>
        <img :src="item.image" alt="" class="h-auto max-w-full rounded-lg" />
      </div>
      <div v-if="item.children">
        <Masonry :items="item.children" />
      </div>
    </div>
  </div>
</template>
