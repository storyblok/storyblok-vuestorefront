<template>
  <SfBannerGrid
    v-editable="blok"
    :banner-grid="parseInt(blok.version)"
    class="banner-grid"
    style="margin-bottom: 80px">
    <template v-for="item in blok.banners" v-slot:[item.slot]>
      <SfBanner
        v-editable="item"
        :key="item.slot"
        :title="item.title"
        :subtitle="item.subtitle"
        :description="item.description"
        :button-text="item.button_text"
        :image="item.image.filename"
        :class="item.class"
      />
    </template>
  </SfBannerGrid>
</template>

<script>
import {
  SfBannerGrid,
  SfBanner
} from '@storefront-ui/vue';

export default {
  components: {
    SfBannerGrid,
    SfBanner
  },
  props: {
    blok: {
      type: Object,
      required: true
    }
  }
}
</script>
