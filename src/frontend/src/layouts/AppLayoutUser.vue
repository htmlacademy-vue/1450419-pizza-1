<template>
  <div class="app-layout-main">
    <AppLayoutHeader />
    <main class="layout">
      <AppLayoutSidebar />
      <div class="layout__content">
        <div class="layout__title">
          <h1 class="title title--big">{{ title }}</h1>
        </div>
        <slot />
      </div>
    </main>
  </div>
</template>

<script>
import AppLayoutSidebar from "@/layouts/AppLayoutSidebar";
import AppLayoutHeader from "@/layouts/AppLayoutHeader";

export default {
  name: "AppLayoutUser",

  components: { AppLayoutHeader, AppLayoutSidebar },

  computed: {
    title() {
      return this.$route.meta.title;
    },
  },
};
</script>

<style lang="scss" scoped>
.layout__content {
  padding-top: 22px;
  padding-right: 2.12%;
  padding-left: 200px;
}
.layout__title {
  margin-bottom: 27px;
}
</style>
