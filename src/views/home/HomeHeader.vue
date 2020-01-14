<template>
    <header class="page-header">
        <div class="branding">
            <div class="logo">
                <em class="fab fa-vuejs fa-4x logo"></em>
            </div>
            <div>
                <h1>Sample APP Vue.js</h1>
            </div>
        </div>
        <div class="profile">
            <SplAvatar :name="name" />
            <span class="name">{{name}}</span>
            <SplButton type="icon" color="danger" name="fas fa-power-off" @click="doLogout" />
        </div>
    </header>
</template>

<script>
import { SplAvatar, SplButton } from '../../components';
import { TokenService, UserService } from '../../services';

export default {
    name: 'HomeHeader',
    components: { SplAvatar, SplButton },
    data() {
        return {
            name: ''
        }
    },
    methods: {
        doLogout() {
            UserService.logout();
            this.$router.push({ name: 'Login' })
        }
    },
    mounted() {
        this.name = TokenService.getName();
    }
}
</script>

<style lang="scss" scoped>

    .page-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: $header-font-size;
        line-height: $header-line-height;
        border-bottom: $header-divider;
        color: $header-color;
        margin-bottom: 40px;

        & .branding {
            display: flex;
            align-items: center;
            justify-content: space-between;

            & .logo {
                margin-right: 5px;
            }
        }

        & .profile {
            display: flex;
            justify-content: space-between;
            align-items: center;

            & .name {
                margin-left: 5px;
            }

            & i {
                color: $brand-danger;
                margin-left: 15px;
            }
        }
    }
</style>