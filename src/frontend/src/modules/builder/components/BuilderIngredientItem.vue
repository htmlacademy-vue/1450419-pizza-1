<template>
  <li class="ingredients__item">
    <AppDrag
      :transfer-data="transferData"
      :draggable="!isMaxLimit"
    >
      <span
        class="filling"
        :class="`filling--${ingredientWithCount.type}`"
        data-test="span"
        >{{ ingredientWithCount.name }}</span
      >
    </AppDrag>
    <ItemCounter
      class="counter--orange ingredients__counter"
      :counter="ingredientWithCount.count"
      :max-count="countLimit"
      @change="changeCount"
    />
  </li>
</template>

<script>
import AppDrag from "@/common/components/AppDrag";
import ItemCounter from "@/common/components/ItemCounter";
import { mapActions, mapGetters } from "vuex";
import { counterLimit } from "@/common/constants";
export default {
  name: "BuilderIngredientItem",

  components: { AppDrag, ItemCounter },

  props: {
    ingredient: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapGetters("Builder", ["selectedIngredientsIds"]),
    ...mapGetters(["ingredientsEnum"]),
    ingredientWithCount() {
      const selectedIngredient = this.selectedIngredientsIds.find(
        (ing) => ing.id === this.ingredient.id
      );
      const count = selectedIngredient?.count || 0;
      return {
        ...this.ingredient,
        count,
      };
    },

    transferData() {
      return {
        id: this.ingredientWithCount.id,
        count: this.ingredientWithCount.count + 1,
      };
    },

    countLimit() {
      return counterLimit.MAX;
    },

    isMaxLimit() {
      return this.ingredientWithCount.count >= this.countLimit;
    },
  },

  methods: {
    ...mapActions("Builder", ["selectIngredient"]),

    changeCount(count) {
      this.selectIngredient({ id: this.ingredient.id, count });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
.filling {
  @include r-s14-h16;

  position: relative;

  display: block;

  padding-left: 36px;

  &::before {
    @include p_center-v;

    display: block;

    width: 32px;
    height: 32px;

    content: "";

    border-radius: 50%;
    background-color: $white;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 80% 80%;
  }

  &--tomatoes::before {
    background-image: url("~@/assets/img/filling/tomatoes.svg");
  }

  &--ananas::before {
    background-image: url("~@/assets/img/filling/ananas.svg");
  }

  &--bacon::before {
    background-image: url("~@/assets/img/filling/bacon.svg");
  }

  &--blue_cheese::before {
    background-image: url("~@/assets/img/filling/blue_cheese.svg");
  }

  &--cheddar::before {
    background-image: url("~@/assets/img/filling/cheddar.svg");
  }

  &--chile::before {
    background-image: url("~@/assets/img/filling/chile.svg");
  }

  &--ham::before {
    background-image: url("~@/assets/img/filling/ham.svg");
  }

  &--jalapeno::before {
    background-image: url("~@/assets/img/filling/jalapeno.svg");
  }

  &--mozzarella::before {
    background-image: url("~@/assets/img/filling/mozzarella.svg");
  }

  &--mushrooms::before {
    background-image: url("~@/assets/img/filling/mushrooms.svg");
  }

  &--olives::before {
    background-image: url("~@/assets/img/filling/olives.svg");
  }

  &--onion::before {
    background-image: url("~@/assets/img/filling/onion.svg");
  }

  &--parmesan::before {
    background-image: url("~@/assets/img/filling/parmesan.svg");
  }

  &--salami::before {
    background-image: url("~@/assets/img/filling/salami.svg");
  }

  &--salmon::before {
    background-image: url("~@/assets/img/filling/salmon.svg");
  }
}

.ingredients__counter {
  width: 54px;
  margin-top: 10px;
  margin-left: 36px;
}
</style>
