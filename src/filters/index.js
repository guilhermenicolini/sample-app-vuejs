import Vue from 'vue';
import { price, millis } from './filters';

Vue.filter('price', price);
Vue.filter('millis', millis);