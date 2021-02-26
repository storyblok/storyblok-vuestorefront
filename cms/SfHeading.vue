<template>
  <div
    class="similar-products"
    v-editable="blok"
    style="margin-bottom: 20px">
    <SfHeading :title="blok.heading" :level="3"/>
    <nuxt-link :to="localePath('/c/women')" class="smartphone-only">See all</nuxt-link>
  </div>
</template>

<script>
import {
  SfHeading
} from '@storefront-ui/vue';

export default {
  components: {
    SfHeading
  },
  props: {
    blok: {
      type: Object,
      required: true
    }
  }
}
</script>
