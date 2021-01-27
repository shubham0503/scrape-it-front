<template>
  <v-row>
    <div v-if="loading" class="loader"></div>
    <v-card class="mt-12 mx-auto" max-width="900">
      <v-btn block
        color="blue-grey"
        class="white--text"
        @click="addCoupon" 
        x-large
      >
        Pull Coupons
        <v-icon
          right
          dark
        >
          mdi-cloud-upload
        </v-icon>
      </v-btn>
    </v-card>
    
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
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-row>
</template>
<script>
  export default {
    data: () => ({
      dialog: false,
      loading: false,
      snackbar: {
        show: false,
        message: null
      },
      timeout: 5000
    }),
    methods: {
      async addCoupon() {
        try {
          this.loading = true;
          const couponPullResponse = await this.$store.dispatch('coupon/addCoupon');
          if (couponPullResponse?.status === 200) {
            console.log(couponPullResponse);
            if (!couponPullResponse?.data?.isNewCoupon) {
              this.loading = false;

              this.snackbar.message = couponPullResponse.data.message;
              this.snackbar.show = true;
            } else {
              await this.$store.dispatch('coupon/fetchCoupon');
              this.loading = false;

              this.snackbar.message = "Coupons Pulled.";
              this.snackbar.show = true;
            }
          } else {
            this.snackbar.message = "Something went wrong. Please try again later.";
            this.snackbar.show = true;
          }
        } catch (err) {
          this.snackbar.message = "Something went wrong. Please try again later.";
          this.snackbar.show = true;
        }
      }
    }
  }
</script>
<style scoped>
.loader {
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background: url('//upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Phi_fenomeni.gif/50px-Phi_fenomeni.gif') 50% 50% no-repeat rgba(185, 184, 184, 0.267);
}
</style>