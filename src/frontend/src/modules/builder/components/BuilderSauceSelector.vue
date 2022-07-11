<template>
  <div class="ingredients__sauce">
    <p>Основной соус:</p>

    <label
      v-for="{ id, type, name } in sauces"
      :key="id"
      class="radio ingredients__input"
    >
      <input
        type="radio"
        name="sauce"
        :value="type"
        :checked="id === selectedSauceId"
        @click="selectSauce(id)"
      />
      <span>{{ name }}</span>
    </label>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "BuilderSauceSelector",

  computed: {
    ...mapGetters("Builder", ["selectedSauceId"]),

    ...mapGetters(["sauces"]),
  },

  methods: {
    ...mapActions("Builder", ["selectSauce"]),
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";

.ingredients__sauce {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  width: 100%;
  margin-bottom: 14px;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-right: 16px;
    margin-bottom: 10px;
  }
}

.ingredients__input {
  margin-right: 24px;
  margin-bottom: 10px;
}
</style>
