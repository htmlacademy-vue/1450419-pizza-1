<template>
  <transition name="popup-fade">
    <div
      class="modal-backdrop"
      role="dialog"
    >
      <div
        ref="popup"
        class="popup"
      >
        <a
          class="close"
          @click="$emit('close')"
        >
          <span class="visually-hidden">Закрыть попап</span>
        </a>
        <div class="popup__title">
          <h2 class="title">Спасибо за заказ</h2>
        </div>
        <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
        <div class="popup__button">
          <a
            class="button"
            @click="$emit('close')"
          >
            Отлично, я жду!
          </a>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "SuccessPopup",
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
.popup {
  @include pf_center-all;

  z-index: 10;

  display: block;

  box-sizing: border-box;
  width: 420px;
  padding: 64px 95px;

  background-color: $white;
  box-shadow: $shadow-light;

  &::before,
  &::after {
    position: absolute;

    width: 48px;
    height: 48px;

    content: "";

    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  &::before {
    top: 15px;
    left: 15px;

    background-image: url("~@/assets/img/filling/ananas.svg");
  }

  &::after {
    right: 15px;
    bottom: 15px;

    background-image: url("~@/assets/img/filling/tomatoes.svg");
  }

  p {
    margin-top: 24px;
    margin-bottom: 24px;

    text-align: center;
  }
}

.popup__title {
  text-align: center;

  font-size: 1.3em;
}

.popup__button {
  a {
    padding: 16px 32px;
  }
}

.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

.popup-fade-enter,
.popup-fade-leave-active {
  opacity: 0;
}

.popup-fade-enter-active,
.popup-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
