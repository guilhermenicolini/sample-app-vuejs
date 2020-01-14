<template>
  <div class="spl-select-button" :title="label">
    <button :class="classObject" :selected="selected" @click="onButtonClick">
      <span>{{label}}</span>
    </button>
  </div>
</template>

<script>
import colors from './utils/ComponentColors';

export default {
  name: 'SplSelectButton',
  props: {
    label: { type: String, required: true },
    color: { type: String, default: 'primary' },
    type: {
      type: String,
      default: 'dense',
      validator: value => ['dense'].indexOf(value) >= 0
    },
    selected: { type: Boolean, default: false }
  },
  methods: {
    onButtonClick() {
      if (!this.selected) {
        this.$emit('click');
      }
    }
  },
  computed: {
    classObject() {
      const clazz = {
        dense: this.type === 'dense'
      };

      return { ...colors(this.selected ? this.color : 'neutral'), ...clazz };
    },
    content() {
      return this.type === 'icon'
        ? `<em class="${this.name} ${this.size}"></em>`
        : this.name;
    }
  }
};
</script>

<style lang="scss" scoped>
button.dense {
  border: none;
  border-radius: 2px;
  margin: 0 5px;
  font-size: 1.2em;
  cursor: default;
  outline: none;

  &.neutral {
    color: $brand-neutral-accent;
    background-color: $brand-neutral-lighter;
    cursor: pointer;

    &:hover {
      background-color: $brand-neutral;
    }
  }

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
}
</style>