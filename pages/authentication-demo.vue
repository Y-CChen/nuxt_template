<template>
  <div class="fill-height d-flex align-center justify-center">
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
export default {
  name: 'AuthenticationDemoPage',
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
