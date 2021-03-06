<template>
  <div>
    <div class="log-in desktop-only">
      <SfButton class="log-in__button color-secondary" @click="toggleLoginModal">
        {{ $t('Log into your account') }}
      </SfButton>
      <p class="log-in__info">{{ $t('or fill the details below') }}:</p>
    </div>
    <SfHeading :level="3" title="Personal details" class="sf-heading--left sf-heading--no-underline title" />
    <ValidationObserver v-slot="{ handleSubmit }">
      <form class="form" @submit.prevent="handleSubmit(handleFormSubmit)">
        <ValidationProvider name="firstName" rules="required|min:2" v-slot="{ errors }" slim>
          <SfInput
            :value="personalDetails.firstName"
            @input="firstName => setPersonalDetails({ firstName })"
            label="First name"
            name="firstName"
            class="form__element form__element--half"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider name="lastName" rules="required|min:2" v-slot="{ errors }" slim>
          <SfInput
            :value="personalDetails.lastName"
            @input="lastName =>  setPersonalDetails({ lastName })"
            label="Last name"
            name="lastName"
            class="form__element form__element--half form__element--half-even"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider name="email" rules="required|email" v-slot="{ errors }" slim>
          <SfInput
            :value="personalDetails.email"
            @input="email => setPersonalDetails({ email })"
            label="Your email"
            name="email"
            class="form__element"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <div class="info">
          <p class="info__heading">
            {{ $t('Enjoy your free account') }}
          </p>
          <SfCharacteristic
            v-for="(characteristic, key) in characteristics"
            :key="key"
            :description="characteristic.description"
            :icon="characteristic.icon"
            size-icon="1rem"
            class="info__characteristic"
          />
        </div>
        <div class="form__element form__group">
          <SfCheckbox
            v-model="createAccount"
            name="createAccount"
            label="I want to create an account"
          />
        </div>
        <transition name="fade">
          <ValidationProvider v-if="createAccount" name="email" rules="required" v-slot="{ errors }" slim>
            <SfInput
              :value="personalDetails.password"
              @input="password => setPersonalDetails({ password })"
              type="password"
              label="Create Password"
              class="form__element"
              required
              :valid="!errors[0]"
              :errorMessage="errors[0]"
            />
          </ValidationProvider>
        </transition>
        <div class="form__action">
          <nuxt-link to="/" class="sf-button color-secondary form__back-button">{{ $t('Go back') }}</nuxt-link>
          <SfButton class="form__action-button" type="submit" :disabled="loading.personalDetails">
            {{ $t('Continue to shipping') }}
          </SfButton>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import {
  SfInput,
  SfCheckbox,
  SfButton,
  SfHeading,
  SfModal,
  SfCharacteristic
} from '@storefront-ui/vue';
import { ref, watch } from '@vue/composition-api';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, min, email } from 'vee-validate/dist/rules';
import { useUiState } from '~/composables';
import { useCheckout, useUser } from '@vue-storefront/commercetools';
import { onSSR } from '@vue-storefront/core';

extend('required', {
  ...required,
  message: 'This field is required'
});
extend('min', {
  ...min,
  message: 'The field should have at least {length} characters'
});
extend('email', {
  ...email,
  message: 'Invalid email'
});
export default {
  name: 'PersonalDetails',
  components: {
    SfInput,
    SfCheckbox,
    SfButton,
    SfHeading,
    SfModal,
    SfCharacteristic,
    ValidationObserver,
    ValidationProvider
  },
  setup(props, context) {
    const { toggleLoginModal } = useUiState();
    const { register, isAuthenticated } = useUser();
    const { loadDetails, personalDetails, setPersonalDetails, loading } = useCheckout();
    const accountBenefits = ref(false);
    const createAccount = ref(false);
    onSSR(async () => {
      await loadDetails();
    });
    const handleFormSubmit = async () => {
      if (createAccount.value) {
        await register({ user: personalDetails.value });
        context.root.$router.push('/checkout/shipping');
        return;
      }
      await setPersonalDetails(personalDetails.value, { save: true });
      context.root.$router.push('/checkout/shipping');
    };
    watch(isAuthenticated, () => {
      if (isAuthenticated.value) {
        context.root.$router.push('/checkout/shipping');
      }
    });
    return {
      loading,
      personalDetails,
      accountBenefits,
      createAccount,
      setPersonalDetails,
      handleFormSubmit,
      toggleLoginModal,
      characteristics: [
        { description: 'Faster checkout',
          icon: 'clock' },
        { description: 'Full rewards program benefits',
          icon: 'rewards' },
        { description: 'Earn credits with every purchase',
          icon: 'credits' },
        { description: 'Manage your wishliste',
          icon: 'heart' }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.title {
 margin: var(--spacer-xl) 0 var(--spacer-base) 0;
}
.log-in {
  &__info {
    margin: var(--spacer-lg) 0;
    color: var(--c-link);
    font: var(--font-weight--light) var(--font-size--base) / 1.6 var(--font-family--secondary);
    @include for-desktop {
      font-weight: var(--font-weight--normal);
    }
  }
  &__button {
    margin: var(--spacer-2xl) 0 var(--spacer-xl) 0;
  }
}
.info {
  margin: 0 0 var(--spacer-xl) 0;
  &__heading {
    font-family: var(--font-family--secondary);
    font-weight: var(--font-weight--normal);
    margin-bottom: var(--spacer-base);
  }
  &__characteristic {
    --characteristic-description-font-size: var(--font-size--base);
    margin: 0 0 var(--spacer-sm) var(--spacer-2xs);
  }
  @include for-desktop {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    &__heading {
      flex: 100%;
      margin: 0 0 var(--spacer-sm) 0;
      font-size: var(--font-size--xs);
    }
    &__characteristic {
      margin: 0 0 var(--spacer-base) 0;
      flex: 0 50%;
    }
  }
}
.form {
  @include for-desktop {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  &__element {
    margin: 0 0 var(--spacer-xl) 0;
    @include for-desktop {
      flex: 0 0 100%;
    }
    &--half {
      @include for-desktop {
        flex: 1 1 50%;
      }
      &-even {
        @include for-desktop {
          padding: 0 0 0 var(--spacer-xl);
        }
      }
    }
  }
  &__group {
    display: flex;
    align-items: center;
    margin: var(--spacer-xl) 0 var(--spacer-lg) 0;
  }
  &__action {
    display: flex;
    flex-direction: column-reverse;
    margin: 0 0 var(--spacer-sm) 0;
    @include for-desktop {
      flex: 0 0 100%;
      flex-direction: row;
      margin: 0;
    }
  }
  &__action-button {
    margin: 0 0 var(--spacer-sm) 0;
    @include for-desktop {
      margin: 0;
    }
  }
  &__back-button {
    @include for-desktop {
      margin: 0 var(--spacer-xl) 0 0;
      &:hover {
        color: var(--c-white);
      }
    }
  }
  &__button {
    --button-width: 100%;
    @include for-desktop {
      --button-width: auto;
    }
  }
}
.info {
  --button-padding: 0 var(--spacer);
  --button-color: var(--c-text-muted);
  --button-text-decoration: none;
}
.characteristic {
  margin: 0 0 var(--spacer-xl) 0;
  &:last-child {
    margin: 0;
  }
}
.modal {
  &__heading {
    margin: 0 0 var(--spacer-2xl) 0;
  }
  &__button {
    margin: var(--spacer-2xl) 0 0 0;
  }
}
</style>
