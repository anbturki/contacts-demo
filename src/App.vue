<template>
  <v-app>
    <!-- <v-app-bar app color="primary" dark>
      <div class="d-flex align-center"></div>

      <v-btn text>
        <span class="mr-2">My Contacts</span>
      </v-btn>
    </v-app-bar> -->

    <v-main>
      <Contacts />
    </v-main>
  </v-app>
</template>

<script>
import Contacts from './components/Contacts'

export default {
  name: "App",

  components: {
    Contacts
  },

  data: () => ({
    //
  })
};
</script>
