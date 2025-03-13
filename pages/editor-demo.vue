<template>
  <custom-card flat tile>
    <custom-editor v-if="preview" v-model="editor" readonly />
    <custom-editor v-else v-model="editor" floating-toolbar />
    <custom-floating v-slot="{ active }" bottom>
      <custom-card class="pa-2 d-flex justify-end" :flat="!active" tile>
        <custom-btn @click="preview = !preview">{{ $t('preview') }}</custom-btn>
      </custom-card>
    </custom-floating>
  </custom-card>
</template>

<script>
export default {
  name: 'EditorDemoPage',
  auth: false,
  data() {
    return {
      preview: false,
      editor: '',
    };
  },
};
</script>
