<template>
  <div v-if="orders.length">
    <OrderItem
      v-for="{ id } in orders"
      :key="id"
      :order-id="id"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import OrderItem from "@/modules/orders/components/OrderItem";

export default {
  name: "Orders",

  components: {
    OrderItem,
  },

  computed: {
    ...mapState("Orders", ["orders"]),
  },

  async created() {
    await this.fetchOrders();
  },

  methods: {
    ...mapActions("Orders", ["fetchOrders"]),
  },
};
</script>

<style scoped></style>
