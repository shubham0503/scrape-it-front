import axios from 'axios';

const API_URL = 'http://localhost:3000/';

class CouponService {
  async addCoupon() {
    const response = await axios.get(API_URL+'scrape-coupons');

    if (response) {
      return response;
    }
  }

  async getCouponList() {
    const response = await axios.get(API_URL+'coupon-list');
    console.log(API_URL)

    if (response) {
      return response;
    }
  }
}

export default new CouponService();
