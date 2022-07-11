<template>
  <div class="app-layout-main">
    <AppLayoutHeader />
    <main class="content">
      <slot />
    </main>
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader";

export default {
  name: "AppLayoutMain",

  components: {
    AppLayoutHeader,
  },
};
</script>

<style scoped lang="scss">
.app-layout-main {
  display: flex;
  flex-direction: column;

  height: 100vh;
}
</style>
