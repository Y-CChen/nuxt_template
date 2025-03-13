<template>
  <div class="fill-height d-flex align-center justify-center">
    <custom-field-group v-slot="{ invalid, handleSubmit }">
      <custom-card
        class="flex-grow-1"
        :flat="$vuetify.breakpoint.mobile"
        max-width="400px"
      >
        <custom-form @submit="handleSubmit(onSubmit)">
          <custom-card-title>
            {{ $t('login') }}
          </custom-card-title>
          <custom-card-text>
            <custom-text-field
              v-model="form.username"
              :name="`${$t('username')}`"
              :rules="{
                [$validate.Rules.required]: true,
                [$validate.Rules.minTextLength]: 3,
                [$validate.Rules.maxTextLength]: 20,
              }"
              :label="`${$t('username')}*`"
            />
            <custom-text-field
              v-model="form.password"
              :name="`${$t('password')}`"
              :rules="{
                [$validate.Rules.required]: true,
                [$validate.Rules.minTextLength]: 8,
                [$validate.Rules.maxTextLength]: 20,
              }"
              :label="`${$t('password')}*`"
              type="password"
            />
          </custom-card-text>
          <custom-card-actions>
            <div class="mx-auto" />
            <custom-btn
              :disabled="doingLogin || invalid"
              :loading="doingLogin"
              type="submit"
            >
              {{ $t('login') }}
            </custom-btn>
          </custom-card-actions>
        </custom-form>
      </custom-card>
    </custom-field-group>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  auth: 'guest',
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      doingLogin: false,
    };
  },
  methods: {
    async onSubmit() {
      try {
        this.doingLogin = true;
        await this.$auth.loginWith('local', {
          data: {
            username: this.form.username,
            password: this.form.password,
          },
        });
      } catch (error) {
        this.$ui.confirmDialog.set({
          visible: true,
          title: this.$t('login-failed'),
          hideCancelBtn: true,
        });
        this.$logger.error(error);
      } finally {
        this.doingLogin = false;
      }
    },
  },
};
</script>
