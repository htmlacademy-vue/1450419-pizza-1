<template>
  <div class="sheet">
    <AppTitle
      class="sheet__title"
      size="small"
    >
      <slot name="header-title" />
    </AppTitle>

    <div class="sheet__content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
import AppTitle from "@/common/components/AppTitle";

export default {
  name: "AppSheet",

  components: {
    AppTitle,
  },
};
</script>

<style lang="scss" scoped>
.sheet {
  padding-top: 15px;

  border-radius: 8px;
  background-color: $white;
  box-shadow: $shadow-light;
}

.sheet__title {
  padding-right: 18px;
  padding-left: 18px;
}

.sheet__content {
  margin-top: 8px;
  padding-top: 18px;
  padding-right: 18px;
  padding-left: 18px;

  border-top: 1px solid rgba($green-500, 0.1);
}
</style>
