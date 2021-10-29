<template>
  <v-card flat>
    <v-card-title>{{ $route.query.callback }}</v-card-title>
    <v-card-actions>
      <v-btn outlined @click="goCallback()">
        go
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  methods: {
    goCallback() {
      location.assign(this.$route.query.callback);
    },
  },
};
</script>
