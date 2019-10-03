<template>
  <div>
    <WeightInfoComponent></WeightInfoComponent>
    <BadgesStandaloneComponent></BadgesStandaloneComponent>
  </div>
</template>

<script>
import WeightInfoComponent from './WeightInfoComponent';
import BadgesStandaloneComponent from './BadgesStandaloneComponent';

export default {
  name: "WeightBadgesComponent",
  components: {
    WeightInfoComponent,
    BadgesStandaloneComponent,
  },
}
</script>
 