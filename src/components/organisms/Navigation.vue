<template>
  <section>
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title>Hi, Guest</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-for="(item, index) in navItems" :key="index" :to="item.link" link>
          <v-list-item-action>
            <v-icon>mdi-{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Scrape-it </v-toolbar-title>
    </v-app-bar>
  </section>
</template>
<script>
  export default {
    data: () => ({
      drawer: false,
      navItems: [
        {
          link: '/coupons',
          title: 'Coupons',
          icon: 'calendar'
        }
      ]
    })
  }
</script>
