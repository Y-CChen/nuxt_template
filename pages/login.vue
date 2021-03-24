<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="pa-3" tile :loading="authenticating" :disabled="authenticating">
        <v-card-title>
          <img
            :src="`${$nuxt.context.env.baseUrl}/vuetify-logo.svg`"
            alt="Vue Material Admin"
            height="24"
            contain
          />
          <span class="primary--text text-capitalize mx-3">
            {{ $t('login') }}
          </span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="formValid" class="my-3" lazy-validation>
            <v-text-field
              v-model="formModel.username"
              append-icon="mdi-account"
              :label="$t('username')"
              type="text"
              :rules="formRule.username"
              required
              outlined
            />
            <v-text-field
              v-model="formModel.password"
              append-icon="mdi-lock"
              autocomplete="off"
              :label="$t('password')"
              type="password"
              :rules="formRule.password"
              required
              outlined
              @keyup.enter="login"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-tooltip v-for="icon in socialLoginIcons" :key="icon.text" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                icon
                v-bind="attrs"
                v-on="on"
                @click="socialLogin"
              >
                <v-icon v-text="icon.icon" />
              </v-btn>
            </template>
            <span class="text-capitalize">{{ icon.text }}</span>
          </v-tooltip>
          <v-spacer />
          <v-btn large text @click="register">
            {{ $t('register') }}
          </v-btn>
          <v-btn large tile color="primary" @click="login">
            {{ $t('login') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  middleware: ['notAuthenticated'],
  data() {
    return {
      formValid: false,
      formModel: {
        username: null,
        password: null,
      },
      formRule: {
        username: [
          v => !!v || this.$t('rule.required', { name: this.$t('username') }),
        ],
        password: [
          v => !!v || this.$t('rule.required', { name: this.$t('password') }),
        ],
      },
      socialLoginIcons: [
        {
          text: this.$t('twitter'),
          icon: 'mdi-twitter',
        },
        {
          text: this.$t('google'),
          icon: 'mdi-google',
        },
      ],
      authenticating: false,
    };
  },
  methods: {
    register() {},
    login() {
      if (!this.$refs.form.validate()) {
        return;
      }
      this.authenticating = true;
      this.$store
        .dispatch('auth/login', this.formModel)
        .then(() => {
          this.$router.push(this.localePath('/'));
          this.authenticating = false;
        })
        .catch(() => {
          this.authenticating = false;
        });
    },
    socialLogin() {},
  },
};
</script>
