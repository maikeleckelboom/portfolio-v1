<script lang="ts" setup>
import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent } from '@tiptap/vue-3'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

watch(
  () => props.modelValue,
  (value) => {
    // HTML
    // const isSame = editor.value!.getHTML() === value

    console.log(this.editor.getJSON())
    // JSON
    const isSame =
      JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

    if (isSame) {
      return
    }

    editor.value!.commands.setContent(value, false)
  }
)

const emit = defineEmits(['update:modelValue'])

const editor = shallowRef<InstanceType<typeof Editor>>()

onBeforeUnmount(() => {
  editor.value!.destroy()
})

onMounted(() => {
  editor.value = new Editor({
    extensions: [StarterKit],
    content: props.modelValue,
    onUpdate: () => {
      // HTML
      emit('update:modelValue', editor.value!.getHTML())

      // JSON
      // this.$emit('update:modelValue', this.editor.getJSON())
    }
  })
})
</script>

<template>
  <EditorContent :editor="editor!" />
</template>
