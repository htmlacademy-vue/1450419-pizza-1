<template>
  <ul class="order__additional">
    <li
      v-for="product in orderedProducts"
      :key="product.id"
    >
      <img
        :src="require(`@/assets/img/${product.image}`)"
        width="20"
        height="30"
        :alt="product.image"
      />
      <p>
        <span>{{ product.name }}</span>
        <b>{{ `${product.count} x ${product.price} ₽` }}</b>
      </p>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "OrderExtraProducts",

  props: {
    products: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    ...mapGetters(["miscEnum"]),

    orderedProducts() {
      return this.products.map(({ id, count }) => ({
        ...this.miscEnum[id],
        count,
      }));
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";

.order__additional {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  margin-bottom: 5px;
  padding-left: 80px;

  li {
    @include b-s11-h16;

    width: 130px;
    margin-right: 24px;
    margin-bottom: 10px;
  }

  p {
    margin: 0;
  }

  img {
    float: left;

    margin-right: 7px;
  }

  b {
    display: block;
  }
}
</style>
