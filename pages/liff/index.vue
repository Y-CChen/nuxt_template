<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-card>
        <v-card-title class="headline">
          LIFF
        </v-card-title>
        <v-card-text v-if="logged">
          <v-list>
            <v-list-item v-for="prop in props" :key="prop.name">
              <v-list-item-content>
                <v-list-item-title>{{ prop.name }}</v-list-item-title>
                <v-list-item-subtitle class="text-wrap">
                  <span>{{ prop.value }}</span>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
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
      logged: false,
      props: [],
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
        this.props = [].concat(
          this.makeProp('OS', liff.getOS()),
          this.makeProp('language', liff.getLanguage()),
          this.makeProp('version', liff.getVersion()),
          this.makeProp('LINE version', liff.getLineVersion()),
          this.makeProp('running in LIFF browser', liff.isInClient()),
          this.makeProp('API available', {
            'share target picker': liff.isApiAvailable('shareTargetPicker'),
            'multiple liff transition': liff.isApiAvailable(
              'multipleLiffTransition',
            ),
          }),
          this.makeProp('access token', liff.getAccessToken()),
          this.makeProp('ID token', liff.getIDToken()),
          this.makeProp('decoded ID token', liff.getDecodedIDToken()),
          this.makeProp('context', liff.getContext()),
          this.makeProp('profile', await liff.getProfile()),
          this.makeProp('friendship', await liff.getFriendship()),
          this.makeProp('permanent link', liff.permanentLink.createUrl()),
        );
      }
    } catch (e) {
      alert(e);
    }
  },
  methods: {
    makeProp(name, value) {
      if (value !== null && typeof value === 'object') {
        return Object.keys(value)
          .map((k) => {
            return this.makeProp(`${name}/${k}`, value[k]);
          })
          .reduce((previous, current) => previous.concat(current), []);
      } else {
        return [{ name, value: `${value}` }];
      }
    },
  },
};
</script>
