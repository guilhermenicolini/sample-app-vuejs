<template>
  <form novalidate v-on:submit.prevent="doSignIn">
    <spl-input id="name" type="text" placeholder="Name" v-model="user.name" :error="getError('user.name')" />
    <spl-input id="email" type="email" placeholder="Email" autocomplete="email" v-model="user.email" :error="getError('user.email')" />
    <spl-input id="password" type="password" placeholder="Password" autocomplete="new-password" v-model="user.password" :error="getError('user.password')" />
    <spl-input id="confirm" type="password" placeholder="Confirm Password" autocomplete="new-password" v-model="user.confirmPassword" :error="getError('user.confirmPassword')" />
    <div class="button">
      <spl-button name="Sign In" :disabled="invalid" />
    </div>
  </form>
</template>

<script>
import { SplInput, SplButton } from '../../components'
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators';
import { UserService, SplSpinnerService, NotificationService } from '../../services';

import { ValidationMixin } from '../../mixins';

export default {
  name: "SignInForm",
  components: { SplInput, SplButton },
  mixins: [ ValidationMixin ],
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    };
  },
  validations: {
    user: {
      name: { required },
      email: { required, email },
      password: {
        required,
        lowerCase: value => /[a-z]/.test(value),
        upperCase: value => /[A-Z]/.test(value),
        number: value => /[0-9]/.test(value),
        minLength: minLength(8)
      },
      confirmPassword: {
        sameAsPassword: sameAs('password')
      }
    }
  },
  methods: {
    doSignIn() {
      SplSpinnerService.on();
      UserService.signIn(this.user)
        .then(() => this.$router.push({name: 'home'}))
        .catch(error => {
          NotificationService.error(error);
        })
        .finally(() => SplSpinnerService.off())
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
