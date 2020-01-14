<template>
    <div v-if="show" class="overlay">
        <div class="spl-modal">
            <div class="modal-content" :class="classObject">
                <div class="header">
                    <h1>{{title}}</h1>
                    <spl-button type="icon"
                        name="far fa-window-close"
                        v-model="show"
                        @click="$emit('update:show', false)" />
                </div>
                <slot name="content"></slot>
            </div>
        </div>
    </div>
</template>

<script>
import SplButton from './SplButton/SplButton';

export default {
    name: 'SplModal',
    components: { SplButton },
    props: {
        show: { type: Boolean, default: false },
        title: { type: String, default: '' },
        size: { type: String, default: 'auto', validator: (val) => ['auto', 'sm', 'md', 'lg', 'full'].includes(val) }
    },
    methods: {
        doClose() {
            //this.$emit('show', false);
        }
    },
    computed: {
        classObject() {
            return {
                sm: this.size === 'sm',
                md: this.size === 'md',
                lg: this.size === 'lg',
                full: this.size === 'full'
            }
        }
    }
}
</script>

<style lang="scss" scoped>

  .overlay {
        background: rgba(0,0,0,.3);
        z-index: 88888888;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .spl-modal {
        background: transparent;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: $black;

        & .sm {
            width: 25%;
        }

        & .md {
            width: 50%;
        }

        & .lg {
            width: 75%;
        }

        & .full {
            width: 100%;
        }

        & .modal-content {
            background: $modal-background;
            padding: 15px;
            border-radius: $modal-radius;
            box-shadow: $modal-box-shadow;

            & .header {

                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                border-bottom: 1px solid $modal-divider;
                margin-bottom: 15px;

                 & h1 {
                    font-size: $modal-title-size;
                 }
            }
        }
    }
</style>