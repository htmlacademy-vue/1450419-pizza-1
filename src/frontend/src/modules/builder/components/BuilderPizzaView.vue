<template>
  <AppDrop @drop="selectIngredient">
    <div class="content__constructor">
      <div
        class="pizza"
        :class="`pizza--foundation--${selectedDough.type}-${selectedSauce.type}`"
      >
        <div class="pizza__wrapper">
          <transition-group name="drop">
            <div
              v-for="ingredient of selectedIngredients"
              :key="ingredient.id"
            >
              <div
                :key="ingredient.id"
                class="pizza__filling"
                :class="`pizza__filling--${ingredient.type}`"
              ></div>
              <transition name="drop2">
                <div
                  v-if="ingredient.count === 2"
                  :key="`${ingredient.id}-second`"
                  class="pizza__filling pizza__filling--second"
                  :class="`pizza__filling--${ingredient.type}`"
                ></div>
              </transition>
              <transition name="drop2">
                <div
                  v-if="ingredient.count === 3"
                  :key="`${ingredient.id}-third`"
                  class="pizza__filling pizza__filling--third"
                  :class="`pizza__filling--${ingredient.type}`"
                ></div>
              </transition>
            </div>
          </transition-group>
        </div>
      </div>
    </div>
  </AppDrop>
</template>

<script>
import AppDrop from "@/common/components/AppDrop";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "BuilderPizzaView",

  components: {
    AppDrop,
  },

  computed: {
    ...mapGetters("Builder", [
      "selectedDough",
      "selectedSauce",
      "selectedIngredients",
    ]),
  },

  methods: {
    ...mapActions("Builder", ["selectIngredient"]),
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
.pizza {
  position: relative;

  display: block;

  box-sizing: border-box;
  width: 100%;

  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;

  &--foundation--large-creamy {
    background-image: url("~@/assets/img/foundation/big-creamy.svg");
  }

  &--foundation--large-tomato {
    background-image: url("~@/assets/img/foundation/big-tomato.svg");
  }

  &--foundation--light-creamy {
    background-image: url("~@/assets/img/foundation/small-creamy.svg");
  }

  &--foundation--light-tomato {
    background-image: url("~@/assets/img/foundation/small-tomato.svg");
  }
}

.pizza__wrapper {
  width: 100%;
  padding-bottom: 100%;
}

.pizza__filling {
  position: absolute;
  top: 0;
  left: 0;

  display: block;

  width: 100%;
  height: 100%;

  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;

  &--second {
    transform: rotate(45deg);
  }

  &--third {
    transform: rotate(-45deg);
  }

  &--ananas {
    background-image: url("~@/assets/img/filling-big/ananas.svg");
  }

  &--bacon {
    background-image: url("~@/assets/img/filling-big/bacon.svg");
  }

  &--blue_cheese {
    background-image: url("~@/assets/img/filling-big/blue_cheese.svg");
  }

  &--cheddar {
    background-image: url("~@/assets/img/filling-big/cheddar.svg");
  }

  &--chile {
    background-image: url("~@/assets/img/filling-big/chile.svg");
  }

  &--ham {
    background-image: url("~@/assets/img/filling-big/ham.svg");
  }

  &--jalapeno {
    background-image: url("~@/assets/img/filling-big/jalapeno.svg");
  }

  &--mozzarella {
    background-image: url("~@/assets/img/filling-big/mozzarella.svg");
  }

  &--mushrooms {
    background-image: url("~@/assets/img/filling-big/mushrooms.svg");
  }

  &--olives {
    background-image: url("~@/assets/img/filling-big/olives.svg");
  }

  &--onion {
    background-image: url("~@/assets/img/filling-big/onion.svg");
  }

  &--parmesan {
    background-image: url("~@/assets/img/filling-big/parmesan.svg");
  }

  &--salami {
    background-image: url("~@/assets/img/filling-big/salami.svg");
  }

  &--salmon {
    background-image: url("~@/assets/img/filling-big/salmon.svg");
  }

  &--tomatoes {
    background-image: url("~@/assets/img/filling-big/tomatoes.svg");
  }
}

.drop-enter-active {
  transition: all 1s ease;
}
.drop-enter {
  opacity: 0;
}
.drop-enter-to {
  opacity: 1;
}

.drop2-enter-active {
  transition: all 1s ease;
}
.drop2-enter {
  transform: rotate(115deg);
}
.drop2-enter-to {
  opacity: 1;
}
</style>
