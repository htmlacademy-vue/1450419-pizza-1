<template>
  <div>
    <ul class="cart-list sheet">
      <li
        v-for="pizza in cartPizzas"
        :key="pizza.id"
        class="cart-list__item"
      >
        <AppPizzaItem
          :name="pizza.name"
          :size-id="pizza.sizeId"
          :sauce-id="pizza.sauceId"
          :dough-id="pizza.doughId"
          :ingredients="pizza.ingredients"
          class="cart-list__product"
        />

        <ItemCounter
          class="cart-list__counter"
          :counter="pizza.count"
          color-theme="orange"
          @change="changePizzaCount({ id: pizza.id, count: $event })"
        />
        <div class="cart-list__price">
          <b>{{ pizza.price * pizza.count }} ₽</b>
        </div>

        <div class="cart-list__button">
          <button
            type="button"
            class="cart-list__edit"
            @click="goToBuilder(pizza)"
          >
            Изменить
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ItemCounter from "@/common/components/ItemCounter";
import AppPizzaItem from "@/common/components/AppPizzaItem";

export default {
  name: "CartList",

  components: { ItemCounter, AppPizzaItem },

  computed: {
    ...mapState("Cart", {
      cartPizzas: "clientPizzas",
    }),
  },

  methods: {
    ...mapActions("Cart", ["changePizzaCount"]),

    ...mapActions("Builder", ["initSelectedPizza"]),

    goToBuilder(pizza) {
      this.initSelectedPizza(pizza);
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
.cart-list {
  @include clear-list;

  padding: 15px 0;
}

.cart-list__item {
  display: flex;
  align-items: flex-start;

  margin-bottom: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
  padding-left: 15px;

  border-bottom: 1px solid rgba($green-500, 0.1);

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;

    border-bottom: none;
  }
}

.cart-list__product {
  flex-grow: 1;

  margin-right: auto;
}

.cart-list__counter {
  width: 54px;
  margin-right: auto;
  margin-left: 20px;
}

.cart-list__price {
  min-width: 100px;
  margin-right: 36px;
  margin-left: 10px;

  text-align: right;

  b {
    @include b-s16-h19;
  }
}

.cart-list__edit {
  @include l-s11-h13;

  cursor: pointer;
  transition: 0.3s;

  border: none;
  outline: none;
  background-color: transparent;

  &:hover {
    color: $green-500;
  }

  &:active {
    color: $green-600;
  }

  &:focus {
    color: $green-400;
  }
}
</style>
