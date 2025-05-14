<template>
  <a ref="link" class="d-none" />
</template>

<script>
import { makeFilename, MimeTypes } from '~/utils/constant';

export default {
  computed: {
    MimeTypes() {
      return MimeTypes;
    },
  },
  methods: {
    async downloadBlob({ url, data, mimeType, filename } = {}) {
      try {
        this.$emit('downloading', true);
        let blob;
        if (url) {
          const response = await fetch(url);
          blob = await response.blob();
        } else {
          blob = new Blob([data], { type: mimeType });
        }
        const link = this.$refs.link;
        link.href = URL.createObjectURL(blob);
        link.download = makeFilename(mimeType, filename);
        link.click();
        URL.revokeObjectURL(link.href);
      } finally {
        this.$emit('downloading', false);
      }
    },
    downloadLink({ url, mimeType, filename } = {}) {
      try {
        this.$emit('downloading', true);
        const link = this.$refs.link;
        link.href = url;
        link.download = makeFilename(mimeType, filename);
        link.click();
      } finally {
        this.$emit('downloading', false);
      }
    },
  },
};
</script>
