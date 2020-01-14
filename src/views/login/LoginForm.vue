<template>
  <form novalidate v-on:submit.prevent="doLogin">
    <spl-input
      id="email"
      type="text"
      placeholder="Email"
      v-model="user.email"
      :error="getError('user.email')"
    />
    <spl-input
      id="password"
      type="password"
      placeholder="Password"
      autocomplete="password"
      v-model="user.password"
      :error="getError('user.password')"
    />
    <div class="button">
      <spl-button name="Login" :disabled="invalid" />
    </div>
  </form>
</template>

<script>
import { SplInput, SplButton } from "../../components";
import { required, email } from "vuelidate/lib/validators";
import {
  AuthService,
  SplSpinnerService,
  NotificationService
} from "../../services";

import { ValidationMixin } from "../../mixins";

export default {
  name: "LoginForm",
  components: { SplInput, SplButton },
  mixins: [ValidationMixin],
  data() {
    return {
      user: {
        email: "",
        password: ""
      }
    };
  },
  validations: {
    user: {
      email: { required, email },
      password: { required }
    }
  },
  methods: {
    doLogin() {
      SplSpinnerService.on();
      AuthService.login(this.user)
        .then(() => this.$router.push({ name: "home" }))
        .catch(error => {
          NotificationService.error(error);
        })
        .finally(() => SplSpinnerService.off());
    }
  },
  computed: {
    invalid() {
      return this.$v.$invalid;
    }
  }
};
</script>

<style scoped>
.button {
  text-align: right;
  margin: 0 auto;
}
</style>
