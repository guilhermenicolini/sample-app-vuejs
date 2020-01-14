<template>
  <div>
    <div class="tabs">
      <SplSelectButton
        label="General"
        :selected="generalSelected"
        @click="selectTab(tabs.GENERAL)"
      />
      <SplSelectButton
        label="Flavor Wheel"
        :selected="flavorWheelSelected"
        @click="selectTab(tabs.FLAVOR_WHEEL)"
      />
    </div>
    <form novalidate v-on:submit.prevent="doSave">
      <div class="beer-form" v-if="generalSelected">
        <div class="beer-name">
          <spl-input
            id="beerName"
            type="text"
            placeholder="Beer Name"
            :required="true"
            v-model="beer.beerName"
            :error="getError('beer.beerName')"
          />
        </div>
        <div class="brewer">
          <spl-input
            id="brewer"
            type="text"
            placeholder="Brewer"
            :required="true"
            v-model="beer.brewer"
            :error="getError('beer.brewer')"
          />
        </div>
        <div class="price">
          <spl-input
            id="price"
            type="text"
            placeholder="Price"
            :required="true"
            format="decimal"
            v-model="beer.price"
            :error="getError('beer.price')"
          />
        </div>
        <div class="sampled">
          <spl-input
            id="sampled"
            type="text"
            placeholder="Sampled"
            :required="true"
            v-model="beer.sampled"
            :error="getError('beer.sampled')"
          />
        </div>
        <div class="rating">
          <spl-rating
            :stars.sync="beer.rating"
            :readOnly="false"
            :required="true"
            :showLabel="true"
            :showHelper="true"
            :error="getError('beer.rating')"
          />
        </div>
        <div class="notes">
          <spl-input
            id="notes"
            type="textarea"
            placeholder="Notes"
            v-model="beer.notes"
            :v="$v.beer.notes"
          />
        </div>
        <div class="abv">
          <spl-input
            id="abv"
            type="text"
            placeholder="Abv"
            :required="true"
            format="decimal"
            v-model="beer.abv"
            :error="getError('beer.abv')"
          />
        </div>
        <div class="ibu">
          <spl-input
            id="ibu"
            type="text"
            placeholder="Ibu"
            :required="true"
            format="number"
            v-model="beer.ibu"
            :error="getError('beer.ibu')"
          />
        </div>
        <div class="servingType">
          <spl-input
            id="servingType"
            type="text"
            placeholder="Serving Type"
            :required="true"
            v-model="beer.servingType"
            :error="getError('beer.servingType')"
          />
        </div>
      </div>
      <div class="flavor-wheel-form" v-if="flavorWheelSelected">
        <div v-for="flavor in flavors" class="flavor" :key="flavor.code">
          <SplSelect
            :id="flavor.code"
            :label="flavor.label"
            v-model="beer.flavorWheel[flavor.code]"
            :options="flavorWheelOptions"
            />
        </div>
      </div>
      <div class="button">
        <spl-button name="Update" color="success" :disabled="invalid" />
      </div>
    </form>
  </div>
</template>

<script>
import {
  SplSelectButton,
  SplInput,
  SplButton,
  SplRating,
  SplSelect
} from '../../components';
import { required, minValue, decimal } from 'vuelidate/lib/validators';
import {
  BeerService,
  SplSpinnerService,
  NotificationService
} from '../../services';

import { SCREEN_MODE, TABS } from '../../constants';

import { ValidationMixin } from '../../mixins';
import { date } from '../../validators';

export default {
  name: 'BeerForm',
  components: { SplSelectButton, SplInput, SplButton, SplRating, SplSelect },
  mixins: [ValidationMixin],
  props: {
    beer: { type: Object, required: true },
    mode: { type: String, default: SCREEN_MODE.VIEW }
  },
  data() {
    return {
      generalSelected: true,
      flavorWheelSelected: false,
      flavors: [
        { code: 'alcohol', label: 'Alcohol' },
        { code: 'darkFruit', label: 'Dark Fruit' },
        { code: 'citrusFruit', label: 'Citrus Fruit' },
        { code: 'hoppy', label: 'Hoppy' },
        { code: 'floral', label: 'Floral' },
        { code: 'spicy', label: 'Spicy' },
        { code: 'herbal', label: 'Herbal' },
        { code: 'malty', label: 'Malty' },
        { code: 'toffee', label: 'Toffee' },
        { code: 'burnt', label: 'Burnt' },
        { code: 'sweet', label: 'Sweet' },
        { code: 'sour', label: 'Sour' },
        { code: 'bitter', label: 'Bitter' },
        { code: 'dry', label: 'Dry' },
        { code: 'body', label: 'Body' },
        { code: 'linger', label: 'Linger' }
      ],
      flavorWheelOptions: ['','1','2','3','4','5']
    };
  },
  validations: {
    beer: {
      beerName: { required },
      brewer: { required },
      price: { required, minValue: minValue(0) },
      sampled: { required, date },
      rating: { required },
      notes: {},
      abv: { required, decimal },
      ibu: { required },
      servingType: { required }
    }
  },
  methods: {
    selectTab(tab) {
      this.generalSelected = tab === this.tabs.GENERAL;
      this.flavorWheelSelected = tab === this.tabs.FLAVOR_WHEEL;
    },
    doSave() {
      this.mode === SCREEN_MODE.EDIT
        ? this.update(this.beer)
        : this.create(this.beer);
    },
    update(beer) {
      SplSpinnerService.on();
      BeerService.update(beer)
        .then(() => {
          this.$emit('onUpdated', {
            id: beer.id,
            beerName: beer.beerName,
            brewer: beer.brewer,
            rating: beer.rating
          });
        })
        .catch(error => {
          NotificationService.error(error);
        })
        .finally(() => SplSpinnerService.off());
    },
    create(beer) {
      SplSpinnerService.on();
      BeerService.create(beer)
        .then(response => {
          this.$emit('onCreated', {
            id: response.location,
            beerName: beer.beerName,
            brewer: beer.brewer,
            rating: beer.rating
          });
        })
        .catch(error => {
          NotificationService.error(error);
        })
        .finally(() => SplSpinnerService.off());
    }
  },
  computed: {
    invalid() {
      return this.$v.$invalid;
    },
    tabs() {
      return TABS;
    }
  }
};
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  margin-bottom: 15px;
}

.beer-form {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 20px;
  min-height: 460px;

  & .beer-name,
  .notes {
    grid-column: 1 / -1;
  }

  & .notes {
    margin: 10px 0;
  }

  & .brewer,
  .sampled {
    grid-column: 1 / 3;
  }

  & .rating {
    display: flex;
  }

  & .stats {
    grid-column: 1 / 2;
  }
}

.flavor-wheel-form {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 20px;
  min-height: 460px;

  & .flavor {
    display: flex;
    flex-direction: column;
  }
}

.button {
  text-align: right;
  margin: 0 auto;
}
</style>