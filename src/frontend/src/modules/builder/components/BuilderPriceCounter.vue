<template>
  <p>Итого: {{ this.totalPrice }} ₽</p>
</template>

<script>
export default {
  name: "BuilderPriceCounter",

  props: {
    totalPrice: {
      type: [Number, String],
      required: true,
    },
  },
};
</script>

<style scoped></style>
