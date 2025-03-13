<template>
  <custom-card flat tile>
    <custom-editor v-model="content" floating-toolbar :readonly="preview" />
    <custom-floating v-slot="{ active }" bottom>
      <custom-card class="pa-2 d-flex justify-end" :flat="!active" tile>
        <custom-btn @click="preview = !preview">{{
          preview ? $t('edit') : $t('preview')
        }}</custom-btn>
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
      preview: true,
      content:
        '<p class="text-body-1">Don\'t ignore your dreams; don\'t work too much; say what you think; cultivate friendships; be happy.</p><p class="text-body-1"><em class="font-italic">                                                                                                                                                          -- Paul Graham</em></p>',
    };
  },
};
</script>
