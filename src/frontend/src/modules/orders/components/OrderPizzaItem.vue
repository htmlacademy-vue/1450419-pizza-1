<template>
  <div>
    <div class="product">
      <img
        src="@/assets/img/product.svg"
        class="product__img"
        width="56"
        height="56"
        alt="Капричоза"
      />
      <div class="product__text">
        <h2>{{ pizza.name }}</h2>
        <ul>
          <li>30 см, на тонком тесте</li>
          <li>Соус: томатный</li>
          <li>
            Начинка: грибы, лук, ветчина, пармезан, ананас, бекон, блю чиз
          </li>
        </ul>
      </div>
    </div>
    <p class="order__price">782 ₽</p>
  </div>
</template>

<script>

export default {
  name: "OrderPizzaItem",

  props: {
    pizza: {
      type: Object,
      required: true,
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
