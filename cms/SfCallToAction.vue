<template>
  <SfCallToAction
    v-editable="blok"
    :title="blok.title"
    button-text="Subscribe"
    :description="blok.description"
    image="/homepage/newsletter.webp"
    class="call-to-action"
    style="margin-bottom: 80px"
  />
</template>

<script>
import {
  SfCallToAction
} from '@storefront-ui/vue';

export default {
  components: {
    SfCallToAction
  },
  props: {
    blok: {
      type: Object,
      required: true
    }
  }
}
</script>
