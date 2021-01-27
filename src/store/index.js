import Vue from 'vue'
import Vuex from 'vuex'
import { coupon } from './Coupon';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    coupon
  }
});
