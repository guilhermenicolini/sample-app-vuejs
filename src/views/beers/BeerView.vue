<template>
  <div class="beer-view">
    <div class="beer-name">
      <label>Beer Name:</label>
      {{beer.beerName}}
    </div>
    <div class="brewer">
      <label>Brewer:</label>
      {{beer.brewer}}
    </div>
    <div class="price">
      <label>Price:</label>
      {{beer.price | price}}
    </div>
    <div class="sampled">
      <label>Sampled:</label>
      {{beer.sampled}}
    </div>
    <div class="rating">
      <label>Rating:</label>
      <spl-rating :stars="beer.rating"></spl-rating>
    </div>
    <div class="notes">
      <label>Notes:</label>
      {{beer.notes}}
    </div>
    <div class="stats">
      <div class>
        <label>ABV:</label>
        {{beer.abv}}%
      </div>
      <div class>
        <label>IBU:</label>
        {{beer.ibu}}
      </div>
      <div class>
        <label>Serving Type:</label>
        {{beer.servingType}}
      </div>
    </div>
    <div class="flavor-wheel">
      <label>Flavor Wheel</label>
      <div>
        <spl-flavor-wheel :data="beer.flavorWheel" />
      </div>
    </div>
  </div>
</template>

<script>
import { SplRating, SplFlavorWheel } from "../../components";

export default {
  name: "BeerView",
  components: { SplRating, SplFlavorWheel },
  props: {
    beer: { type: Object, required: true }
  }
};
</script>

<style lang="scss" scoped>
.beer-view {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  & label {
    font-weight: 500;
  }

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

  & .flavor-wheel {
    text-align: center;
    grid-column: 2 / -1;
  }
}
</style>