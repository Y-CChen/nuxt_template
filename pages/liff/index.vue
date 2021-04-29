<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline">
          LIFF
        </v-card-title>
        <v-card-text>
          <v-treeview v-if="logged" dense open-all :items="items" />
        </v-card-text>
        <v-card-actions />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import liff from '@line/liff';
import utils from '@/js/utils.js';

const liffInit = liff.init({ liffId: process.env.liffId });
export default {
  data() {
    return {
      snackbar: false,
      snackbarText: '',
      logged: false,
      items: [],
      test: false,
    };
  },
  async mounted() {
    try {
      await liffInit;
      if ('liff.state' in this.$route.query) {
        return await utils.makeForeverPromise();
      }
      if (!liff.isLoggedIn()) {
        this.logged = false;
        liff.login();
        return await utils.makeForeverPromise();
      } else {
        this.logged = true;
        this.items.push(this.makeItem('OS', liff.getOS()));
        this.items.push(this.makeItem('language', liff.getLanguage()));
        this.items.push(this.makeItem('version', liff.getVersion()));
        this.items.push(this.makeItem('LINE version', liff.getLineVersion()));
        this.items.push(
          this.makeItem('running in LIFF browser', liff.isInClient()),
        );
        this.items.push(
          this.makeItem('API available', {
            'share target picker': liff.isApiAvailable('shareTargetPicker'),
            'multiple liff transition': liff.isApiAvailable(
              'multipleLiffTransition',
            ),
          }),
        );
        this.items.push(this.makeItem('access token', liff.getAccessToken()));
        this.items.push(this.makeItem('ID token', liff.getIDToken()));
        this.items.push(
          this.makeItem('decoded ID token', liff.getDecodedIDToken()),
        );
        this.items.push(this.makeItem('context', liff.getContext()));
        this.items.push(this.makeItem('profile', await liff.getProfile()));
        this.items.push(
          this.makeItem('friendship', await liff.getFriendship()),
        );
        this.items.push(
          this.makeItem('permanent link', liff.permanentLink.createUrl()),
        );
      }
    } catch (e) {
      alert(e);
    }
  },
  methods: {
    makeItem(name, value) {
      if (value !== null && typeof value === 'object') {
        return {
          name,
          children: Object.keys(value).map((k) => {
            return this.makeItem(k, value[k]);
          }),
        };
      } else {
        return { name: `${name}: ${value}` };
      }
    },
  },
};
</script>
