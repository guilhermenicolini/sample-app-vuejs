<template>
  <div class="content">
     <home-header />
     <spl-card title="Beers" subTitle="my" type="icon">
        <template slot="header">
          <em class="fas fa-beer"></em>
        </template>

        <template slot="content">
          <beer-list />
        </template>
      </spl-card>
  </div>
</template>

<script>
import HomeHeader from './HomeHeader';
import BeerList from '../beers/BeerList';
import { SplCard } from '../../components';

export default {
  name: 'Home',
  components: { HomeHeader, BeerList, SplCard }
}
</script>

<style scoped>
  .content {
    width: 85%;
    margin: 0 auto;
  }
</style>
