<template>
  <v-img :src="`${$nuxt.context.env.baseUrl}/header.svg`" width="100%" light>
    <v-container fluid="true" style="width: 100%; height: 100%;">
      <v-row no-gutters style="height: 100%;" align="end" justify="end">
        <v-col cols="auto">
          <v-row no-gutters>
            <template v-for="(l, i) in links">
              <v-col
                v-if="l.text"
                :key="l.text"
                class="d-flex align-center"
                cols="auto"
              >
                <v-icon v-if="l.icon">
                  {{ l.icon }}
                </v-icon>
                {{ l.text }}
              </v-col>
              <v-col :key="i" cols="auto">
                <v-divider class="mx-4" vertical />
              </v-col>
            </template>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-img>
</template>

<script>
export default {
  data: () => ({
    links: [
      {},
      { text: '優選優勢' },
      { text: '團主口碑推薦' },
      { text: '火熱商品開團中' },
      { text: '快速加入' },
      { text: '關於我們', icon: 'mdi-account-outline' },
    ],
  }),
};
</script>
