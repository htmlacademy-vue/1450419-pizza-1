<template>
  <div id="app">
    <AppLayout v-if="!loading">
      <router-view />
    </AppLayout>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout";
import { mapState } from "vuex";

export default {
  name: "App",

  components: {
    AppLayout,
  },

  computed: {
    ...mapState(["loading"]),
    ...mapState("Auth", ["isAuthenticated"]),
  },

  async created() {
    window.onerror = function (msg, url, line, col, error) {
      console.error(error);
    };

    if (this.$jwt.getToken()) {
      this.$store.$api.auth.setAuthHeader();
      await this.$store.dispatch("Auth/getMe");

      // Если токен невалидный и мы не авторизовались
      if (!this.isAuthenticated) {
        await this.$router.push("/");
      }
    }

    await this.$store.dispatch("init");
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
