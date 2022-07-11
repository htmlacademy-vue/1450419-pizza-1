<template>
  <div class="ingredients__filling">
    <p>Начинка:</p>

    <ul class="ingredients__list">
      <BuilderIngredientItem
        v-for="ingredient in ingredients"
        :key="ingredient.id"
        :ingredient="ingredient"
      />
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BuilderIngredientItem from "@/modules/builder/components/BuilderIngredientItem";

export default {
  name: "BuilderIngredientList",

  components: {
    BuilderIngredientItem,
  },

  computed: {
    ...mapGetters(["ingredients"]),
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
.ingredients__filling {
  width: 100%;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-bottom: 16px;
  }
}

.ingredients__list {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}

.ingredients__item {
  width: 100px;
  min-height: 40px;
  margin-right: 17px;
  margin-bottom: 35px;
}
</style>
