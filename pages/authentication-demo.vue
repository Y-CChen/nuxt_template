<template>
  <div class="d-flex justify-center">
    <custom-card
      class="flex-grow-1"
      :flat="$vuetify.breakpoint.mobile"
      max-width="400px"
    >
      <custom-card-title>
        {{ $auth.user.username }}
      </custom-card-title>
      <custom-card-actions>
        <div class="mx-auto" />
        <custom-btn
          :disabled="loading"
          :loading="loading"
          @click.stop="fetchUser()"
        >
          {{ $t('fetch-user-info') }}
        </custom-btn>
        <custom-btn
          :disabled="loading"
          :loading="loading"
          @click.stop="logout()"
        >
          {{ $t('logout') }}
        </custom-btn>
      </custom-card-actions>
    </custom-card>
  </div>
</template>

<script>
import CustomBtn from '~/components/custom-btn.vue';
import CustomCardActions from '~/components/custom-card-actions.vue';
import CustomCardTitle from '~/components/custom-card-title.vue';
import CustomCard from '~/components/custom-card.vue';

export default {
  name: 'SecretPage',
  components: {
    CustomBtn,
    CustomCard,
    CustomCardActions,
    CustomCardTitle,
  },
  data() {
    return {
      doingLogout: false,
      fetchingUser: false,
    };
  },
  computed: {
    loading() {
      return this.doingLogout || this.fetchingUser;
    },
  },
  methods: {
    async fetchUser() {
      try {
        this.fetchingUser = true;
        await this.$auth.fetchUser();
      } catch (error) {
        this.$logger.error(error);
      } finally {
        this.fetchingUser = false;
      }
    },
    async logout() {
      try {
        this.doingLogout = true;
        await this.$auth.logout();
      } catch (error) {
        this.$logger.error(error);
      } finally {
        this.doingLogout = false;
      }
    },
  },
};
</script>
