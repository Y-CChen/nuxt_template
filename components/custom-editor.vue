<template>
  <custom-card
    class="d-flex flex-column"
    :flat="readonly"
    :outlined="!readonly"
    tile
  >
    <custom-floating
      v-if="!readonly && !toolbarResetting"
      v-slot="{ active }"
      :disabled="!floatingToolbar"
    >
      <div class="d-flex flex-column">
        <v-divider v-if="active" class="text--grey" />
        <custom-card class="pa-2 d-flex flex-wrap align-center gap-2" flat tile>
          <v-btn-toggle :value="textFormat" color="primary" dense multiple>
            <custom-btn
              v-for="textFormatItem in textFormatItems"
              :key="textFormatItem.value"
              text
              :value="textFormatItem.value"
              @click="textFormatItem.onClick"
            >
              <v-icon>{{ textFormatItem.icon }}</v-icon>
            </custom-btn>
          </v-btn-toggle>
          <custom-select v-model="headings" hide-details :items="headingItems">
            <template #item="{ item }">
              <div class="py-2">
                <span :class="item.class">{{ item.text }}</span>
              </div>
            </template>
          </custom-select>
        </custom-card>
        <v-divider class="text--grey" />
      </div>
    </custom-floating>
    <div
      :class="{
        'overflow-y-auto': true,
        'ma-2': !readonly,
      }"
    >
      <editor-content :editor="editor" />
    </div>
  </custom-card>
</template>

<script>
import { Bold } from '@tiptap/extension-bold';
import { Document } from '@tiptap/extension-document';
import { HardBreak } from '@tiptap/extension-hard-break';
import { Heading } from '@tiptap/extension-heading';
import { Italic } from '@tiptap/extension-italic';
import { Paragraph } from '@tiptap/extension-paragraph';
import { Strike } from '@tiptap/extension-strike';
import { Text } from '@tiptap/extension-text';
import { Editor, EditorContent } from '@tiptap/vue-2';
import CustomBtn from './custom-btn.vue';
import CustomCard from './custom-card.vue';
import CustomFloating from './custom-floating.vue';
import CustomSelect from './custom-select.vue';

const TextFormats = {
  bold: 'bold',
  italic: 'italic',
  strike: 'strike',
};

const Headings = {
  normal: 0,
  h1: 1,
  h2: 2,
  h3: 3,
  h4: 4,
  h5: 5,
  h6: 6,
};

export default {
  components: {
    CustomBtn,
    CustomCard,
    CustomFloating,
    CustomSelect,
    EditorContent,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    floatingToolbar: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      editor: null,
      toolbarResetting: false,
    };
  },
  computed: {
    textFormatItems() {
      return [
        {
          value: TextFormats.bold,
          icon: 'mdi-format-bold',
          onClick: ($event) => {
            this.textFormat.includes(TextFormats.bold)
              ? this.editor?.chain().focus().unsetBold().run()
              : this.editor?.chain().focus().setBold().run();
          },
        },
        {
          value: TextFormats.italic,
          icon: 'mdi-format-italic',
          onClick: ($event) => {
            this.textFormat.includes(TextFormats.italic)
              ? this.editor?.chain().focus().unsetItalic().run()
              : this.editor?.chain().focus().setItalic().run();
          },
        },
        {
          value: TextFormats.strike,
          icon: 'mdi-format-strikethrough',
          onClick: ($event) => {
            this.textFormat.includes(TextFormats.strike)
              ? this.editor?.chain().focus().unsetStrike().run()
              : this.editor?.chain().focus().setStrike().run();
          },
        },
      ];
    },
    headingItems() {
      return [
        {
          value: Headings.normal,
          text: this.$t('heading-normal'),
          class: undefined,
        },
        {
          value: Headings.h1,
          text: this.$t('heading-number', { number: 1 }),
          class: 'text-h1',
        },
        {
          value: Headings.h2,
          text: this.$t('heading-number', { number: 2 }),
          class: 'text-h2',
        },
        {
          value: Headings.h3,
          text: this.$t('heading-number', { number: 3 }),
          class: 'text-h3',
        },
        {
          value: Headings.h4,
          text: this.$t('heading-number', { number: 4 }),
          class: 'text-h4',
        },
        {
          value: Headings.h5,
          text: this.$t('heading-number', { number: 5 }),
          class: 'text-h5',
        },
        {
          value: Headings.h6,
          text: this.$t('heading-number', { number: 6 }),
          class: 'text-h6',
        },
      ];
    },
    textFormat() {
      return Object.values(TextFormats).filter((textFormat) =>
        this.editor?.isActive(textFormat),
      );
    },
    headings: {
      get() {
        return (
          Object.values(Headings).find((level) =>
            this.editor?.isActive('heading', { level }),
          ) || Headings.normal
        );
      },
      set(value) {
        if (value === Headings.normal) {
          this.editor?.chain().focus().setParagraph().run();
          return;
        }
        this.editor?.chain().focus().setHeading({ level: value }).run();
      },
    },
  },
  watch: {
    value(value) {
      // HTML
      const isSame = this.editor?.getHTML() === value;
      // JSON
      // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)
      if (isSame) {
        return;
      }
      this.editor?.commands.setContent(value, false);
    },
    floatingToolbar: {
      handler() {
        this.toolbarResetting = true;
        this.$nextTick(() => {
          this.toolbarResetting = false;
        });
      },
    },
  },
  mounted() {
    this.editor = new Editor({
      content: this.value,
      editable: !this.readonly,
      editorProps: {
        attributes: {
          class: 'custom-editor',
        },
      },
      extensions: [
        Bold.configure({
          HTMLAttributes: {
            class: 'font-weight-bold',
          },
        }),
        Document,
        HardBreak,
        Heading.configure({
          levels: Object.values(Headings).filter(
            (level) => level !== Headings.normal,
          ),
        }),
        Italic.configure({
          HTMLAttributes: {
            class: 'font-italic',
          },
        }),
        Paragraph.configure({
          HTMLAttributes: {
            class: 'text-body-1',
          },
        }),
        Strike.configure({
          HTMLAttributes: {
            class: 'text-decoration-line-through',
          },
        }),
        Text,
      ],
      onUpdate: () => {
        // HTML
        this.$emit('input', this.editor.getHTML());
        // JSON
        // this.$emit('input', this.editor.getJSON())
      },
    });
  },
  beforeDestroy() {
    this.editor?.destroy();
  },
};
</script>
