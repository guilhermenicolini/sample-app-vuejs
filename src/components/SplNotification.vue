<template>
    <notifications classes="spl-notification" />
</template>

<script>
export default {
    name: 'SplNotification'
}
</script>

<style lang="scss">

  .spl-notification {
    padding: 10px;
    margin: 0 5px 5px;
    font-size: $label-size-small;

    color: $brand-info;
    background: $brand-info-inverse;
    border-left: 5px solid $brand-info;

    &.success {
      color: $brand-success;
      background: $brand-success-inverse;
      border-left: 5px solid $brand-success;
    }

    &.warn {
      color: $brand-warning;
      background: $brand-warning-inverse;
      border-left: 5px solid $brand-warning;
    }

    &.error {
      color: $brand-danger;
      background: $brand-danger-inverse;
      border-left: 5px solid $brand-danger;
    }
  }
</style>