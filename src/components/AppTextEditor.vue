<script>
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import CharacterCount from '@tiptap/extension-character-count'
import { Link } from '@tiptap/extension-link'
import Paragraph from '@tiptap/extension-paragraph'
import Focus from '@tiptap/extension-focus'

export default {
  components: {
    EditorContent
  },
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    maxLimit: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      editor: null,
      textActions: [
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
          slug: 'underline',
          icon: 'ic:baseline-format-underlined',
          active: 'underline'
        },
        {
          slug: 'strike',
          icon: 'ic:baseline-strikethrough-s',
          active: 'strike'
        },
        {
          slug: 'link',
          icon: 'ic:baseline-link',
          active: 'link'
        },
        {
          slug: 'align',
          option: 'left',
          icon: 'ic:baseline-format-align-left',
          active: {
            textAlign: 'left'
          }
        },
        {
          slug: 'align',
          option: 'center',
          icon: 'ic:baseline-format-align-center',
          active: { textAlign: 'center' }
        },
        {
          slug: 'align',
          option: 'right',
          icon: 'ic:baseline-format-align-right',
          active: { textAlign: 'right' }
        },
        {
          slug: 'align',
          option: 'justify',
          icon: 'ic:baseline-format-align-justify',
          active: { textAlign: 'justify' }
        },
        {
          slug: 'bulletList',
          icon: 'ic:baseline-format-list-bulleted',
          active: 'bulletList'
        },
        {
          slug: 'orderedList',
          icon: 'ic:baseline-format-list-numbered',
          active: 'orderedList'
        },
        {
          slug: 'undo',
          icon: 'ic:baseline-undo',
          active: 'undo'
        },
        {
          slug: 'redo',
          icon: 'ic:baseline-redo',
          active: 'redo'
        },
        {
          slug: 'clear',
          icon: 'ic:baseline-clear',
          active: 'clear'
        }
      ]
    }
  },
  computed: {
    charactersCount() {
      return this.editor.storage.characterCount.characters()
    },
    wordsCount() {
      return this.editor.storage.characterCount.words()
    }
  },
  watch: {
    modelValue(value) {
      if (this.editor.getHTML() === value) return
      this.editor.commands.setContent(this.modelValue, false)
    }
  },
  methods: {
    onActionClick(slug, option = null) {
      const vm = this.editor.chain().focus()
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
    },
    onHeadingClick(index) {
      const vm = this.editor.chain().focus()
      console.log('value', index)
      vm.toggleHeading({ level: index }).run()
    }
  },
  mounted() {
    this.editor = new Editor({
      content: this.modelValue,
      extensions: [
        Underline,
        Focus.configure({
          className: 'bg-tertiary-container/50 text-on-tertiary-container'
        }),
        Document,
        Text,
        Link.configure({
          HTMLAttributes: {
            class: 'text-primary'
          }
        }),
        CharacterCount.configure({
          limit: this.maxLimit
        }),
        TextAlign.configure({
          types: ['heading', 'paragraph']
        }),
        StarterKit
      ],
      onUpdate: () => {
        this.$emit('update:modelValue', this.editor.getHTML())
      }
    })
  },
  beforeUnmount() {
    this.editor.destroy()
  }
}
</script>

<template>
  <div v-if="editor" class="grid w-full grid-flow-col">
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

  <EditorContent :editor="editor" />

  <div
    v-if="editor"
    class="flex h-fit w-full items-center justify-end gap-1 px-2 py-3"
  >
    <span :class="maxLimit ? 'text-on-surface-variant' : 'text-on-surface'">
      {{ charactersCount }}
      {{ maxLimit ? `/ ${maxLimit} characters` : 'characters' }}
    </span>
    <span class="mx-1 text-label-small text-on-surface-variant">|</span>
    <span> {{ wordsCount }} words </span>
  </div>
</template>

<style lang="postcss">
.ProseMirror[contenteditable='true'] {
  @apply min-h-[180px] overflow-y-auto rounded-t-[0px]  border-x border-b border-outline-variant px-2 py-1 outline-none focus-visible:border-t-0 focus-visible:bg-surface-level-2;

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
