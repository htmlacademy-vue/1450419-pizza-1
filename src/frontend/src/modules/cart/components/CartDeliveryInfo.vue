<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select
          :value="type"
          name="test"
          class="select"
          @change="$emit('update:type', $event.target.value)"
        >
          <option
            v-for="filterType in filteredOrderType"
            :key="filterType.value"
            :value="filterType.value"
          >
            {{ filterType.description }}
          </option>
        </select>
      </label>

      <label class="input input--big-label">
        <span>Контактный телефон:</span>
        <input
          type="text"
          name="tel"
          placeholder="+7 999-999-99-99"
          :value="this.phone"
          @input="$emit('update:phone', $event.target.value)"
        />
      </label>

      <div
        v-if="showDeliveryAddress"
        class="cart-form__address"
      >
        <span class="cart-form__label">Новый адрес:</span>

        <div class="cart-form__input">
          <label class="input">
            <span>Улица*</span>
            <input
              ref="street"
              type="text"
              name="street"
              :value="this.street"
              @input="$emit('update:street', $event.target.value)"
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Дом*</span>
            <input
              ref="building"
              type="text"
              name="house"
              :value="this.building"
              @input="$emit('update:building', $event.target.value)"
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Квартира</span>
            <input
              ref="flat"
              type="text"
              name="apartment"
              :value="this.flat"
              @input="$emit('update:flat', $event.target.value)"
            />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { deliveryType } from "@/common/constants";

const addressConfig = [
  {
    value: deliveryType.SELF,
    description: "Заберу сам",
    auth: false,
    needAddress: false,
  },
  {
    value: deliveryType.ADDRESS,
    description: "Новый адрес",
    auth: false,
    needAddress: true,
  },
  {
    value: deliveryType.HOUSE,
    description: "Дом",
    auth: true,
    needAddress: true,
  },
];

export default {
  name: "CartDeliveryInfo",

  props: {
    street: {
      type: String,
      default: "",
    },

    building: {
      type: String,
      default: "",
    },

    flat: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    type: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState("Auth", ["isAuthenticated"]),

    filteredOrderType() {
      return Object.values(addressConfig).filter((type) => {
        return !this.isAuthenticated ? !type.auth : true;
      });
    },

    showDeliveryAddress() {
      return addressConfig.find((type) => type.value === this.type).needAddress;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
.cart-form {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.cart-form__select {
  display: flex;
  align-items: center;

  margin-right: auto;

  span {
    margin-right: 16px;
  }
}

.cart-form__label {
  @include b-s16-h19;

  white-space: nowrap;
}

.cart-form__address {
  display: flex;
  align-items: center;

  width: 100%;
  margin-top: 20px;
}

.cart-form__input {
  flex-grow: 1;

  margin-bottom: 20px;
  margin-left: 16px;

  &--small {
    max-width: 120px;
  }
}
</style>
