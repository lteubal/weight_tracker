<template>
<v-app id="inspire">

  <v-navigation-drawer v-model="drawer" app dark >

    <v-list dense>
      <v-list-item>
        <v-spacer></v-spacer>
        <v-list-item-content>
          <v-avatar  size="62" class="ma-auto">
            <img
              src="/images/logo.png"
              alt="John"
            >
          </v-avatar>
        </v-list-item-content>
        <v-spacer></v-spacer>
      </v-list-item>
      <v-list-item>
        <v-list-item-action>
          <v-icon>home</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            <router-link to="/home" class="white--text subtitle-1	">Dashboard</router-link>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-action>
          <v-icon>build</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            <router-link to="/personal-info" class="white--text subtitle-1">Personal Settings</router-link>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-action>
          <v-icon>list_alt</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            <router-link to="/timeline" class="white--text subtitle-1	">Daily Weights</router-link>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-action>
          <v-icon>speed</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            <router-link to="/weight-info" class="white--text subtitle-1	">Body Mass Index</router-link>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-action>
          <v-icon>timeline</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            <router-link to="/chart" class="white--text subtitle-1	">History Chart</router-link>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-app-bar app   dark>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>Weight Tracker </v-toolbar-title>
  </v-app-bar>

  <v-content  >
    <router-view></router-view>
  </v-content>

</v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
  })
}
</script>

<style>
button:focus {
  outline: 0;
}
</style>

<style scoped>
.chart-box {
  margin: 0 30px 15px 15px;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12);
  border-radius: 5px;
}
.v-app-bar {
  background-color: #C44B4F;
}
.v-navigation-drawer {
  background: #4C5355;
}

.v-content {
  background-color: #CBCDCB;
}
</style>
