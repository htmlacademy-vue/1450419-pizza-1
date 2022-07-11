<template>
  <div class="product">
    <img
      src="@/assets/img/product.svg"
      class="product__img"
      width="56"
      height="56"
      :alt="name"
    />
    <div class="product__text">
      <h2 data-test="name">{{ name }}</h2>
      <ul>
        <li data-test="dough-info">{{ doughInfo }}</li>
        <li data-test="sauce-info">Соус: {{ sauceInfo }}</li>
        <li>
          Начинка:
          {{ ingredientsInfo }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AppPizzaItem",

  props: {
    name: {
      type: String,
      required: true,
    },

    sizeId: {
      type: Number,
      required: true,
    },

    sauceId: {
      type: Number,
      required: true,
    },

    doughId: {
      type: Number,
      required: true,
    },

    ingredients: {
      type: Array,
      required: true,
      validate: (value) => value.length,
    },
  },

  computed: {
    ...mapGetters(["sizeEnum", "sauceEnum", "ingredientsEnum"]),

    doughInfo() {
      const sizeName = this.sizeEnum[this.sizeId].name;
      const doughDescription =
        this.doughId === 1 ? "на тонком тесте" : "на толстом тесте";

      return `${sizeName}, ${doughDescription}`;
    },

    sauceInfo() {
      return this.sauceEnum[this.sauceId].name;
    },

    ingredientsInfo() {
      return this.ingredients
        .map((ing) => this.ingredientsEnum[ing.id].name)
        .join(", ");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";

.product {
  display: flex;
  align-items: center;
}

.product__text {
  margin-left: 15px;

  h2 {
    @include b-s18-h21;

    margin-top: 0;
    margin-bottom: 10px;
  }

  ul {
    @include clear-list;
    @include l-s11-h13;
  }
}
</style>
