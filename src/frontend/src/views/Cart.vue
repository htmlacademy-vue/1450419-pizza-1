<template>
  <form
    action="#"
    method="post"
    class="layout-form"
  >
    <SuccessPopup
      v-show="isSuccessPopupVisible"
      @close="closeSuccessModal"
    />
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <div
          v-if="!hasClientPizzas"
          class="sheet cart__empty"
        >
          <p>В корзине нет ни одного товара</p>
        </div>

        <template v-else>
          <CartList />

          <div class="cart__additional">
            <CartAdditional />
          </div>

          <CartDeliveryInfo
            :street.sync="address.street"
            :building.sync="address.building"
            :flat.sync="address.flat"
            :phone.sync="phone"
            :type.sync="address.type"
          />
        </template>
      </div>
    </main>
    <section
      v-if="hasClientPizzas"
      class="footer"
    >
      <div class="footer__more">
        <router-link
          to="/"
          class="button button--border button--arrow"
          >
          Хочу еще одну
        </router-link>
      </div>
      <p class="footer__text">
        Перейти к конструктору<br />чтоб собрать ещё одну пиццу
      </p>
      <div class="footer__price">
        <b>Итого: {{ totalPrice }} ₽</b>
      </div>

      <div class="footer__submit">
        <button
          type="submit"
          class="button"
          @click.prevent="makeOrder"
        >
          Оформить заказ
        </button>
      </div>
    </section>
  </form>
</template>

<script>
import CartList from "@/modules/cart/components/CartList";
import CartAdditional from "@/modules/cart/components/CartAdditional";
import CartDeliveryInfo from "@/modules/cart/components/CartDeliveryInfo";
import SuccessPopup from "@/views/SuccessPopup";
import { mapActions, mapGetters, mapState } from "vuex";
import { calculateOrderPrice } from "@/common/helpers/pizza.helper";
import { deliveryType } from "@/common/constants";
import { validationRules } from "@/common/helpers/validate.helper";

export default {
  components: {
    CartList,
    CartAdditional: CartAdditional,
    CartDeliveryInfo,
    SuccessPopup,
  },

  data() {
    return {
      address: {
        type: deliveryType.SELF,
        street: "",
        building: "",
        flat: "",
      },

      phone: "",

      isSuccessPopupVisible: false,
    };
  },

  computed: {
    ...mapState("Cart", ["clientPizzas", "selectedMisc"]),

    ...mapState("Auth", ["isAuthenticated"]),

    ...mapGetters("Cart", ["hasClientPizzas"]),

    ...mapGetters("Auth", ["getUserId"]),

    totalPrice() {
      return calculateOrderPrice(
        this.clientPizzas,
        this.selectedMisc,
        this.$store
      );
    },
  },

  methods: {
    ...mapActions("Orders", ["post"]),

    ...mapActions("Cart", ["clearCart"]),

    async makeOrder() {
      if (!this.validate()) {
        return;
      }
      const sendData = {
        userId: this.getUserId,
        phone: this.phone,
        address: this.address.type !== deliveryType.SELF ? this.address : null,
        pizzas: this.clientPizzas,
        misc: this.selectedMisc,
      };
      await this.post(sendData);
      this.isSuccessPopupVisible = true;
    },

    //TODO переписать для читаемости
    validate() {
      if (!validationRules.required.rule(this.phone)) {
        return false;
      }
      if (
        this.address.type !== deliveryType.SELF &&
        (!validationRules.required.rule(this.address.street) ||
          !validationRules.required.rule(this.address.building))
      ) {
        return false;
      }
      return true;
    },

    closeSuccessModal() {
      this.clearCart();
      this.isAuthenticated
        ? this.$router.push({ name: "Orders" })
        : this.$router.push({ name: "IndexHome" });
    },
  },
};
</script>

<style lang="scss" scoped>
.cart__title {
  margin-bottom: 15px;
}

.cart__additional {
  margin-top: 15px;
  margin-bottom: 25px;
}

.cart__empty {
  padding: 20px 30px;
}
.layout-form {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.footer {
  display: flex;
  align-items: center;

  margin-top: auto;
  padding: 25px 2.12%;

  background-color: rgba($green-500, 0.1);
}

.footer__more {
  width: 220px;
  margin-right: 16px;

  a {
    padding-top: 16px;
    padding-bottom: 16px;
  }
}

.footer__text {
  @include l-s11-h13;

  color: rgba($black, 0.5);
}

.footer__price {
  @include b-s24-h28;

  margin-right: 12px;
  margin-left: auto;
}

.footer__submit {
  button {
    padding: 16px 14px;
  }
}
</style>
