<template>
  <v-row>
    <v-col class="text-center">
      <img
        :src="`${$nuxt.context.env.baseUrl}/v.png`"
        alt="Vuetify.js"
        class="mb-5"
      />
      <blockquote class="blockquote">
        &#8220;First, solve the problem. Then, write the code.&#8221;
        <footer>
          <small>
            <em>&mdash;John Johnson</em>
          </small>
        </footer>
      </blockquote>
    </v-col>
  </v-row>
</template>

<script>
export default {
  middleware: ['authenticated'],
};
</script>
