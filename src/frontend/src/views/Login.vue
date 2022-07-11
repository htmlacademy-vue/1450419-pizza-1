<template>
  <div class="sign-form">
    <router-link
      to="/"
      class="close close--white"
    >
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </router-link>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <form
      method="post"
      @submit.prevent="login"
    >
      <div class="sign-form__input">
        <label class="input">
          <span>E-mail</span>
          <input
            ref="email"
            v-model="email.value"
            type="email"
            name="email"
            placeholder="example@mail.ru"
          />
          <span
            v-if="isShowEmailErrors"
            class="sign-form__error"
          >
            {{ email.error }}
          </span>
        </label>
      </div>

      <div class="sign-form__input">
        <label class="input">
          <span>Пароль</span>
          <input
            v-model="password.value"
            type="password"
            name="pass"
            placeholder="***********"
          />
          <span
            v-if="isShowPasswordErrors"
            class="sign-form__error"
          >
            {{ password.error }}
          </span>
        </label>
      </div>
      <button
        type="submit"
        class="button"
      >
        Авторизоваться
      </button>
    </form>
  </div>
</template>

<script>
import { validationRules } from "@/common/helpers/validate.helper";

export default {
  name: "Login",

  data() {
    return {
      email: {
        value: "",
        error: "",
      },
      password: {
        value: "",
        error: "",
      },
    };
  },

  computed: {
    isShowEmailErrors() {
      return !!this.email.error;
    },

    isShowPasswordErrors() {
      return !!this.password.error;
    },
  },

  watch: {
    "email.value": function () {
      this.clearValidationErrors();
    },

    "password.value": function () {
      this.clearValidationErrors();
    },
  },

  mounted() {
    this.$refs.email.focus();
  },

  methods: {
    async login() {
      this.validate();
      if (!this.email.error && !this.password.error) {
        await this.$store.dispatch("Auth/login", {
          email: this.email.value,
          password: this.password.value,
        });
        await this.$router.push("/");
      }
    },

    validate() {
      if (!validationRules.required.rule(this.email.value)) {
        this.email.error = validationRules.required.message;
      }
      if (!validationRules.required.rule(this.password.value)) {
        this.password.error = validationRules.required.message;
      }
      if (!this.email.error && !validationRules.email.rule(this.email.value)) {
        this.email.error = validationRules.email.message;
      }
    },

    clearValidationErrors() {
      this.email.error = "";
      this.password.error = "";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/mixins.scss";
.sign-form {
  @include pf_center-all;

  z-index: 10;

  display: block;

  box-sizing: border-box;
  width: 455px;
  padding-top: 146px;
  padding-right: 32px;
  padding-bottom: 32px;
  padding-left: 32px;

  background: $white url("~@/assets/img/popup.svg") no-repeat center top;
  box-shadow: $shadow-light;

  button {
    margin: 0 auto;
    padding: 16px 14px;
  }
}

.sign-form__title {
  margin-bottom: 24px;

  text-align: center;
}

.sign-form__input {
  margin-bottom: 16px;
}

.sign-form__error {
  color: $red-900;
}
</style>
