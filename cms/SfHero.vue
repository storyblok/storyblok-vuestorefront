<template>
  <SfHero
    v-editable="blok"
    class="hero"
    style="margin-bottom: 80px">
    <SfHeroItem
      v-for="(hero, i) in blok.heroes"
      v-editable="hero"
      :key="i"
      :title="hero.title"
      :subtitle="hero.subtitle"
      :button-text="hero.button_text"
      :background="hero.background_color.color"
      :image="hero.image.filename"
      :class="hero.image_left ? 'sf-hero-item--position-bg-top-left sf-hero-item--align-right' : ''"
    />
  </SfHero>
</template>

<script>
import {
  SfHero
} from '@storefront-ui/vue';

export default {
  components: {
    SfHero
  },
  props: {
    blok: {
      type: Object,
      required: true
    }
  }
}
</script>
