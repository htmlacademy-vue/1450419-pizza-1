<template>
  <AppSheet>
    <template #header-title>Выберите размер</template>
    <template #content>
      <div class="diameter">
        <label
          v-for="{ id, type, name } in sizes"
          :key="id"
          class="diameter__input"
          :class="`diameter__input--${type}`"
        >
          <input
            type="radio"
            name="diameter"
            :value="type"
            :checked="id === selectedSizeId"
            class="visually-hidden"
            @click="selectSize(id)"
          />
          <span>{{ name }}</span>
        </label>
      </div>
    </template>
  </AppSheet>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AppSheet from "@/common/components/AppSheet";

export default {
  name: "BuilderSizeSelector",

  components: {
    AppSheet,
  },

  computed: {
    ...mapGetters("Builder", ["selectedSizeId"]),

    ...mapGetters(["sizes"]),
  },

  methods: {
    ...mapActions("Builder", ["selectSize"]),
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
.diameter {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.diameter__input {
  margin-right: 8.7%;
  margin-bottom: 20px;
  padding-top: 7px;
  padding-bottom: 6px;

  cursor: pointer;

  span {
    @include r-s16-h19;

    position: relative;

    padding-left: 46px;

    &::before {
      @include p_center_v;

      width: 36px;
      height: 36px;

      content: "";
      transition: 0.3s;

      border-radius: 50%;
      background-color: $green-100;
      background-image: url("~@/assets/img/diameter.svg");
      background-repeat: no-repeat;
      background-position: center;
    }
  }

  &:nth-child(3n) {
    margin-right: 0;
  }

  &--small {
    span::before {
      background-size: 18px;
    }
  }

  &--normal {
    span::before {
      background-size: 29px;
    }
  }

  &--big {
    span::before {
      background-size: 100%;
    }
  }

  &:hover {
    span::before {
      box-shadow: $shadow-regular;
    }
  }

  input {
    &:checked + span::before {
      box-shadow: $shadow-large;
    }
  }
}
</style>
