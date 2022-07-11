<template>
  <ul class="additional-list">
    <li
      v-for="product in miscWithCount"
      :key="product.id"
      class="additional-list__item sheet"
    >
      <p class="additional-list__description">
        <img
          :src="require(`@/assets/img/${product.image}`)"
          width="39"
          height="60"
          :alt="product.name"
        />
        <span>{{ product.name }}</span>
      </p>
      <div class="additional-list__wrapper">
        <ItemCounter
          class="additional-list__counter"
          color-theme="orange"
          :counter="product.count"
          @change="changeMiscCount({ id: product.id, count: $event })"
        />

        <div class="additional-list__price">
          <b>× {{ product.price }} ₽</b>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import ItemCounter from "@/common/components/ItemCounter";

export default {
  name: "CartAdditional",

  components: { ItemCounter },

  computed: {
    ...mapGetters(["misc"]),

    ...mapState("Cart", ["selectedMisc"]),

    miscWithCount() {
      return this.misc.map((miscItem) => ({
        ...miscItem,
        count: this.selectedMisc.find((m) => m.id === miscItem.id)?.count || 0,
      }));
    },
  },

  methods: {
    ...mapActions("Cart", ["changeMiscCount"]),
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
.additional-list {
  @include clear-list;

  display: flex;
  flex-wrap: wrap;
}

.additional-list__description {
  display: flex;
  align-items: flex-start;

  margin: 0;
  margin-bottom: 8px;
}

.additional-list__item {
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  width: 200px;
  margin-right: 15px;
  margin-bottom: 15px;
  padding-top: 15px;
  padding-bottom: 15px;

  img {
    margin-right: 10px;
    margin-left: 15px;
  }

  span {
    @include b-s14-h16;

    display: inline;

    width: 100px;
    margin-right: 15px;
  }
}

.additional-list__wrapper {
  display: flex;
  align-items: center;

  box-sizing: border-box;
  width: 100%;
  margin-top: auto;
  padding-top: 18px;
  padding-right: 15px;
  padding-left: 15px;

  border-top: 1px solid rgba($green-500, 0.1);
}

.additional-list__counter {
  width: 54px;
  margin-right: auto;
}

.additional-list__price {
  @include b-s16-h19;
}
</style>
