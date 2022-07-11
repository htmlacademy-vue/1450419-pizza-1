<template>
  <section
    v-if="order"
    class="order"
  >
    <OrderHeader
      :order-id="orderId"
      @delete-order="deleteOrderHandler"
      @repeat-order="repeatOrderHandler"
    />

    <ul class="order__list">
      <li
        v-for="pizza in order.pizzas"
        :key="pizza.id"
        class="order__item"
      >
        <AppPizzaItem
          :name="pizza.name"
          :size-id="pizza.sizeId"
          :sauce-id="pizza.sauceId"
          :dough-id="pizza.doughId"
          :ingredients="pizza.ingredients"
        />
        <p class="order__price">
          {{ `${pizza.count}x${pizza.price} ₽` }}
        </p>
      </li>
    </ul>

    <OrderExtraProducts :products="order.orderMisc" />

    <OrderAddress />
  </section>
</template>

<script>
import OrderHeader from "@/modules/orders/components/OrderHeader";
import OrderExtraProducts from "@/modules/orders/components/OrderExtraProducts";
import OrderAddress from "@/modules/orders/components/OrderAddress";
import AppPizzaItem from "@/common/components/AppPizzaItem";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "OrderItem",

  components: {
    AppPizzaItem,
    OrderHeader,
    OrderExtraProducts,
    OrderAddress,
  },

  props: {
    orderId: {
      type: Number,
      required: true,
    },
  },

  computed: {
    ...mapGetters("Orders", ["getOrderById"]),

    order() {
      return this.getOrderById(this.orderId);
    },
  },

  methods: {
    ...mapActions("Orders", ["delete"]),

    ...mapActions("Cart", ["backToCart"]),

    async deleteOrderHandler() {
      await this.delete(this.orderId);
    },

    repeatOrderHandler() {
      this.backToCart({
        pizzas: this.order.pizzas,
        orderMisc: this.order.orderMisc,
      });
      this.$router.push("/cart");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";

.order {
  margin-bottom: 32px;

  padding-top: 15px;

  border-radius: 8px;
  background-color: $white;
  box-shadow: $shadow-light;
}

.order__list {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  margin-top: 24px;
  padding-right: 10px;
  padding-left: 10px;
}

.order__item {
  display: flex;

  width: 310px;
  margin-right: 33px;
  margin-bottom: 32px;
}

.order__price {
  @include b-s16-h19;

  margin: 0;

  white-space: nowrap;
}
</style>
