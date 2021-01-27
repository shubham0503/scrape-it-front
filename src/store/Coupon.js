import CouponService from '../services/Coupon';

const state = {
  coupons: [],
  newCoupon: ''
}

const getters = {
  getCoupon(state) {
    return state.coupons;
  }
}

const mutations = {
  GET_COUPON(state, coupon){
    state.coupons = coupon
  },
  ADD_COUPON(state, coupon){
    state.coupons.push({
      ...coupon
    })
  }
}

const actions = {
  async fetchCoupon({commit}){
    try {
      const couponResponse = await CouponService.getCouponList();
      if (couponResponse?.status === 200) {
        commit('GET_COUPON', couponResponse.data.data);
      }
      return true;
    } catch (err) {
      console.log(err);
    }
  },
  async addCoupon(){
    try {
      const couponResponse = await CouponService.addCoupon();
      return couponResponse;
    } catch (err) {
      console.log(err);
    }
  }
}

export const coupon = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
