<template>
    <div v-if="show" class="overlay fa-3x">
        <div class="spinner-content">
            <i class="fas fa-spinner fa-spin"></i>
        </div>
    </div>
</template>

<script>
import { SplSpinnerService } from '../services';

export default {
    name: 'SplSpinner',
    data() {
        return {
            show: false,
            subscription: {}
        }
    },
    created() {
        this.subscription = SplSpinnerService.subscribe(objSpinner => {
            this.show = objSpinner.show;
        })
    },
    destroyed() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
</script>

<style lang="scss" scoped>
    .overlay {
        background: rgba(0,0,0,.3);
        z-index: 99999999;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .spinner-content {
        background: transparent;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: $black;
    }
</style>