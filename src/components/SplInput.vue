<template>
  <div class="spl-input">
    <label :for="id">{{placeholder}}<span v-if="required" class="required">*</span></label>
    <input
      v-if="inputType === 'input'"
      :type="type"
      :value="value"
      @input="$emit('input', $event.target.value)"
      :class="clazz"
      @keypress="keyPress"
      :autocomplete="autocomplete"
    />
    <textarea
      v-if="inputType === 'textarea'"
      :value="value"
      @input="$emit('input', $event.target.value)"
      :class="clazz"
      :rows="rows"
      @keypress="keyPress"
    ></textarea>
    <div v-if="showHelper" class="helper">
      <span :class="{ error: dirty && hasError }">{{ dirty && hasError ? error : helper }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SplInput',
  props: {
    type: {
      type: String,
      default: 'text',
      validator: value =>
        ['text', 'textarea', 'password', 'email'].indexOf(value) >= 0
    },
    id: { type: String, required: true },
    placeholder: { type: String, default: null },
    autocomplete: { type: String, default: null },
    rows: { type: Number, default: 3 },
    value: { type: [String, Number], default: null },
    required: { type: Boolean, default: false },
    format: { type: String, default: '', validator: value => ['','number','decimal'].indexOf(value) >= 0 },
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
    },
    inputType() {
      return this.type === 'textarea' ? 'textarea' : 'input';
    }
  },
  watch: {
    value() {
      this.dirty = true;
    }
  },
  methods: {
    keyPress(e) {
      switch(this.format) {
        case 'number':
          return this.isNumber(e);
        case 'decimal':
          return this.isDecimal(e);
        default:
          return true;
      }
    },
    isNumber(e) {
      const charCode = e.keyCode;
      if (charCode > 47 && charCode < 58) {
        return true;
      } else {
        e.preventDefault();
        return false;
      }
    },
    isDecimal(e) {
      const charCode = e.keyCode;
      if ((charCode > 47 && charCode < 58) || charCode === 46) {
        return true;
      } else {
        e.preventDefault();
        return false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.spl-input {
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

  & input, textarea, password {
    padding: 5px;
    border-radius: 2px;
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