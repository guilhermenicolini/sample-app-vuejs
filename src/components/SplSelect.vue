<template>
  <div class="spl-select">
    <label :for="id">{{label}}<span v-if="required" class="required">*</span></label>
    <select
        :id="id"
        :value="value"
        @input="$emit('input', $event.target.value)"
        :class="clazz"
    >
        <option v-for="option in options" :key="option">{{option}}</option>
    </select>
    <div v-if="showHelper" class="helper">
      <span :class="{ error: dirty && hasError }">{{ dirty && hasError ? error : helper }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SplSelect',
  props: {
    id: { type: String, required: true },
    label: { type: String, default: null },
    options: { type: Array, default: () => [''] },
    value: { type: [String, Number], default: null },
    required: { type: Boolean, default: false },
    showHelper: { type: Boolean, default: true },
    helper: { type: String, default: null },
    error: { type: String, default: null }
  },
  data() {
    return {
      dirty: false
    };
  },
  computed: {
    hasError() {
      return this.error ? true : false;
    },
    clazz() {
      return {
        invalid: this.dirty && this.hasError
      };
    }
  },
  watch: {
    value() {
      this.dirty = true;
    }
  }
};
</script>

<style lang="scss" scoped>
    .spl-select {
        display: grid;
        align-items: center;

        & label {
            margin: 0 0 5px 0;
        }

        & .required {
            margin-left: 5px;
            color: $form-error-color;
            font-weight: 500;
        }

        & select {
            padding: 5px;
            border-radius: 2px;
            background-color: $white;
            outline: none;
            width: calc(100% - .7px);
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
        

            @include form-input-border($form-border-neutral);

            &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            }

            &:not(:disabled):hover {
            @include form-input-border($form-border-hover);
            }

            &:focus {
            @include form-input-border($form-border-hover);
            @include form-input-box-shadow($form-border-hover);
            }

            &.invalid:not(:disabled) {
            @include form-input-border($form-border-error);
            }

            &.invalid:not(:disabled):focus {
            @include form-input-border($form-border-error);
            @include form-input-box-shadow($form-border-error);
            }
        }

        & .helper {
            min-height: 21px;

            & .error {
            color: $form-error-color;
            }
        }
    }
</style>