<script lang="ts" setup>
import { EditorContent, EditorOptions, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import CharacterCount from '@tiptap/extension-character-count'
import Link from '@tiptap/extension-link'
import Focus from '@tiptap/extension-focus'

const editorContent = ref<InstanceType<typeof EditorContent>>()

const keepFocused = () => {
  if (!editorContent.value?.$el) return
  editorContent.value!.$el.classList.add('keep-focused')
}

const removeKeepFocused = () => {
  if (!editorContent.value?.$el) return
  editorContent.value!.$el.classList.remove('keep-focused')
}

const focusContentEditor = () => {
  if (!editorContent.value?.$el) return
  editorContent.value!.$el.focus()
}

const emit = defineEmits<{
  'update:modelValue': (value: string) => void
}>()

const { modelValue = '', maxLimit = 0 } = defineProps<{
  modelValue: string
  maxLimit?: number
}>()

const editor = useEditor({
  content: modelValue,
  extensions: [
    Underline,
    Focus.configure({
      className:
        'bg-secondary-container text-on-secondary-container rounded-md outline outline-[2px] outline-secondary-container',
      forceSelection: true,
      onBlur: removeKeepFocused,
      onFocus: keepFocused,
      onMousedown: focusContentEditor
    }),
    Link.configure({
      HTMLAttributes: {
        class: 'text-primary'
      }
    }),
    CharacterCount.configure({
      limit: maxLimit
    }),
    TextAlign.configure({
      types: ['heading', 'paragraph']
    }),
    StarterKit
  ],
  onUpdate: () => {
    if (!editor.value) return
    emit('update:modelValue', editor.value.getHTML() as any)
  }
} as EditorOptions)

const onActionClick = (slug, option = null) => {
  if (!editor.value) return
  const vm = editor.value.chain().focus()

  const actionTriggers = {
    bold: () => vm.toggleBold().run(),
    italic: () => vm.toggleItalic().run(),
    underline: () => vm.toggleUnderline().run(),
    strike: () => vm.toggleStrike().run(),
    bulletList: () => vm.toggleBulletList().run(),
    orderedList: () => vm.toggleOrderedList().run(),
    align: () => vm.setTextAlign(option).run(),
    undo: () => vm.undo().run(),
    redo: () => vm.redo().run(),
    unorderedList: () => vm.toggleBulletList().run(),
    link: () => {
      const url = prompt('URL')
      vm.toggleLink({ href: url }).run()
    },
    clear: () => {
      vm.clearNodes().run()
      vm.unsetAllMarks().run()
    }
  }

  actionTriggers[slug]()
}

const charactersCount = computed(() =>
  editor.value?.storage.characterCount.characters()
)
const wordsCount = computed(() => editor.value?.storage.characterCount.words())

const textActions = ref([
  {
    slug: 'bold',
    icon: 'ic:baseline-format-bold',
    active: 'bold'
  },
  {
    slug: 'italic',
    icon: 'ic:baseline-format-italic',
    active: 'italic'
  },
  {
    slug: 'link',
    icon: 'ic:baseline-link',
    active: 'link'
  },
  {
    slug: 'clear',
    icon: 'ic:baseline-clear',
    active: 'clear'
  }
  // {
  //   slug: 'underline',
  //   icon: 'ic:baseline-format-underlined',
  //   active: 'underline'
  // },
  // {
  //   slug: 'strike',
  //   icon: 'ic:baseline-strikethrough-s',
  //   active: 'strike'
  // },
  // {
  //   slug: 'align',
  //   option: 'left',
  //   icon: 'ic:baseline-format-align-left',
  //   active: {
  //     textAlign: 'left'
  //   }
  // }
  // {
  //   slug: 'align',
  //   option: 'center',
  //   icon: 'ic:baseline-format-align-center',
  //   active: { textAlign: 'center' }
  // },
  // {
  //   slug: 'align',
  //   option: 'right',
  //   icon: 'ic:baseline-format-align-right',
  //   active: { textAlign: 'right' }
  // },
  // {
  //   slug: 'align',
  //   option: 'justify',
  //   icon: 'ic:baseline-format-align-justify',
  //   active: { textAlign: 'justify' }
  // },
  // {
  //   slug: 'bulletList',
  //   icon: 'ic:baseline-format-list-bulleted',
  //   active: 'bulletList'
  // },
  // {
  //   slug: 'orderedList',
  //   icon: 'ic:baseline-format-list-numbered',
  //   active: 'orderedList'
  // },
  // {
  //   slug: 'undo',
  //   icon: 'ic:baseline-undo',
  //   active: 'undo'
  // },
  // {
  //   slug: 'redo',
  //   icon: 'ic:baseline-redo',
  //   active: 'redo'
  // },
  // {
  //   slug: 'unorderedList',
  //   icon: 'ic:baseline-format-list-bulleted',
  //   active: 'bulletList'
  // }
])

watch(
  () => modelValue,
  (value) => {
    if (editor.value?.getHTML() === value) return
    editor.value?.commands.setContent(value, false)
  }
)

const onHeadingClick = (index) => {
  const vm = editor.value?.chain().focus()
  vm.toggleHeading({ level: index }).run()
}
</script>

<template>
  <div v-if="editor">
    <div class="flex w-full">
      <div
        class="border-tl-outline-variant group group relative flex w-full flex-nowrap"
      >
        <button
          class="flex h-[48px] w-full flex-nowrap items-center justify-center gap-4 rounded-tl-md border-l border-r border-t border-l-outline-variant border-r-transparent border-t-outline-variant bg-surface px-2 group-hover:border-r-outline-variant focus-visible:z-10"
          tabindex="0"
        >
          Heading
          <Icon name="ic:round-keyboard-arrow-down" />
        </button>
        <div
          class="absolute inset-x-0 z-20 mt-12 hidden flex-col rounded-b-xl border border-t-transparent bg-surface group-hover:flex hover:border-r"
        >
          <a
            v-for="index in 6"
            :class="{ active: editor.isActive('heading', { level: index }) }"
            :style="{ fontSize: 20 - index + 'px' }"
            class="flex items-center px-4 py-2 hover:bg-surface-level-3"
            role="button"
            @click.prevent="onHeadingClick(index)"
          >
            H{{ index }}
          </a>
        </div>
      </div>

      <button
        v-for="{ slug, option, active, icon } in textActions"
        :key="slug"
        :class="{
          'bg-primary-container text-on-primary-container':
            editor.isActive(active),
          'bg-surface text-on-surface-variant': !editor.isActive(active)
        }"
        class="flex aspect-square h-12 w-full items-center justify-center border-t border-outline-variant p-2 last:rounded-tr-md last:border-r focus-visible:z-10 active:z-10"
        @click.prevent="onActionClick(slug, option)"
      >
        <Icon :name="icon" />
      </button>
    </div>

    <div class="text-body-large">
      <EditorContent :editor="editor" spellcheck="false" />
    </div>

    <div
      class="relative -mt-10 flex h-fit w-full items-center justify-end gap-1 px-4 py-3 text-body-small"
    >
      <span :class="maxLimit ? 'text-on-surface-variant' : 'text-on-surface'">
        {{ charactersCount }}
        {{ maxLimit ? `/ ${maxLimit} characters` : 'characters' }}
      </span>
      <span class="mx-1 text-on-surface-variant">|</span>
      <span> {{ wordsCount }} words </span>
    </div>
  </div>
</template>

<style lang="postcss">
.ProseMirror[contenteditable='true'] {
  @apply min-h-[180px] overflow-y-auto rounded-t-[0px]  border-x border-b border-outline-variant px-4 py-2 outline-none  focus-visible:bg-surface;

  > p:first-child {
    @apply mt-1;
  }

  p {
    @apply h-fit;
  }

  > h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    &:first-child {
      @apply mt-1;
    }
  }
}
</style>
