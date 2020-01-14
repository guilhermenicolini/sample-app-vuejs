<template>
  <section class="centered">
    <div class="item">
        <spl-card :title="labels.title" subTitle="application" type="icon">
          <template slot="header">
            <em class="fab fa-vuejs"></em>
          </template>

          <template slot="content">
            <login-form v-if="isLogin" />
            <SignInForm v-if="!isLogin" />
          </template>

          <template slot="footer">
            <div class="actions">
              <spl-button :name="labels.button" align="center" type="flat" @click="changeForm" />
            </div>
          </template>
        </spl-card>
    </div>
  </section>
</template>

<script>
import { SplCard, SplButton } from '../../components'
import LoginForm from './LoginForm';
import SignInForm from './SignInForm';

export default {
  name: 'Login',
  components: { SplCard, LoginForm, SignInForm, SplButton },
  data() {
    return {
      isLogin: true
    }
  },
  methods: {
    changeForm() {
      this.isLogin = !this.isLogin;
    }
  },
  computed: {
    labels() {
      return {
        title: this.isLogin? 'Login' : 'Sign-In',
        button: this.isLogin ? 'Sign-In' : 'back to login'
      }
    }
  }
}
</script>

<style scoped>

  .centered {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
  }

  .actions {
    display: flex;
    justify-content: center;
  }
</style>




