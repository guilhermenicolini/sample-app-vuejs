<template>
  <div class="spl-button" :title="title">
    <button :class="classObject" :disabled="disabled" @click="onButtonClick" ><span v-html="content"></span></button>
  </div>
</template>
<script>
import colors from '../utils/ComponentColors';

export default {
  name: "SplButton",
  props: {
    color: { type: String, default: 'primary' },
    name: { type: String, default: 'button' },
    disabled: { type: Boolean, default: false },
    type: { type: String, default: 'dense', validator: value => ['dense','flat','icon'].indexOf(value) >= 0 },
    size: { type: String, default: 'fa-2x' },
    title: { type: String, default: '' }
  },
  methods: {
    onButtonClick() {
      this.$emit('click');
    }
  },
  computed: {
    classObject() {
      const clazz = {
        flat: this.type === 'flat',
        dense: this.type === 'dense',
        icon: this.type === 'icon'
      };

      return { ...colors(this.color), ...clazz }
    },
    content() {
      return this.type === 'icon' ? `<em class="${this.name} ${this.size}"></em>` : this.name;
    }
  }
};
</script>
<style lang="scss" scoped>

    button.dense {
      border: none;
      border-radius: 2px;
      padding: 12px 18px;
      font-size: 1.2em;
      text-transform: uppercase;
      cursor: pointer;
      box-shadow: $box-shadow;
      outline: none;

      &.primary {
        color: $brand-primary-accent;
        background: $brand-primary-lighter;
      }

      &.success {
        color: $brand-success-accent;
        background: $brand-success-lighter;
      }

      &.danger {
        color: $brand-danger-accent;
        background: $brand-danger-lighter;
      }

      &.warning {
        color: $brand-warning-accent;
        background: $brand-warning-lighter;
      }

      &.info {
        color: $brand-info-accent;
        background: $brand-info-lighter;
      }

      &.rose {
        color: $brand-rose-accent;
        background: $brand-rose-lighter;
      }

      &:hover{
        &.primary {
          color: $brand-primary-accent;
          background: $brand-primary-darker;
        }

        &.success {
          color: $brand-success-accent;
          background: $brand-success-darker;
        }

        &.danger {
          color: $brand-danger-accent;
          background: $brand-danger-darker;
        }

        &.warning {
          color: $brand-warning-accent;
          background: $brand-warning-darker;
        }

        &.info {
          color: $brand-info-accent;
          background: $brand-info-darker;
        }

        &.rose {
          color: $brand-rose-accent;
          background: $brand-rose-darker;
        }
      }

      &:disabled {
        color: $form-button-disabled-accent !important;
        background-color: $form-button-disabled !important;
        cursor: default;
      }
    }

    button.flat {
      border: none;
      padding: 12px 18px;
      font-size: 16px;
      text-transform: uppercase;
      cursor: pointer;
      outline: none;
      background-color: transparent;

      &:hover {
        &.primary {
          background-color: $brand-primary-inverse;
        }

        &.success {
          background-color: $brand-success-inverse;
        }

        &.danger {
          background-color: $brand-danger-inverse;
        }

        &.warning {
          background-color: $brand-warning-inverse;
        }

        &.info {
          background-color: $brand-info-inverse;
        }

        &.rose {
          background-color: $brand-rose-inverse;
        }
      }

      &:disabled {
        color: $form-button-disabled-accent !important;
        cursor: default;
      }

    }

    button.icon {
      border: none;
      padding: 12px 18px;
      cursor: pointer;
      outline: none;
      background-color: transparent;

      &:hover {
        &.primary {
          color: $brand-primary-darker;
        }

        &.success {
          color: $brand-success-darker;
        }

        &.danger {
          color: $brand-danger-darker;
        }

        &.warning {
          color: $brand-warning-darker;
        }

        &.info {
          color: $brand-info-darker;
        }

        &.rose {
          color: $brand-rose-darker;
        }
      }

      &:disabled {
        color: $form-button-disabled-accent !important;
        cursor: default;
      }
    }
</style>