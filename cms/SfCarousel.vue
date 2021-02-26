<template>
  <SfCarousel
    class="carousel"
    :settings="{ peek: 16, breakpoints: { 1023: { peek: 0, perView: 2 } } }"
    v-editable="blok"
    style="margin-bottom: 80px">
    <template #prev="{go}">
      <SfArrow
        aria-label="prev"
        class="sf-arrow--left sf-arrow--long"
        @click="go('prev')"
      />
    </template>
    <template #next="{go}">
      <SfArrow
        aria-label="next"
        class="sf-arrow--right sf-arrow--long"
        @click="go('next')"
      />
    </template>
    <SfCarouselItem class="carousel__item" v-for="(product, i) in products" :key="i">
      <SfProductCard
        data-cy="home-url_product"
        :title="product.title"
        :image="product.image"
        :regular-price="product.price.regular"
        :max-rating="product.rating.max"
        :score-rating="product.rating.score"
        :show-add-to-cart-button="true"
        :is-on-wishlist="product.isOnWishlist"
        link="/"
        class="carousel__item__product"
        @click:wishlist="toggleWishlist(i)"
      />
    </SfCarouselItem>
  </SfCarousel>
</template>

<script>
import {
  SfCarousel,
  SfProductCard,
  SfArrow
} from '@storefront-ui/vue';

export default {
  components: {
    SfCarousel,
    SfProductCard,
    SfArrow
  },
  props: {
    blok: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      products: [
        {
          title: 'Cream Beach Bag',
          image: '/homepage/productA.webp',
          price: { regular: '50.00 $' },
          rating: { max: 5, score: 4 },
          isOnWishlist: true
        },
        {
          title: 'Cream Beach Bag',
          image: '/homepage/productB.webp',
          price: { regular: '50.00 $' },
          rating: { max: 5, score: 4 },
          isOnWishlist: false
        },
        {
          title: 'Cream Beach Bag',
          image: '/homepage/productC.webp',
          price: { regular: '50.00 $' },
          rating: { max: 5, score: 4 },
          isOnWishlist: false
        },
        {
          title: 'Cream Beach Bag',
          image: '/homepage/productA.webp',
          price: { regular: '50.00 $' },
          rating: { max: 5, score: 4 },
          isOnWishlist: false
        },
        {
          title: 'Cream Beach Bag',
          image: '/homepage/productB.webp',
          price: { regular: '50.00 $' },
          rating: { max: 5, score: 4 },
          isOnWishlist: false
        },
        {
          title: 'Cream Beach Bag',
          image: '/homepage/productC.webp',
          price: { regular: '50.00 $' },
          rating: { max: 5, score: 4 },
          isOnWishlist: false
        },
        {
          title: 'Cream Beach Bag',
          image: '/homepage/productA.webp',
          price: { regular: '50.00 $' },
          rating: { max: 5, score: 4 },
          isOnWishlist: false
        },
        {
          title: 'Cream Beach Bag',
          image: '/homepage/productB.webp',
          price: { regular: '50.00 $' },
          rating: { max: 5, score: 4 },
          isOnWishlist: false
        }
      ]
    };
  },
  methods: {
    toggleWishlist(index) {
      this.products[index].isOnWishlist = !this.products[index].isOnWishlist;
    }
  }
}
</script>
