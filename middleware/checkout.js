const canEnterPersonalDetails = cart => !cart.customerId && cart.lineItems.length > 0;

const canEnterShipping = cart => cart.customerEmail || cart.customerId;

const canEnterPayment = cart => cart.shippingInfo && cart.shippingAddress;

const canEnterReview = cart => Boolean(cart.billingAddress);

export default async ({ app, $vsf }) => {
  const currentPath = app.context.route.fullPath.split('/checkout/')[1];

  if (!currentPath) return;

  const { data } = await $vsf.$ct.api.getMe();

  if (!data || !data.me.activeCart) return;
  const { activeCart } = data.me;

  switch (currentPath) {
    case 'personal-details':
      if (!canEnterPersonalDetails(activeCart)) {
        app.context.redirect('/checkout/shipping');
      }
      break;
    case 'shipping':
      if (!canEnterShipping(activeCart)) {
        app.context.redirect('/');
      }
      break;
    case 'payment':
      if (!canEnterPayment(activeCart)) {
        app.context.redirect('/');
      }
      break;
    case 'order-review':
      if (!canEnterReview(activeCart)) {
        app.context.redirect('/');
      }
      break;
  }
};

