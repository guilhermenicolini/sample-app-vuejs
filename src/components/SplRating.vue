<template>
    <div class="spl-rating">
        <label v-if="showLabel">Rating<span v-if="required" class="required">*</span></label>
        <button @click.prevent="setRating(1)" @mouseover="viewRating(1)" @mouseleave="refresh" :disabled="readOnly" ><em class="fas fa-star" :class="clazz(1)" /></button>
        <button @click.prevent="setRating(2)" @mouseover="viewRating(2)" @mouseleave="refresh" :disabled="readOnly" ><em class="fas fa-star" :class="clazz(2)" /></button>
        <button @click.prevent="setRating(3)" @mouseover="viewRating(3)" @mouseleave="refresh" :disabled="readOnly" ><em class="fas fa-star" :class="clazz(3)" /></button>
        <button @click.prevent="setRating(4)" @mouseover="viewRating(4)" @mouseleave="refresh" :disabled="readOnly" ><em class="fas fa-star" :class="clazz(4)" /></button>
        <button @click.prevent="setRating(5)" @mouseover="viewRating(5)" @mouseleave="refresh" :disabled="readOnly" ><em class="fas fa-star" :class="clazz(5)" /></button>
        <div v-if="showHelper" class="helper">
          <span :class="{ error: dirty && hasError }">{{ dirty && hasError ? error : helper }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SplRating',
    props: {
        stars: { type: Number, default: 0 },
        readOnly: { type: Boolean, default: true },
        required: { type: Boolean, default: false },
        showLabel: { type: Boolean, default: false },
        showHelper: { type: Boolean, default: false },
        helper: { type: String, default: null },
        error: { type: String, default: null }
    },
    data() {
      return {
        temp: 0,
        dirty: false
      }
    },
    computed: {
      hasError() {
        return this.error ? true : false;
      }
    },
    methods: {
      clazz(stars) {
        return  {
          editable: !this.readOnly,
          active: this.temp >= stars
        }
      },
      setRating(value) {
        this.dirty = true;
        this.$emit('update:stars', value);
      },
      viewRating(value) {
        this.temp = value;
      },
      refresh() {
        this.temp = this.stars;
      }
    },
    mounted() {
      this.refresh();
    },
    watch: {
      stars() {
        this.refresh();
      }
    }
}
</script>

<style lang="scss" scoped>

  .spl-rating {
    min-width: 80px;

    & label {
      display: block;
      margin: 0 0 5px 0;
    }

    & .required {
      margin-left: 5px;
      color: $form-error-color;
      font-weight: 500;
    }

    & em {
      color: $rating-disabled;
    }

    & button {
      border: none;
      background: none;
      padding: 0;
      outline: none;
    }

    & .helper {
      min-height: 21px;

      & .error {
        color: $form-error-color;
      }
    }
  }

  .active {
    color: $rating-active !important;
  }

  .editable {
    cursor: pointer;
  }
</style>