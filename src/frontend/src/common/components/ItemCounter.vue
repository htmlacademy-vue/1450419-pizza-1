<template>
  <div class="counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :disabled="isMinLimit"
      @click="degrease"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      readonly
      type="text"
      name="counter"
      class="counter__input"
      :value="counter"
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      :class="themeClass"
      :disabled="isMaxLimit"
      @click="increase"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
import { counterLimit } from "@/common/constants";

export default {
  name: "ItemCounter",

  props: {
    counter: {
      type: Number,
      default: 0,
    },

    colorTheme: {
      type: String,
      default: "",
      required: false,
    },

    maxCount: {
      type: Number,
      default: 0,
      required: false,
    },
  },

  computed: {
    isMaxLimit() {
      return this.maxCount ? this.counter >= this.maxCount : false;
    },

    isMinLimit() {
      return this.counter <= counterLimit.MIN;
    },

    themeClass() {
      return this.colorTheme ? `counter__button--${this.colorTheme}` : "";
    },
  },

  methods: {
    changeCount(digit) {
      this.$emit("change", digit);
    },

    increase() {
      if (this.isMaxLimit) return;
      this.changeCount(this.counter + 1);
    },

    degrease() {
      if (this.isMinLimit) return;
      this.changeCount(this.counter - 1);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";

.counter {
  display: flex;

  justify-content: space-between;
  align-items: center;
}

.counter__button {
  $el: &;
  $size_icon: 50%;

  position: relative;

  display: block;

  width: 16px;
  height: 16px;
  margin: 0;
  padding: 0;

  cursor: pointer;
  transition: 0.3s;

  border: none;
  border-radius: 50%;
  outline: none;

  &--minus {
    background-color: $purple-100;

    &::before {
      @include p_center-all;

      width: $size_icon;
      height: 2px;

      content: "";

      border-radius: 2px;
      background-color: $black;
    }

    &:hover:not(:active):not(:disabled) {
      background-color: $purple-200;
    }

    &:active:not(:disabled) {
      background-color: $purple-300;
    }

    &:focus:not(:disabled) {
      box-shadow: $shadow-regular;
    }

    &:disabled {
      cursor: default;

      &::before {
        opacity: 0.1;
      }
    }
  }

  &--plus {
    background-color: $green-500;

    &::before {
      @include p_center-all;

      width: $size_icon;
      height: 2px;

      content: "";

      border-radius: 2px;
      background-color: $white;
    }

    &::after {
      @include p_center-all;

      width: $size_icon;
      height: 2px;

      content: "";
      transform: translate(-50%, -50%) rotate(90deg);

      border-radius: 2px;
      background-color: $white;
    }

    &:hover:not(:active):not(:disabled) {
      background-color: $green-400;
    }

    &:active:not(:disabled) {
      background-color: $green-600;
    }

    &:focus:not(:disabled) {
      box-shadow: $shadow-regular;
    }

    &:disabled {
      cursor: default;

      opacity: 0.3;
    }
  }

  &--orange {
    background-color: $orange-200;

    &:hover:not(:active):not(:disabled) {
      background-color: $orange-100;
    }

    &:active:not(:disabled) {
      background-color: $orange-300;
    }
  }
}

.counter__input {
  @include r-s14-h16;

  box-sizing: border-box;
  width: 22px;
  margin: 0;
  padding: 0 3px;

  text-align: center;

  color: $black;
  border: none;
  border-radius: 10px;
  outline: none;
  background-color: transparent;

  &:focus {
    box-shadow: inset $shadow-regular;
  }
}
</style>
