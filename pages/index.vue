<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center">
        <logo />
        <vuetify-logo />
      </div>
      <v-card>
        <v-card-title class="headline">
          Welcome to the Vuetify + Nuxt.js template
        </v-card-title>
        <v-card-title class="headline">
          {{
            `Current Time ${$moment
              .utc()
              .local()
              .format('YYYY-MM-DD HH:mm:ss')}`
          }}
        </v-card-title>
        <v-card-title class="headline">
          {{ `Backend URL ${$nuxt.context.env.backendUrl}` }}
        </v-card-title>
        <v-card-text>
          <p>
            Vuetify is a progressive Material Design component framework for
            Vue.js. It was designed to empower developers to create amazing
            applications.
          </p>
          <p>
            For more information on Vuetify, check out the
            <a
              href="https://vuetifyjs.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              documentation
            </a>
            .
          </p>
          <p>
            If you have questions, please join the official
            <a
              href="https://chat.vuetifyjs.com/"
              target="_blank"
              rel="noopener noreferrer"
              title="chat"
            >
              discord
            </a>
            .
          </p>
          <p>
            Find a bug? Report it on the github
            <a
              href="https://github.com/vuetifyjs/vuetify/issues"
              target="_blank"
              rel="noopener noreferrer"
              title="contribute"
            >
              issue board
            </a>
            .
          </p>
          <p>
            Thank you for developing with Vuetify and I look forward to bringing
            more exciting features in the future.
          </p>
          <div class="text-xs-right">
            <em><small>&mdash; John Leider</small></em>
          </div>
          <hr class="my-3" />
          <a
            href="https://nuxtjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nuxt Documentation
          </a>
          <br />
          <a
            href="https://github.com/nuxt/nuxt.js"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nuxt GitHub
          </a>
        </v-card-text>
        <v-card-actions>
          <v-container>
            <v-row>
              <v-col>
                <v-btn color="primary" nuxt @click="ecpay_payment">
                  Ecpay Payment
                </v-btn>
                <div ref="ecpay_payment" class="d-none" />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn color="primary" nuxt @click="ecpay_logistic_cvs_map">
                  Ecpay Logistic CVS Map
                </v-btn>
                <div ref="ecpay_logistic_cvs_map" class="d-none" />
              </v-col>
            </v-row>
            <v-row v-if="is_cvs_store_selected">
              <v-col>
                <v-alert dense type="info">
                  {{ $route.query.cvs_store_id }},
                  {{ $route.query.cvs_store_name }},
                  {{ $route.query.cvs_address }}
                </v-alert>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn
                  color="primary"
                  nuxt
                  :disabled="!is_cvs_store_selected"
                  @click="ecpay_logistic_cvs"
                >
                  Ecpay Logistic CVS
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn color="primary" nuxt :to="localePath('/inspire')">
                  Continue
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Logo from '~/components/Logo.vue';
import VuetifyLogo from '~/components/VuetifyLogo.vue';

export default {
  middleware: ['authenticated'],
  components: {
    Logo,
    VuetifyLogo,
  },
  computed: {
    is_cvs_store_selected() {
      return this.$route.query.cvs_store_id !== undefined;
    },
  },
  methods: {
    ecpay_payment() {
      this.$axios({
        method: 'POST',
        url: `${this.$nuxt.context.env.backendUrl}/ecpay/payment/`,
        data: {
          total_amount: 2500,
          item_names: ['good1', 'good2'],
          client_back_url: `${this.$nuxt.context.env.host}${this.$nuxt.context.env.baseUrl}/inspire`,
        },
      }).then((response) => {
        this.$refs.ecpay_payment.innerHTML = response.data;
        document.getElementById('data_set').submit();
      });
    },
    ecpay_logistic_cvs() {
      this.$axios({
        method: 'POST',
        url: `${this.$nuxt.context.env.backendUrl}/ecpay/logistic/cvs/`,
        data: {
          logistic_sub_type: 'FAMILY',
          goods_amount: 10,
          collection_amount: 10,
          is_collection: 1,
          goods_name: 'test',
          receiver_name: '葉大雄',
          receiver_phone: '',
          receiver_cell_phone: '0911111111',
          receiver_mail: 'test@gmail.com',
          receiver_store_id: this.$route.query.cvs_store_id,
          return_store_id: this.$route.query.cvs_store_id,
        },
      }).then((response) => {
        this.$router.push('/inspire');
      });
    },
    ecpay_logistic_cvs_map() {
      this.$axios({
        method: 'GET',
        url: `${this.$nuxt.context.env.backendUrl}/ecpay/logistic/cvs/map`,
        params: {
          logistic_sub_type: 'FAMILY',
          client_reply_url: `${this.$nuxt.context.env.host}${this.$nuxt.context.env.baseUrl}`,
        },
      }).then((response) => {
        this.$refs.ecpay_logistic_cvs_map.innerHTML = response.data;
        document.getElementById('data_set').submit();
      });
    },
  },
};
</script>
