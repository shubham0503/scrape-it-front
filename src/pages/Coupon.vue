<template>
  <v-app id="coupon">
    <Navigation />
    <v-main>
      <CouponForm />
      <br>
      <br>
      <v-card class="mx-auto" max-width="900">
        <v-toolbar color="primary" dark>
          <v-toolbar-title>All Coupon List</v-toolbar-title>

          <v-spacer></v-spacer>
        </v-toolbar>
        <v-data-table
          :headers="headers"
          :items="filteredCouponList"
          :search="search"
        ></v-data-table>
      </v-card>
      <br>
      <br>
      <v-snackbar
        max-width="100%"
        v-model="snackbar.show"
        :timeout="timeout"
        shaped
      >
        {{ snackbar.message }}
        <template v-slot:action="{ attrs }">
          <v-btn
            color="blue"
            text
            v-bind="attrs"
            @click="snackbar.show = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
  import Navigation from '@/components/organisms/Navigation';
  import Footer from '@/components/organisms/Footer';
  import CouponForm from '@/components/organisms/CouponForm';
  import { mapGetters } from 'vuex';
  import _ from 'lodash';

  export default {
    data: () => ({
      headers: [
        {
          text: 'Id',
          align: 'start',
          filterable: false,
          value: 'id',
        },
        { text: 'Coupon Code', value: 'coupon_code' },
        { text: 'Brand', value: 'brand' },
        { text: 'Title', value: 'title' },
        { text: 'Description', value: 'description' }
      ],
      search: '',
      snackbar: {
        show: false,
        message: null
      },
      timeout: 5000
    }),
    computed: {
      ...mapGetters({
        couponList: 'coupon/getCoupon'
      }),
      filteredCouponList() {
        return _.orderBy(this.couponList.filter(item => {
          if(!this.search) return this.couponList;
          return (
            item.title.toLowerCase().includes(this.search.toLowerCase()) ||
            item.description.toLowerCase().includes(this.search.toLowerCase())
          );
        }), ['dueDate'],['asc']);
      }
    },
    components: {
      Navigation,
      Footer,
      CouponForm
    },
    props: {
      source: String,
    },
    created() {
      this.$store.dispatch('coupon/fetchCoupon');
    }
  }
</script>
<style scoped>
  .v-list{
    height:400px;/* or any height you want */
    overflow-y:auto
  }
  .search-box {
    margin-top: 30px;
  }
</style>
