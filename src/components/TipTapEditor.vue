<script lang="ts" setup>
import { Editor, EditorContent, JSONContent, useEditor } from '@tiptap/vue-3'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import EditorToolbar from '~/components/EditorToolbar.vue'
import { Heading } from '@tiptap/extension-heading'
import { BulletList } from '@tiptap/extension-bullet-list'
import { ListItem } from '@tiptap/extension-list-item'

const emit = defineEmits<{
  'update:modelValue': (value: string) => void
}>()

const props = defineProps<{
  modelValue: string
}>()

const editor = useEditor({
  extensions: [
    Document.configure({}),
    Text.configure({
      HTMLAttributes: {
        class: 'text-on-surface'
      }
    }),
    Heading.configure({
      levels: [1, 2, 3]
    }),
    BulletList.configure({
      HTMLAttributes: {
        class: 'list-disc list-inside'
      }
    }),
    ListItem,
    Document.configure({}),
    Paragraph.configure({})
  ],
  content: props.modelValue,
  onUpdate: () => {
    const htmlV = editor.value!.getHTML()
    console.log('htmlV', htmlV)
    emit('update:modelValue', htmlV as any)
  }
})

const editorContent = ref<InstanceType<typeof EditorContent>>()

const keepFocused = (editorContentRef) => {
  if (!editorContent.value?.$el) return
  editorContent.value!.$el.classList.add('keep-focused')
}

const removeKeepFocused = (editorContentRef) => {
  if (!editorContent.value?.$el) return
  editorContent.value!.$el.classList.remove('keep-focused')
}

const focusContentEditor = (editorContentRef) => {
  if (!editorContent.value?.$el) return
  editorContent.value!.$el.focus()
}

watch(
  () => props.modelValue,
  (value) => {
    if (!editor.value) return

    const isSame = editor.value!.getHTML() === value
    if (isSame) {
      return
    }

    editor.value!.commands.setContent(value, false)
  }
)
</script>

<template>
  <div
    class="min-h-[48px] rounded-xl border border-outline-variant bg-surface text-on-surface"
  >
    <EditorToolbar v-if="editor" :editor="editor" />
    <EditorContent
      v-if="editor"
      ref="editorContent"
      :editor="editor"
      class="flex h-full w-full rounded-xl"
    />
  </div>
</template>

<style lang="postcss"></style>
