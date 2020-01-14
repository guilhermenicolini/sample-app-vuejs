<template>
  <div class="spl-card">
    <div class="spl-card-header" :class="classObject">
      <slot name="header"></slot>
    </div>
    <div class="spl-card-title">
      <p class="title">{{subTitle}}</p>
      <h3>{{title}}</h3>
    </div>
    <div class="spl-card-content" :class="classContentObject">
      <slot name="content"></slot>
    </div>
    <div class="spl-card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script>
import colors from './utils/ComponentColors';

export default {
  name: "SplCard",
  props: {
    title: { type: String},
    subTitle: { type: String},
    color: { type: String, default: "primary" },
    type: { type: String, default: "text", validator: (val) => ['text', 'icon'].includes(val) }
  },
  computed: {
    classObject() {
      const clazz = {
        text: this.type === 'text',
        icon: this.type === 'icon'
      };

      return { ...colors(this.color), ...clazz }
    },
    classContentObject() {
      return {
        padBottom: this.$slots.footer === undefined
      }
    }
  }
};
</script>
<style lang="scss" scoped>

  .spl-card {
    display: inline-block;
    position: relative;
    width: 100%;
    margin: 25px 0;
    box-shadow: $box-shadow;
    border-radius: $box-radius;
    background-color: $box-background;
  }

  .spl-card .spl-card-header {
    float: left;
    text-align: center;
    box-shadow: $box-shadow;
    border-radius: $box-radius;
    margin: -20px 15px 0;
    padding: 15px;
    color: $label-light;
    font-size: $label-size-large;

    &.text {
      font-size: 36px;
      text-transform: uppercase;
      min-height: 56px;
      line-height: 56px;
      min-width: 56px;
    }

    &.icon {
      height: 56px;
      width: 56px;
      min-height: 56px;
      min-width: 56px;
      font-size: 56px;
      vertical-align: center;
      display: flex;
      justify-content: center;

    }

    &.primary {
      background: linear-gradient(60deg,$brand-primary-lighter, $brand-primary-darker);
    }

    &.success {
      background: linear-gradient(60deg,$brand-success-lighter, $brand-success-darker);
    }

    &.danger {
      background: linear-gradient(60deg,$brand-danger-lighter, $brand-danger-darker);
    }

    &.warning {
      background: linear-gradient(60deg,$brand-warning-lighter, $brand-warning-darker);
    }

    &.info {
      background: linear-gradient(60deg,$brand-info-lighter, $brand-info-darker);
    }

    &.rose {
      background: linear-gradient(60deg,$brand-rose-lighter, $brand-rose-darker);
    }
  }

  .spl-card .spl-card-title {
   text-align: right;
   padding: 10px 20px;
  }

  .title {
    color: $box-label-light;
    margin: 0;
  }

  h3 {
    font-weight: 300;
    font-size: 1.5rem;
    margin: 0;
  }

  .spl-card-content {
    margin: 0 20px 10px;
    padding: 40px 0 0 0;
    border-top: 1px solid $box-divider;
  }

  .padBottom {
    padding-bottom: 40px;
  }

  .serif {
    font-family: $serif;
  }

  .san-serif {
    font-family: $sans-serif;
  }

  .spl-card-footer {
    text-align: center;
    margin-bottom: 10px;
  }

</style>