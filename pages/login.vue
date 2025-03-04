<template>
  <div class="d-flex justify-center">
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
import CustomBtn from '~/components/custom-btn.vue';
import CustomCardActions from '~/components/custom-card-actions.vue';
import CustomCardText from '~/components/custom-card-text.vue';
import CustomCardTitle from '~/components/custom-card-title.vue';
import CustomCard from '~/components/custom-card.vue';
import CustomFieldGroup from '~/components/custom-field-group.vue';
import CustomForm from '~/components/custom-form.vue';
import CustomTextField from '~/components/custom-text-field.vue';

export default {
  name: 'LoginPage',
  auth: 'guest',
  components: {
    CustomBtn,
    CustomCard,
    CustomCardActions,
    CustomCardText,
    CustomCardTitle,
    CustomFieldGroup,
    CustomForm,
    CustomTextField,
  },
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
