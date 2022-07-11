<template>
  <form class="address-form address-form--opened sheet">
    <div
      v-if="addressState.id"
      class="address-form__header"
    >
      <b>{{ addressState.name }}</b>
    </div>

    <div class="address-form__wrapper">
      <div class="address-form__input">
        <label class="input">
          <span>Название адреса*</span>
          <input
            v-model="addressState.name"
            type="text"
            name="addr-name"
            placeholder="Введите название адреса"
            required
          />
        </label>
      </div>
      <div class="address-form__input address-form__input--size--normal">
        <label class="input">
          <span>Улица*</span>
          <input
            v-model="addressState.street"
            type="text"
            name="addr-street"
            placeholder="Введите название улицы"
            required
          />
        </label>
      </div>
      <div class="address-form__input address-form__input--size--small">
        <label class="input">
          <span>Дом*</span>
          <input
            v-model="addressState.building"
            type="text"
            name="addr-house"
            placeholder="Введите номер дома"
            required
          />
        </label>
      </div>
      <div class="address-form__input address-form__input--size--small">
        <label class="input">
          <span>Квартира</span>
          <input
            v-model="addressState.flat"
            type="text"
            name="addr-apartment"
            placeholder="Введите № квартиры"
          />
        </label>
      </div>
      <div class="address-form__input">
        <label class="input">
          <span>Комментарий</span>
          <input
            v-model="addressState.comment"
            type="text"
            name="addr-comment"
            placeholder="Введите комментарий"
          />
        </label>
      </div>
    </div>

    <div class="address-form__buttons">
      <button
        v-if="addressState.id"
        type="button"
        class="button button--transparent"
        @click="onDeleteClick"
      >
        Удалить
      </button>
      <button
        type="submit"
        class="button"
        @click.prevent="onSaveClick"
      >
        Сохранить
      </button>
    </div>
  </form>
</template>

<script>
import { validationRules } from "@/common/helpers/validate.helper";

const createEmptyState = () => ({
  name: "",
  street: "",
  comment: "",
  building: "",
  flat: "",
});

export default {
  name: "ProfileAddressEdit",

  props: {
    address: {
      type: Object,
      default: createEmptyState,
    },
  },

  data() {
    return {
      addressState: { ...this.address },
    };
  },

  methods: {
    onDeleteClick() {
      this.$emit("delete");
    },

    //TODO добавить вывод ошибок пользователю при заполнении
    onSaveClick() {
      if (this.validate()) {
        this.$emit("save", this.addressState);
      }
    },

    validate() {
      return (
        validationRules.required.rule(this.addressState.name) &&
        validationRules.required.rule(this.addressState.street) &&
        validationRules.required.rule(this.addressState.building)
      );
    },
  },
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/mixins/mixins.scss";
.address-form {
  $bl: &;

  position: relative;

  padding-top: 0;
  padding-bottom: 26px;

  &--opened {
    #{$bl}__header {
      padding: 16px;
    }
  }

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-bottom: 16px;
    padding: 0 16px;
  }

  small {
    @include l-s11-h13;

    display: block;

    padding: 0 16px;
  }
}

.address-form__wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  width: 80%;
  padding: 16px;
}

.address-form__input {
  width: 100%;
  margin-bottom: 16px;

  &--size {
    &--normal {
      width: 60.5%;
    }

    &--small {
      width: 18%;
    }
  }
}

.address-form__buttons {
  display: flex;
  justify-content: flex-end;

  padding: 0 16px;

  button {
    margin-left: 16px;
    padding: 16px 27px;
  }
}

.address-form__header {
  @include b-s14-h16;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 21px;
  padding: 10px 16px;

  border-bottom: 1px solid rgba($green-500, 0.1);
}
</style>
