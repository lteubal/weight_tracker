 <template>
    <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      dark
      color="teal darken-2"
    >
      <v-list dense >
        <v-list-item @click="">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="">
          <v-list-item-action>
            <v-icon>mdi-contact-mail</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="teal darken-1"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-content class="grey lighten-2">
      <v-container fluid >
        <v-layout row>
          <v-flex xs12 order-ls1>
            <v-card dark tile flat color="blue darken-2">
              <v-card-text>
                <p class="text-center">
                  <chart-component />
                </p>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 sm12 md6 >
            <v-card dark tile flat color="error" >
              <v-card-text class="pa-0">
                <p class="text-center">
                  <v-layout column class="pa-0">
                    <v-flex xs12 sm12 md6>
                      <v-card tile flat color="grey lighten-2">
                        <v-card-text>
                          <p class="text-center">
                            <personal-info-component />
                          </p>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm12 md6>
                      <v-card tile flat color="grey lighten-2">
                        <v-card-text>
                          <p class="text-center">
                            <timeline-component />
                          </p>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </p>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12 sm12 md6 >
            <v-card dark tile flat color="error" >
              <v-card-text class="pa-0">
                <p class="text-center">
                  <v-layout column class="pa-0">
                    <v-flex xs12 sm12 md6>
                      <v-card tile flat color="grey lighten-2">
                        <v-card-text>
                          <p class="text-center">
                            <weight-info-component />
                          </p>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                    <v-flex xs12 sm12 md6>
                      <v-card tile flat color="grey lighten-2">
                        <v-card-text>
                          <p class="text-center">
                            <badges-component />
                          </p>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </p>
              </v-card-text>
            </v-card>
          </v-flex>
          
        </v-layout>
       
      </v-container>
    </v-content>
    
  </v-app>
</template>

<script>
    import ChartComponent  from './ChartComponent';
    import TimelineComponent  from './TimelineComponent';
    import WeightInfoComponent  from './WeightInfoComponent';
    import PersonalInfoComponent  from './PersonalInfoComponent';
    import BadgesComponent  from './BadgesComponent';

    export default {
      components: {
        ChartComponent,
        TimelineComponent,
        PersonalInfoComponent, 
        WeightInfoComponent,
        BadgesComponent 
      },
      props: {
        source: String,
      },
      data: () => ({
        drawer: null,
      }),
    }
</script>

 